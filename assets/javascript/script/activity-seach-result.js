
// let say to transfer a variable(searchingkey) page to page we stored it in localstorage 
// and now we can get a searching key from local storage 

var searchTerm = localStorage.getItem("searchTerm");
var zipcode = localStorage.getItem("zipcode");
//we also have a firebases ref()
var eventDatabase = firebase.database.ref("event");
var userDatabase = firebase.database.ref("user");
var listOfEvent = [];
var listOfUsers = [];

var eventObj = {
    eventKey: null,
    eventName: null,

}
var userObj = {
    memberName: null,
    eventName: null,
    eventKey: null,
}

eventDatabase.on("value", function (eventSnapshot) {

    if (typeof Object.keys(eventSnapshot) === 'undefined' || Object.keys(eventSnapshot).length === 0 || eventSnapshot === null) {

        return;
    }
    var eventkeys = Object.keys(eventSnapshot);
    eventkeys.forEach(key => {

        if (eventSnapshot[key].zipcode === zipcode && eventSnapshot[key].searchTerm === searchTerm) {
            eventObj.eventKey = key;
            eventObj.eventName = eventSnapshot[key].eventName;
            listOfEvent.push(eventObj);
        }
    });
    console.log(listOfEvent);
})
userDatabase.on("value", function (uesrSnapshot) {
    if (typeof Object.keys(uesrSnapshot) === 'undefined' || Object.keys(uesrSnapshot).length === 0 || uesrSnapshot === null) {

        return;
    }
    var userKey = Object.keys(uesrSnapshot);
    userKey.forEach(key => {

        for (var i = 0; i < listOfEvent.length; i++) {
            if (listOfEvent[i].eventKey === uesrSnapshot[key].eventkey) {

                userObj.memberName = uesrSnapshot[key].userName;
                userObj.eventName = listOfEvent[i].eventName;
                userObj.eventKey = listOfEvent[i].eventKey;
                listOfUsers.push(userObj);

            }
        }
    })
    console.log(listOfUsers);

})

function displayEvent() {

    if (typeof Object.keys(eventSnapshot) === 'undefined' || Object.keys(eventSnapshot).length === 0 || eventSnapshot === null) {

        //TODO: display  creat event button on the page .
        return;
    }

    if (listOfUsers.length === 0 ) {

        return;
    }

    var groupedByEventKey = _.groupBy(listOfUsers, function (e) {
        return e.eventKey;
        console.log(groupedByEventKey);
    });


    var eventKey = Object.keys(groupedByEventKey);
    eventKey.forEach(key => {

        //TODO : create and append HTML element dynamically  with the  list of  members name and  event name 

    })




}