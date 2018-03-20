
$(document).ready(function () {

    function CreateActivity(name, email, eventObj) {
        var self = this;
        self.name = name,
        self.email = email,
        self.eventObj = ko.observable(eventObj);
    }




    function ActivityViewModel() {

        var self = this;

        self.availableEvents = [{ eventName: "Taco Bell", eventKey: "1", zipcode: "77077" },
        { eventName: "Chipotle", eventKey: "2", zipcode: "77077" },
        { eventName: "Torchys", eventKey: "3", zipcode: "77077" }
        ];


        self.user = { name: "test", email: "test@gmail.com" };
        // Editable data
        self.activities = ko.observableArray([

            new CreateActivity("test","test@gmail.com", self.availableEvents[0]),

        ]);


    }
    ko.applyBindings(new ActivityViewModel());

})