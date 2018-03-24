define(["jquery", "bootstrap", "corsanywhere", "ko", "koDebug"], function ($, bootstrap, cors, ko, kob) {

    function Activity(id, categories, name, location, users, image_url, maxSeats) {
        var self = this;
        self.key = id;
        self.categories = categories;
        self.name = name;
        self.location = location;
        if (users) {
            self.users = Array.from(users);

        }
        if (maxSeats) {
            self.maxSeats = maxSeats;
        }
        self.image_url = image_url;


    }

    function LetsEatModel() {

        var self = this;

        self.userVisible = ko.observable(false);

        self.pickedJoin = ko.observable(false);


        //create event observables
        self.pickedCreate = ko.observable(false);
        self.createAddress = ko.observable('');
        self.createCity = ko.observable('');
        self.createZip = ko.observable('');
        self.createKey = ko.observable('');
        self.createName = ko.observable('');
        self.createCategories = ko.observable('');
        self.createMaxSeats = ko.observable(0);



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
            // When user clicks submit this is the code that runs...

            // FYI this prevent default submit functionality because we're using KO.js                

            // Hi this is needs to eventually automatically detect if event are found near you or not

            // Navigates to results display
            self.landingVisible(false);
            self.resultsVisible(true);
        }


        self.createEvent = function (event, domEvent) {


            var eventIndex = ko.contextFor(domEvent.target).$index();

            self.createMaxSeats($("#" + eventIndex).val());

            self.createVisible(false);
            self.userVisible(true);
            self.pickedCreate(true);



            self.createKey(event.key);
            self.createName(event.name)
            self.createCity(event.location.city);
            self.createZip(event.location.zip_code);
            var address = event.location.address1;

            if (event.location.address2.length > 0) {
                address += " ," + event.location.address2;
            }
            if (event.location.address3.length > 0) {
                address += " ," + event.location.address3;
            }

            self.createAddress(address);
            var categoryString = ''
            for (var i = 0; i < event.categories.length; i++) {
                if (i === 0) {
                    categoryString = event.categories[i].title;
                }
                else {
                    categoryString += ", " + event.categories[i].title;
                }
            }
            self.createCategories(categoryString);



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

                self.usersForChosenEvent.removeAll();

                self.pickedJoin(false);
                self.userVisible(false);
                self.resultsVisible(true);
            }
            else if (self.pickedCreate()) {

                var dbRef = firebase.database().ref("events");

                self.usersForChosenEvent.push({
                    email: self.email(),
                    firstName: self.firstName(),
                    lastName: self.lastName(),
                });

                var locationObject = {
                    address: self.createAddress(),
                    city: self.createCity(),
                    zipCod: self.createZip()
                };

                dbRef.child(self.createKey()).set({
                    categories: self.createCategories(),
                    eventName: self.createName(),
                    location: locationObject,
                    timestamp: firebase.database.ServerValue.TIMESTAMP,
                    users: self.usersForChosenEvent(),
                    maxSeats: self.createMaxSeats()

                })


                self.createMaxSeats(0);
                self.usersForChosenEvent.removeAll();


                self.pickedCreate(false);
                self.userVisible(false);
                self.resultsVisible(true);
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