$(document).ready(function () {    
    function landingViewModel() {
        var self = this;

        self.searchTerm = ko.observable('');
        
        self.zipCode = ko.observable('');

        self.zipInfo = ko.observable('');

        // Sends AJAX to google APIs and sets VM's zipInfo to relevant JSON data.
        self.zipRequest = ko.computed(function () {                        
            // TODO: VALIDATOR: Below ajax call should only run when "self.zipInfo() === valid Zip Code
            // ELSE it should set self.zipInfo to something like "Zip Code not recognized"
            $.ajax({
                url: "http://maps.googleapis.com/maps/api/geocode/json?address=" + self.zipCode(),
                method: "GET"
            }).done(function (res) {
                var info = res.results[0].formatted_address;
                self.zipInfo(info);
            });
        })

        self.submitSearch = function () {
            var searchTerm = self.searchTerm();
            var zipCode = self.zipCode();
            // When user clicks submit this is the code that runs...
            // FYI this prevent default submit functionality because we're using KO.js
            console.log('TEST: Look in console');
            console.log('Search: ' + searchTerm)
            console.log('zipCode: ' + zipCode)
        }
    }

    ko.applyBindings(new landingViewModel());
})
//JavaScript Path Configuration
requirejs.config({
    "baseUrl": "./assets/javascript/lib",
    "paths": {
        "script": "../script",
        "jquery": "//code.jquery.com/jquery-3.3.1.min",
        "corsanywhere": "cors-anywhere",
        "ko": '//cdnjs.cloudflare.com/ajax/libs/knockout/3.4.2/knockout-min',
        "koDebug": '//cdnjs.cloudflare.com/ajax/libs/knockout/3.4.2/knockout-debug',
        "koComponentRegister": 'ko-components-registration',
        "text": '//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text',
        "domReady": '//cdnjs.cloudflare.com/ajax/libs/require-domReady/2.0.1/domReady'

    }
});

requirejs(["script/main", "script/tests", "script/ko-components-registration"]);
