define(["jquery", "bootstrap", "corsanywhere", "ko", "koDebug"], function ($, bootstrap, cors, ko, kob) {

    function Activity(id, categories, name, location, users, image_url) {
        var self = this;
        self.key = id;
        self.categories = categories;
        self.name = name;
        self.location = location;
        if (users) {
            self.users = Array.from(users);

        }
        self.image_url = image_url;


    }

    function LetsEatModel() {

        var self = this;

        self.userVisible = ko.observable(false);

        self.pickedJoin = ko.observable(false);
        self.pickedCreate = ko.observable(true);


        self.searchTerm = ko.observable('chicken');

        self.zipCode = ko.observable('77077');

        self.zipInfo = ko.observable('');

        self.eventChosen = ko.observable('');

        self.firstName = ko.observable('');

        self.lastName = ko.observable('');

        self.email = ko.observable('');

        self.usersForChosenEvent = ko.observableArray('');

        self.searchResult = ko.observableArray([]);

        self.currentEvents = ko.observableArray();

        self.createEventList = ko.observableArray();

        // These observable keep track of what page is displaying
        self.landingVisible = ko.observable(true);


        self.resultsVisible = ko.observable(false);

        self.createVisible = ko.observable(false);


        // Sends AJAX to google APIs and sets VM's zipInfo to relevant JSON data.
        self.zipRequest = ko.computed(function () {
            // TODO: VALIDATOR: Below ajax call should only run when "self.zipInfo() === valid Zip Code
            // ELSE it should set self.zipInfo to something like "Zip Code not recognized"
            if (self.zipCode() !== null || typeof self.zipCode() !== 'undefined') {
                $.ajax({
                    url: "http://maps.googleapis.com/maps/api/geocode/json?address=" + self.zipCode(),
                    method: "GET"
                }).done(function (res) {
                    var info = res.results[0].formatted_address;
                    self.zipInfo(info);
                });
            }
        });

        //search
        self.submitSearch = function () {

            var searchTerm = self.searchTerm();
            var zipCode = self.zipCode();
            self.searchResult.removeAll();
            self.currentEvents.removeAll();


            var apitoken = "O6n9AwTvAVvbc1aMOVvSmI_ATeiK6bEXa3Ad-nEfWVp0tuJPnG_yv01m8WwvcQ3Urd2B7Z25hxVCOF35wf_-C-Ub-zm57JG_EnQMn0vQj6LNBDfkj-xlcWHUSxKuWnYx";

            var args = {
                url: 'https://api.yelp.com/v3/businesses/',
                type: 'search?',
                query: {
                    categories: searchTerm,
                    limit: 10, //number of results to return
                    location: zipCode
                }
            };

            $.when(secureApiRequest.fetchResponse(args, apitoken)).done(function () {
                console.log(secureApiRequest.responseObject);
                ko.utils.arrayPushAll(self.searchResult, secureApiRequest.responseObject.businesses);

                ko.utils.arrayForEach(self.searchResult(), function (item) {

                    var db = firebase.database();
                    db.ref().child("events").orderByKey().equalTo(item.id).once("value", function (snapshot) {



                        if (snapshot.val()) {
                            var dbData = snapshot.val();

                            var arr2 = Object.values(dbData);
                            var value = arr2[0];
                            var activity = new Activity(item.id, item.categories, item.name, item.location, value.users, item.image_url);


                            self.currentEvents.push(activity);
                            // console.log(self.currentEvents());
                        }
                        else {
                            //console.log("DoNotExists: " + item.id);
                            var activity = new Activity(item.id, item.categories, item.name, item.location, undefined, item.image_url);
                            self.createEventList.push(activity);

                        }

                    })

                }, self)



            });
            self.landingVisible(false);
            self.resultsVisible(true);

        }


        self.joinEvent = function (event) {
            console.log(JSON.stringify(event));

            self.pickedJoin(true);
            self.eventChosen(event.key);
            self.usersForChosenEvent(event.users);
            self.resultsVisible(false);
            self.userVisible(true);
        }

        self.submitUserInfo = function () {

            if (self.pickedJoin()) {

                var dbRef = firebase.database().ref("events/" + self.eventChosen() + "/users");

                self.usersForChosenEvent.push({
                    email: self.email(),
                    firstName: self.firstName(),
                    lastName: self.lastName(),
                });

                dbRef.set(self.usersForChosenEvent());

                self.pickedJoin(false);
                self.userVisible(false);
                self.resultsVisible(true);
            }
            else if(self.pickedCreate())
            {
                self.pickedCreate(false);
            }
        }

        self.navToCreate = function () {
            self.resultsVisible(false);
            self.createVisible(true);
        }

        self.navToResult = function () {
            self.createVisible(false);
            self.resultsVisible(true);
        }

    }

    // The's landing page code
    $(document).ready(function () {
        ko.applyBindings(new LetsEatModel());

    });

});