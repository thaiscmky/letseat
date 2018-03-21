var searchViewModel;
var activityViewModel
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

        self.showActivity = ko.computed(function(){


        },self)


    }

    $("#search").on("click",function(){

        var args = {
            url: 'https://api.yelp.com/v3/businesses/',
            type: 'search?',
            query: {
                categories: 'chicken',
                limit: 10, //number of results to return
                location: '77077'
            }
        };

        //console.log(searchViewModel.searchKey());
        //console.log(searchViewModel.zipcode());

    })

    function SearchViewModel(searchKey,zipcode){

        var self = this;
        self.searchKey = ko.observable(searchKey);
        self.zipcode = ko.observable(zipcode);
    }

    searchViewModel = new SearchViewModel("pizza","77077");
    activityViewModel = new ActivityViewModel();
    ko.applyBindings(activityViewModel,document.getElementById("NewActivityContainer"));
    ko.applyBindings(searchViewModel,document.getElementById("searchContainer"));

})