var config = {
    apiKey: "AIzaSyDQvxT4o1IGoIDsnXpBko6SnrPEI9NA1DU",
    authDomain: "lets-eat-be2d8.firebaseapp.com",
    databaseURL: "https://lets-eat-be2d8.firebaseio.com",
    projectId: "lets-eat-be2d8",
    storageBucket: "lets-eat-be2d8.appspot.com",
    messagingSenderId: "844468448918"
};
events = [];
firebase.initializeApp(config);

var eventDb = firebase.database().ref('events');

//return list of user grouped by event from database based on search key.
function getEventByCatagory(category, zipCode) {

    eventDb.on('value', function (eventSnapshot) {
        let events = eventSnapshot.val();
        var eventkeys = Object.keys(events);
        let eventsArray = [];
        /**
        * Massaging the events to array , needed to use methods like 
        * find , filter ...
        */

        eventkeys.map((item, i) => {
            events[item].key = eventkeys[i];
            eventsArray.push(events[item]);
        });

        eventsArray.filter(function (event) {
            return (event.categories == category && event.location.zipCode == zipCode)
        });

        eventsArray.map((event, key) => {
            $('.container').append("<div id='" + key + "' class='col-lg-4 event-holder mt-2'> " + event.eventName + "</div>")
            if (event.users !== undefined) {
                $('#' + key).append("<ol id='list-" + key + "'></ol>");
                for (let user of event.users) {
                    $("#list-" + key).append("<li>" + user.firstName + "  " + user.lastName + "</li>");
                }
                //$('#'+key).append("<button  class='col-lg-2'>Info</button>");
                //appended event key as data ,that will help us to identify which event the usr will join .
                $('#' + key).append("<button  class='col-lg-2' data-event-key='" + event.key + "'> Join</button>");
            }
        });
    });

}

