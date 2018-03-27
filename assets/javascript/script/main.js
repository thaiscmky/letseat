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


        self.eventChatRef = '';
        self.eventChat = ko.observableArray([]);
        self.chatMessage = ko.observable('');
        self.newChatSent = ko.observable('');



        self.deselectEvent = function (data) {
            self.eventChosen('');

        }




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
                    url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + self.zipCode(),
                    method: "GET"
                }).done(function (res) {
                    var info = res.results[0].formatted_address;
                    self.zipInfo(info);
                });
            }
        });

        function resetForm() {
            $('#firstNameInput').val('');
            $('#lastNameInput').val('');
            $('#emailInput').val('');
            $("#firstname-validation").val('');
            $("#lastname-validation").val('');
            $("#email-validation").val('');

        }

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
                        }
                        else {
                            var activity = new Activity(item.id, item.categories, item.name, item.location, undefined, item.image_url, undefined, item.url, item.price, item.rating, item.display_phone);
                            self.createEventList.push(activity);

                        }

                    })

                }, self)



            });
            self.userVisible(false);
            self.landingVisible(false);
            self.resultsVisible(true);
            self.createVisible(false);

        }




        self.joinEvent = function (event) {
            if (event.users.length >= event.maxSeats) {
                alert("EVENT FULL\n @The make this pretty");
            }
            else if (localStorage.getItem('email') === null) {
                self.pickedJoin(true);
                self.eventChosen(event);
                self.usersForChosenEvent(event.users);
                self.resultsVisible(false);
                self.userVisible(true);
            }
            else {
                self.pickedJoin(true);
                self.eventChosen(event);
                self.usersForChosenEvent(event.users);
                self.submitUserInfo();
            }
        };


        self.createEvent = function (event, domEvent) {


            var eventIndex = ko.contextFor(domEvent.target).$index();

            self.createMaxSeats($("#" + eventIndex).val());





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

            if (localStorage.getItem("email") === null) {
                alert("local storage null");
                self.createVisible(false);
                self.userVisible(true);
                self.pickedCreate(true);
            }
            else {
                self.pickedCreate(true);
                self.submitUserInfo();

            }

        }

        function validateJoinForm() {
            var error = [];
            let emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            let nameRegEx = /^[a-zA-Z0-9\s._\-]+$/;

            if (!nameRegEx.test($("#firstNameInput").val())) {
                error.push('firstname')
            }
            if (!nameRegEx.test($("#lastNameInput").val())) {
                error.push("lastname")
            }
            if (!emailRegEx.test($("#emailInput").val())) {
                error.push("email")
            }
            return error;
        }

        self.submitUserInfo = function () {

            if (self.pickedJoin()) {
                var emailExist = false;

                var dbRef = firebase.database().ref("events/" + self.eventChosen() + "/users");
                if (validateJoinForm().length > 0) {
                    validateJoinForm().indexOf("firstname") >= 0 ? $("#firstname-validation").show() : $("#firstname-validation").hide();
                    validateJoinForm().indexOf("lastname") >= 0 ? $("#lastname-validation").show() : $("#lastname-validation").hide();
                    validateJoinForm().indexOf("email") >= 0 ? $("#email-validation").show() : $("#email-validation").hide();
                    return;
                }

                let emailFound;
                // DB Validation for duplicate users
                dbRef.on("value", function (data) {
                    data.val().map(user => {

                        if ($('#emailInput').val() === user.email) {
                            emailFound = true;
                        }// user already registered

                    });
                    debugger;
                    if (emailFound) {
                        alert("This email is registered , please use another");
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

                var joinNotificationParams = {
                    header_msg: 'You have joined an event',
                    event_name: self.eventChosen().key,
                    to_name: self.firstName(),
                    to_email: self.email(),
                    from_name: "Yummy Inc.",
                    message_html: "<h2>You have joined " + self.usersForChosenEvent()[0].firstName + " " + self.usersForChosenEvent()[0].lastName + "'s event: " + self.eventChosen().key + "</h2>"
                };

                var creatorNotificationParams = {
                    header_msg: 'Someone has joined your event',
                    event_name: self.eventChosen().key,
                    to_name: self.usersForChosenEvent()[0].firstName,
                    to_email: self.usersForChosenEvent()[0].email,
                    from_name: "Yummy Inc.",
                    message_html: "<h2>" + self.firstName() + " " + self.lastName() + " has joined your event: " + self.eventChosen().key + "</h2>"
                };

                emailjs.send('default_service', 'yummy_eats', joinNotificationParams)
                    .then(function (response) {
                        console.log('SUCCESS!', response.status, response.text);
                    }, function (error) {
                        console.log('FAILED...', error);
                    });

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

                var joinNotificationParams = {
                    header_msg: 'You have joined an event',
                    event_name: self.eventChosen().key,
                    to_name: self.firstName(),
                    to_email: self.email(),
                    from_name: "Yummy Inc.",
                    message_html: "<h2>You have joined " + self.usersForChosenEvent()[0].firstName + " " + self.usersForChosenEvent()[0].lastName + "'s event: " + self.eventChosen().key + "</h2>"
                };

                var creatorNotificationParams = {
                    header_msg: 'Someone has joined your event',
                    event_name: self.eventChosen().key,
                    to_name: self.usersForChosenEvent()[0].firstName,
                    to_email: self.usersForChosenEvent()[0].email,
                    from_name: "Yummy Inc.",
                    message_html: "<h2>" + self.firstName() + " " + self.lastName() + " has joined your event: " + self.eventChosen().key + "</h2>"
                };

                emailjs.send('default_service', 'yummy_eats', joinNotificationParams)
                    .then(function (response) {
                        console.log('SUCCESS!', response.status, response.text);
                    }, function (error) {
                        console.log('FAILED...', error);
                    });





                self.pickedJoin(false);
                self.userVisible(false);
                self.resultsVisible(true);
            }
            else if (self.pickedCreate()) {

                var dbRef = firebase.database().ref("events");

                if (localStorage.getItem("email") != null) {
                    self.firstName(localStorage.getItem('firstName'));
                    self.lastName(localStorage.getItem('lastName'));
                    self.email(localStorage.getItem('email'));

                }
                else {

                    if (validateJoinForm().length > 0) {
                        validateJoinForm().indexOf("firstname") >= 0 ? $("#firstname-validation").show() : $("#firstname-validation").hide();
                        validateJoinForm().indexOf("lastname") >= 0 ? $("#lastname-validation").show() : $("#lastname-validation").hide();
                        validateJoinForm().indexOf("email") >= 0 ? $("#email-validation").show() : $("#email-validation").hide();
                        return;
                    }

                    localStorage.setItem("firstName", self.firstName());
                    localStorage.setItem("lastName", self.lastName());
                    localStorage.setItem("email", self.email());


                }

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

                var day = new Date().toJSON().slice(0, 10).replace(/-/g, '/');

                dbRef.child(self.createKey()).set({
                    categories: self.createCategories(),
                    eventName: self.createName(),
                    location: locationObject,
                    timestamp: firebase.database.ServerValue.TIMESTAMP,
                    users: self.usersForChosenEvent(),
                    maxSeats: self.createMaxSeats()

                });

                firebase.database().ref("events/" + self.createKey()).child("chat").push({
                    user: "Let's Eat: ",
                    text: "Welcome to " + self.createKey() + "'s chat"
                })


                self.createMaxSeats(0);
                self.usersForChosenEvent.removeAll();


                self.pickedCreate(false);
                self.userVisible(false);
                self.resultsVisible(true);

            resetForm();

        };

        self.navToCreate = function () {
            self.resultsVisible(false);
            self.userVisible(false);
            self.createVisible(true);
        };

        self.navToResult = function () {
            self.createVisible(false);
            self.resultsVisible(true);
        }

        self.navToSearch = function () {
            self.userVisible(false);
            self.resultsVisible(false);
            self.createVisible(false);
        }

        // self.drawRating = ko.observable(self.eventChosen().rating);

        // Draws the stars in modal info view
        self.drawRating = function () {
            var rating = self.eventChosen().rating;
            var newDiv = $("<div>").css({ 'color': '#FFC107' });
            while (rating >= 1) {
                rating--
                newDiv.append('<i class="fas fa-star fa-sm"></i>');
            }
            if (rating === .5) newDiv.append('<i class="fas fa-star-half"></i>');
            $(".modal-rating").html(newDiv);
        }

        // Draws price in modal info view
        self.drawPrice = function () {
            var price = self.eventChosen().price;
            console.log(price);
            var newDiv = $("<div>").css({ 'color': '#566904' });
            for (var i = 0; i < price.length; i++) {
                newDiv.append('<i class="fas fa-dollar-sign"></i>');
            }
            $(".modal-price").html(newDiv);
        }

        self.saveEventInfo = function (data) {



            self.eventChosen(data);



            if (localStorage.getItem('firstName') != null) {
                var validUser = false;
                for (var i = 0; i < self.eventChosen().users.length; i++) {
                    if (self.eventChosen().users[i].email === localStorage.getItem('email')) {
                        validUser = true;
                    }
                }
            }

            if (validUser) {

                self.eventChatRef = firebase.database().ref("events/" + self.eventChosen().key + "/chat");
                var keyArray;


                self.eventChatRef.once('value').then(function (snapshot) {

                    keyArray = Object.keys(snapshot.val());
                    var chatArray = Object.values(snapshot.val());

                    for (var i = 0; i < chatArray.length; i++) {
                        self.eventChat.push(chatArray[i]);

                    }


                    self.eventChatRef.on('child_added', function (snapshot) {


                        if (self.newChatSent()) {
                            self.eventChat.push(snapshot.val());
                            self.newChatSent(false);
                        }
                    })

                    self.eventChatRef.on('value', function (snapshot) {
                        var keys = Object.keys(snapshot.val());

                        if (keys.length > 30) {

                            eventChatRef.child(keys[0]).remove();

                        };

                    })

                });



            }
        }


        self.addNewChat = function () {

            var validUser = false;
            for (var i = 0; i < self.eventChosen().users.length; i++) {
                if (self.eventChosen().users[i].email === localStorage.getItem('email')) {
                    validUser = true;
                }
            }

            if (localStorage.getItem("firstName") === null) {
                alert("must enter user information to chat");
            }
            else if (validUser) {
                if (/^[a-zA-Z0-9,.!?\s\-_']*$/.test(self.chatMessage())) {


                    self.newChatSent(true);

                    var chatRef = firebase.database().ref("events/" + self.eventChosen().key + "/chat");

                    chatRef.push({
                        user: localStorage.getItem('firstName') + " " + localStorage.getItem('lastName'),
                        text: self.chatMessage()
                    }, function (error) {
                        if (error) {
                            console.log(error);
                            self.newChatSent(false);

                        }

                    });




                } else {
                    alert("invalid chat message");
                }

            }
            else {
                alert("you have not joined this event");
            }

            self.chatMessage('');

        }

    }



    var letsEatVM = new LetsEatModel();


    $('#createModal').on('hidden.bs.modal', function () {

        if (letsEatVM.eventChatRef) {
            letsEatVM.eventChatRef.off("value");
            letsEatVM.eventChatRef.off("child_added");
        }
        letsEatVM.eventChat.removeAll();
        letsEatVM.chatMessage('');
        letsEatVM.newChatSent('');

    });


    }

    // The's landing page code

    $(document).ready(function () {
        ko.applyBindings(letsEatVM);

    });

});