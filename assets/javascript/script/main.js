define(["jquery", "bootstrap", "corsanywhere", "ko", "koDebug"], function($, bootstrap, cors, ko, kob) {
    function LandingViewModel() {
        var self = this;

            self.landingVisible = ko.observable(true);
            self.resultVisible = ko.observable(false);
            self.createEventVisible = ko.observable(false);
            self.createUserVisible = ko.observable(false);

            self.seats = ko.observableArray([
                { name: 'bob', value: 'meat' },
                {name: 'chris', value: 'coren'}
            ]);

            self.display = {
                hideDisplays() {
                    self.landingVisible(false);
                    self.resultVisible(false);
                    self.createEventVisible(false);
                    self.createUserVisible(false);
                },

                showResults(searchTerm, zipCode) {
                    // Hides current visible window and shows result window
                    self.display.hideDisplays();
                    self.resultVisible(true);

                    // Dynamically create events

                },
            }

            self.results = ko.observableArray([
                { name: 'one', value: '1' },
                { name: 'two', value: '2' }
            ]);

        self.searchTerm = ko.observable('');

        self.zipCode = ko.observable('');

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

        self.submitSearch = function () {
            var searchTerm = self.searchTerm();
            var zipCode = self.zipCode();
            // When user clicks submit this is the code that runs...
            // FYI this prevent default submit functionality because we're using KO.js
            console.log('TEST: Look in console');
            console.log('Search: ' + searchTerm)
            console.log('zipCode: ' + zipCode)

            console.log(self.results());

            //This empties the main content and shows results!
            self.display.showResults(searchTerm, zipCode);
        }

        
    
        
            // self.suggestions = [
            //     new Suggestion('Fried Chicken'),
            //     new Suggestion('Burger'),
            //     new Suggestion('Pizza'),
            //     new Suggestion('Pasta'),
            //     new Suggestion('Hamburgers'),
            //     new Suggestion('Food 1'),
            //     new Suggestion('Food 2'),
            //     new Suggestion('Food 3'),
            //     new Suggestion('Food 4')
            // ];

    }

//  function Suggestion(name) {
//         this.name = name;
//         this.copyToSearchBox = function(){
//             console.log(this);
//         }
//     }

    

    // The's landing page code
    $(document).ready(function () {
        ko.applyBindings(new LandingViewModel());
    });

});


