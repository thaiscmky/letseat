var config = {
    apiKey: "AIzaSyDQvxT4o1IGoIDsnXpBko6SnrPEI9NA1DU",
    authDomain: "lets-eat-be2d8.firebaseapp.com",
    databaseURL: "https://lets-eat-be2d8.firebaseio.com",
    projectId: "lets-eat-be2d8",
    storageBucket: "lets-eat-be2d8.appspot.com",
    messagingSenderId: "844468448918"
};

firebase.initializeApp(config);

var eventDb = firebase.database().ref('events');


var validInput = true;
function inputValidation() {
    if ($("#firstName").val() === "" && $("#lasttName").val() === "" && $("#email").val() === "") {

        validInput = false;
        // TODO: display a massage for a user to insert the input.
        return validInput;

    }
    else {
        return validInput;
    }
}
//load user data 

var userInfoObj = {
    firstName: null,
    lastName: null,
    email: null,
}
//this function return true if the user exist ,else its return false. 
function isUserExistValidation() {
    var isUserExis = false;
    let eventsArray = [];
    userInfoObj.firstName = $("#firstName").val();
    userInfoObj.lastName = $("#lasttName").val();
    userInfoObj.email = $("#email").val();

    eventDb.on('value', function (eventSnapshot) {
        let events = eventSnapshot.val();
        var eventkeys = Object.keys(events);
        
        /**
        * Massaging the events to array , needed to use methods like 
        * find , filter ...
        */
       
        eventkeys.map((item, i) => {
            events[item].key = eventkeys[i];
            eventsArray.push(events[item]);
        });

        eventsArray.filter(function (event) {
            return (event.users.firstName == userInfoObj.firstName  && event.users.lastName == userInfoObj.lastName  && event.users.email ==userInfoObj.email )
        });
    
    });
    if(eventsArray.length >0){
        isUserExis = true;
    }
    return isUserExis;


}