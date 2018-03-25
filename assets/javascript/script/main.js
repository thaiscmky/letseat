define(["jquery", "bootstrap", "corsanywhere", "ko", "koDebug"], function ($, bootstrap, cors, ko, kob) {

    function Activity(id, categories, name, location, users, image_url, maxSeats, url, price, rating, phoneNumber) {
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
        self.url = url;
        self.price = price;
        self.rating = rating;
        self.phoneNumber = phoneNumber;
        self.image_url = image_url;


    }

    function LetsEatModel() {

        var self = this;

        self.userVisible = ko.observable(false);

        self.pickedJoin = ko.observable(false);

        

        //modal info
        // self.restaurantName = ko.observable('');
        // self.restaurantPrice = ko.observable('');
        // self.restaurantRating = ko.observable('');
        // self.restaurantYelpURL = ko.observable('');
        // self.restaurantIMGURL = ko.observable('');
        // self.restaurantAddress = ko.observable('');
        // self.restaurantCity = ko.observable('');
        // self.restaurantZip = ko.observable('');
        // self.restaurantPhone = ko.observable('');
        // self.restaurantCategories = ko.observable('');
        // self.restaurantSeats = ko.observable('');

        self.deselectEvent = function(data){
            self.eventChosen('');

        }

        self.saveEventInfo = function(data){


            self.eventChosen(data);
            // self.restaurantName(data.name);
            
            // self.restaurantPrice(data.price);
            // self.restaurantRating(data.rating);
            // self.restaurantYelpURL(data.url);

            // self.restaurantIMGURL(data.image_url);
            
            // self.restaurantCity(data.location.city);
            // self.restaurantZip(data.location.zip_code);
            // self.restaurantPhone(data.phoneNumber);
            // self.restaurantSeats(data.maxSeats);


            // var address = data.location.address1
            // if (data.location.address2.length > 0) {
            //     address += ", " + data.location.address2;
            // }
            // if (data.location.address3.length > 0) {
            //     address += ", " + data.location.address3;
            // }

            // self.restaurantAddress(address);           
            //  var categoryString = ''
            // for (var i = 0; i < data.categories.length; i++) {
            //     if (i === 0) {
            //         categoryString = data.categories[i].title;
            //     }
            //     else if((data.categories.length-1)===i){
            //         categoryString += data.categories[i].title;
            //     }
            //      {
            //         categoryString += ", " + data.categories[i].title;
            //     }
            // }
            
            // self.restaurantCategories(categoryString);
           
        }

        //create event observables
        self.pickedCreate = ko.observable(false);
        self.createAddress = ko.observable('');
        self.createCity = ko.observable('');
        self.createZip = ko.observable('');
        self.createKey = ko.observable('');
        self.createName = ko.observable('');
        self.createCategories = ko.observable('');
        self.createMaxSeats = ko.observable();



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

        self.zipInfo = ko.observable('');

        // Sends AJAX to google APIs and sets VM's zipInfo to relevant JSON data.
        self.zipRequest = ko.computed(function () {
            // TODO: VALIDATOR: Below ajax call should only run when "self.zipInfo() === valid Zip Code
            // ELSE it should set self.zipInfo to something like "Zip Code not recognized"
            if(self.zipCode() !== null || typeof self.zipCode() !== 'undefined'){
                $.ajax({
                    url: "http://maps.googleapis.com/maps/api/geocode/json?address=" + self.zipCode(),
                    method: "GET"
                }).done(function (res) {
                    var info = res.results[0].formatted_address;
                    self.zipInfo(info);
                });
            }
        });

        function resetForm(){
            $('#firstNameInput').val('');
            $('#lastNameInput').val('');
            $('#emailInput').val('');
            $("#firstname-validation").val('');
            $("#lastname-validation").val('');
            $("#email-validation").val('');
           
        }
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
                    limit: 20, //number of results to return
                    location: zipCode
                }
            };

            $.when(secureApiRequest.fetchResponse(args, apitoken)).done(function () {
                // console.log(secureApiRequest.responseObject);
                ko.utils.arrayPushAll(self.searchResult, secureApiRequest.responseObject.businesses);

                ko.utils.arrayForEach(self.searchResult(), function (item) {

                    var db = firebase.database();
                    db.ref().child("events").orderByKey().equalTo(item.id).once("value", function (snapshot) {



                        if (snapshot.val()) {
                            var dbData = snapshot.val();
                            var arr2 = Object.values(dbData);
                            var value = arr2[0];
                            var activity = new Activity(item.id, item.categories, item.name, item.location, value.users, item.image_url, value.maxSeats, item.url, item.price, item.rating, item.display_phone);


                            self.currentEvents.push(activity);
                            // console.log(self.currentEvents());
                        }
                        else {
                            //console.log("DoNotExists: " + item.id);
                            var activity = new Activity(item.id, item.categories, item.name, item.location, undefined, item.image_url, undefined, item.url, item.price, item.rating, item.display_phone);
                            self.createEventList.push(activity);

                        }

                    })

                }, self)



            });
            self.landingVisible(false);
            self.resultsVisible(true);

            // }
        }




        self.joinEvent = function (event) {
            if (event.users.length >= event.maxSeats) {
                alert("EVENT FULL\n @The make this pretty");
            }
            else {
                self.pickedJoin(true);
                self.eventChosen(event);
                self.usersForChosenEvent(event.users);
                self.resultsVisible(false);
                self.userVisible(true);
            }
        };


        self.createEvent = function (event, domEvent) {


            var eventIndex = ko.contextFor(domEvent.target).$index();

            self.createMaxSeats($("#" + eventIndex).val());

            self.createVisible(false);
            self.userVisible(true);
            self.pickedCreate(true);



            self.createKey(event.key);
            self.createName(event.name);
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
            var categoryString = '';
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
        function validateJoinForm(){
            var error = [];
            let emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            let nameRegEx = /^[a-zA-Z0-9\s._\-]+$/;

            if(!nameRegEx.test($("#firstNameInput").val())){
                error.push('firstname')
            }
            if(!nameRegEx.test($("#lastNameInput").val()))
            {
                error.push("lastname")
            }
            if(!emailRegEx.test($("#emailInput").val()))
            {
                error.push("email")
            }
            return error;
        }
        self.submitUserInfo = function () {

            if (self.pickedJoin()) {
                var emailExist = false;

                var dbRef = firebase.database().ref("events/" + self.eventChosen() + "/users");
                if ( validateJoinForm().length >0 ) {
                    validateJoinForm().indexOf("firstname") >= 0 ? $("#firstname-validation").show(): $("#firstname-validation").hide();
                    validateJoinForm().indexOf("lastname") >= 0 ? $("#lastname-validation").show(): $("#lastname-validation").hide();
                    validateJoinForm().indexOf("email") >= 0 ? $("#email-validation").show(): $("#email-validation").hide();
                    return;
                 }

                 let emailFound;
                // DB Validation for duplicate users
                dbRef.on("value", function (data) {
                data.val().map(user => {
                  
                    if( $('#emailInput').val() === user.email){
                        emailFound = true;
                    }// user already registered

                });
                debugger;
                if(emailFound){
                    alert("This email is registered , please use anather");
                    emailFound = false;
                    return;
                }

                 });
                if (!emailExist) {
                    self.usersForChosenEvent.push({
                        email: self.email(),
                        firstName: self.firstName(),
                        lastName: self.lastName(),
                    });
                }
                else {
                    console.log("user email exist")
                }

                dbRef.update(self.usersForChosenEvent());

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
                    lastName: self.lastName()
                });

                var locationObject = {
                    address: self.createAddress(),
                    city: self.createCity(),
                    zipCod: self.createZip()
                };
                var day=new Date().toJSON().slice(0,10).replace(/-/g,'/');
                dbRef.child(self.createKey()).set({
                    categories: self.createCategories(),
                    eventName: self.createName(),
                    location: locationObject,
                    timestamp: firebase.database.ServerValue.TIMESTAMP,
                    date: day,//new Date().toJSON().slice(0,10).replace(/-/g,'/'),
                    users: self.usersForChosenEvent(),
                    maxSeats: self.createMaxSeats()

                });


                self.createMaxSeats(0);
                self.usersForChosenEvent.removeAll();


                self.pickedCreate(false);
                self.userVisible(false);
                self.resultsVisible(true);
            }
          
            resetForm();
        };

        self.navToCreate = function () {

            self.resultsVisible(false);
            self.createVisible(true);
        };

        self.navToResult = function () {
            self.createVisible(false);
            self.resultsVisible(true);
        }


    }

    $(document).ready(function () {
        ko.applyBindings(new LetsEatModel());

    });

});