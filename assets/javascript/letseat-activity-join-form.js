

var userDatabase = firbase.database.ref("user");

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
userDatabase.on("value", function (uesrSnapshot) {
    if (typeof Object.keys(uesrSnapshot) === 'undefined' || Object.keys(uesrSnapshot).length === 0 || uesrSnapshot === null) {

        return;
    }
});

var userInfoObj = {
    firstName: null,
    lastName: null,
    email: null,
}
//this function return true if the user exist else its return false. 
function isUserExistValidation() {

    userInfoObj.firstName = $("#firstName").val();
    userInfoObj.lastName = $("#lasttName").val();
    userInfoObj.email = $("#email").val();

    var isUserExis = false;
    var userKey = Object.keys(uesrSnapshot);
    userKey.forEach(key => {


        if (uesrSnapshot[key].firstName === userInfoObj.firstName 
            && uesrSnapshot[key].lastName === userInfoObj.lastName 
            && uesrSnapshot[key].email === userInfoObj.email) {
            
            isUserExis=true;
            return isUserExis;
        
        }

    })
    return isUserExis;


}