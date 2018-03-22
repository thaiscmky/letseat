define(["jquery", "bootstrap", "corsanywhere", "ko", "koDebug"], function ($, bootstrap, cors, ko, kob) {

    //the display function was removed and its functionality is in the submitSearch. Seemed like an extra step we didn't need.
    //Also there are no binding errors now and that's the only thing I didn't add when I recoded this, so...

    function LetsEatViewModel() {
        var self = this;

        self.searchTerm = ko.observable('');

        self.zipCode = ko.observable('');

        self.zipInfo = ko.observable('');


        self.landingVisible = ko.observable(true);
        self.resultsVisible = ko.observable(false);



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
            // var searchTerm = self.searchTerm();
            // var zipCode = self.zipCode();
            // When user clicks submit this is the code that runs...
            // FYI this prevent default submit functionality because we're using KO.js
            // console.log('TEST: Look in console');
            // console.log('Search: ' + searchTerm);
            // console.log('zipCode: ' + zipCode)
            self.landingVisible(false);
            self.resultsVisible(true);
        }





    }


    ko.applyBindings(new LetsEatViewModel);
});


