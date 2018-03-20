$(document).ready(function () {
    function landingViewModel() {
        var self = this;

        self.zipCode = ko.observable('');

        self.zipInfo = ko.observable('');

        self.zipRequest = ko.computed(function () {
            console.log(self.zipCode());
            var info = '';
            $.ajax({                
                url: "http://maps.googleapis.com/maps/api/geocode/json?address=" + self.zipCode(),
                method: "GET"
            }).done(function (res) {                                
                info = res.results[0].formatted_address;                                
                self.zipInfo(info);
            });                        
        })
    }

    ko.applyBindings(new landingViewModel());
})