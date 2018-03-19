function MyFirstModelView() {
    this.firstName = "Thais";
    this.lastName = "Cailet";
}

$(document).ready(function(){
    ko.applyBindings(new MyFirstModelView());
});