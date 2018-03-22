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
            restaurant: "Killen's BBQ-1",
            image: "http://via.placeholder.com/100x100",
            people: [{ name: 'Bubba' }, { name: "Yellow" }, { name: "Johnny" }]
        },
        {
            restaurant: "Killen's BBQ-2",
            image: "http://via.placeholder.com/100x100",
            people: [{ name: 'Bubba' }]
        },
        {
            restaurant: "Killen's BBQ-3",
            image: "http://via.placeholder.com/100x100",
            people: [{ name: 'Bubba' }]
        }], [{
            restaurant: "Killen's BBQ-4",
            image: "http://via.placeholder.com/100x100",
            people: [{ name: 'Bubba' }]
        },
        {
            restaurant: "Killen's BBQ-5",
            image: "http://via.placeholder.com/100x100",
            people: [{ name: 'Bubba' }]
        },
        {
            restaurant: "Killen's BBQ-6",
            image: "http://via.placeholder.com/100x100",
            people: [{ name: 'Bubba' }]
        }], [{
            restaurant: "Killen's BBQ-7",
            image: "http://via.placeholder.com/100x100",
            people: [{ name: 'Bubba' }]
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
            if (confirm('Found events near you?\nOk = Navigates to Results Display\nCancel = Navigates to Create Display')) {
                // Navigates to results display
                self.landingVisible(false);
                self.resultsVisible(true);
            } else {
                // Navigates to create display
                self.landingVisible(false);
                self.createVisible(true);
            }
        }

        self.joinEvent = function () {
            self.resultsVisible(false);
            self.userVisible(true);
        }
        

    }

    ko.applyBindings(new LetsEatViewModel);
});


