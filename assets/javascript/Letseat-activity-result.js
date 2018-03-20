
// let say to transfer a variable(searchingkey) page to page we stored it in localstorage 
// and now we can get a searching key from local storage 

var searchTerm = localStorage.getItem("searchTerm");
var zipcode = localStorage.getItem("zipcode");
//we also have a firebases ref()
var eventDatabase = firbase.database.ref("event");
var userDatabase = firbase.database.ref("user");
var listOfEvent = [];
var listOfUsere = [];

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
    var userKey = Object.keys(uesrSnapshot);
    userKey.forEach(key => {

        for (var i = 0; i < listOfEvent.length; i++) {
            if (listOfEvent[i].eventKey === uesrSnapshot[key].eventkey) {

                userObj.memberName = uesrSnapshot[key].userName;
                userObj.eventName = listOfEvent[i].eventName;
                userObj.eventKey = listOfEvent[i].eventKey;
                listOfUsere.push(userObj);

            }
        }
    })
    console.log(listOfUsere);

})

function displayEvent() {

    var groupedByEventKey = _.groupBy(listOfUsere, function (e) {
        return e.eventKey;
        console.log(groupedByEventKey);
    });

    
    var eventKey = Object.keys(groupedByEventKey);
    eventKey.forEach(key => {

    //TODO : create HTML element dynamically  and display list of event member with event name 
        
    })




}