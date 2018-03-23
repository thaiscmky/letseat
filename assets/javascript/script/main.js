define(["jquery", "bootstrap", "corsanywhere", "ko", "koDebug"], function ($, bootstrap, cors, ko, kob) {
    function LetsEatViewModel() {
        var self = this;

        // Landing Observables
        self.searchTerm = ko.observable('');
        self.zipCode = ko.observable('');
        self.zipInfo = ko.observable('');


        // These observable keep track of what page is displaying
        self.landingVisible = ko.observable(true);
        self.resultsVisible = ko.observable(false);
        self.createVisible = ko.observable(false);
        self.userVisible = ko.observable(false);

        //this an array of arrays representing our bootstrap grid. Each item is an array of 3 objects representing
        // a row. When we receive the events array from our database we will need to configure it this way using a function.
        self.results = ko.observableArray([[{
            restaurant: "Killen's BBQ",
            image: "./assets/Killens-Line.jpg",
            people: [{ name: 'Bubba' }, { name: "Yellow" }, { name: "Johnny" }],
            location: {
                city: "San Francisco",
                country: "US",
                address2: "",
                address3: "",
                state: "CA",
                address1: "375 Valencia St",
                zip_code: "94103"
            },
            categories: [
                {
                    alias: "coffee",
                    title: "Coffee & Tea"
                }
            ],
            rating: 4,
            price: "$",
            phone: "+14152520800"

        },
        {
            restaurant: "Killen's BBQ",
            image: "./assets/Killens-Line.jpg",
            people: [{ name: 'Bubba' }],
            location: {
                city: "San Francisco",
                country: "US",
                address2: "",
                address3: "",
                state: "CA",
                address1: "375 Valencia St",
                zip_code: "94103"
            },
            categories: [
                {
                    alias: "coffee",
                    title: "Coffee & Tea"
                }
            ],
            rating: 4,
            price: "$",
            phone: "+14152520800"
        },
        {
            restaurant: "Killen's BBQ",
            image: "./assets/Killens-Line.jpg",
            people: [{ name: 'Bubba' }],
            location: {
                city: "San Francisco",
                country: "US",
                address2: "",
                address3: "",
                state: "CA",
                address1: "375 Valencia St",
                zip_code: "94103"
            },
            categories: [
                {
                    alias: "coffee",
                    title: "Coffee & Tea"
                }
            ],
            rating: 4,
            price: "$",
            phone: "+14152520800"
        }], [{
            restaurant: "Killen's BBQ",
            image: "./assets/Killens-Line.jpg",
            people: [{ name: 'Bubba' }],
            location: {
                city: "San Francisco",
                country: "US",
                address2: "",
                address3: "",
                state: "CA",
                address1: "375 Valencia St",
                zip_code: "94103"
            },
            categories: [
                {
                    alias: "coffee",
                    title: "Coffee & Tea"
                }
            ],
            rating: 4,
            price: "$",
            phone: "+14152520800"
        },
        {
            restaurant: "Killen's BBQ",
            image: "./assets/Killens-Line.jpg",
            people: [{ name: 'Bubba' }],
            location: {
                city: "San Francisco",
                country: "US",
                address2: "",
                address3: "",
                state: "CA",
                address1: "375 Valencia St",
                zip_code: "94103"
            },
            categories: [
                {
                    alias: "coffee",
                    title: "Coffee & Tea"
                }
            ],
            rating: 4,
            price: "$",
            phone: "+14152520800"
        },
        {
            restaurant: "Killen's BBQ",
            image: "./assets/Killens-Line.jpg",
            people: [{ name: 'Bubba' }],
            location: {
                city: "San Francisco",
                country: "US",
                address2: "",
                address3: "",
                state: "CA",
                address1: "375 Valencia St",
                zip_code: "94103"
            },
            categories: [
                {
                    alias: "coffee",
                    title: "Coffee & Tea"
                }
            ],
            rating: 4,
            price: "$",
            phone: "+14152520800"
        }], [{
            restaurant: "Killen's BBQ",
            image: "./assets/Killens-Line.jpg",
            people: [{ name: 'Bubba' }],
            location: {
                city: "San Francisco",
                country: "US",
                address2: "",
                address3: "",
                state: "CA",
                address1: "375 Valencia St",
                zip_code: "94103"
            },
            categories: [
                {
                    alias: "coffee",
                    title: "Coffee & Tea"
                }
            ],
            rating: 4,
            price: "$",
            phone: "+14152520800"
        }]
        ]);


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

        self.joinEvent = function () {
            console.log("Joined Event");
            self.resultsVisible(false);
            self.userVisible(true);
        }

        self.submitUserInfo = function () {
            console.log("Submitted user Info");
            self.userVisible(false);
            self.resultsVisible(true);
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

    ko.applyBindings(new LetsEatViewModel);

});


