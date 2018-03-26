
define(["jquery", "bootstrap", "corsanywhere", "ko", "koDebug"], function ($, bootstrap, cors, ko, kob) {

    var animation = {
        suggestionArr: [
            // The first 5 items CAN'T be changed
            'pizza',
            'rib-eye steak',
            'ice cream',
            'fried chicken',
            'texas bbq',
            'pasta',
            'hambugers',
            'cajun food',
            'korean bbq',
            'lobster',
        ],

        loopSuggestions() {
            var firstIndex = animation.suggestionArr.shift();
            animation.suggestionArr.push(firstIndex);
            animation.drawSuggestions();
        },

        drawSuggestions() {
            $(".suggestion").finish();
            $("#suggestions-1").animate({ opacity: '0' }, 500);
            $("#suggestions-2").animate({ top: "+0em", opacity: '1' }, 1000);
            $("#suggestions-3").animate({ top: "+1em", opacity: '.75' }, 1000);
            $("#suggestions-4").animate({ top: "+2em", opacity: '.50' }, 1000);
            $("#suggestions-5").animate({ top: "+3em", opacity: '.25' }, 1000, function () {
                $("#suggestions-1").text(animation.suggestionArr[0] + '?');
                $("#suggestions-2").text(animation.suggestionArr[1] + '?');
                $("#suggestions-3").text(animation.suggestionArr[2] + '?');
                $("#suggestions-4").text(animation.suggestionArr[3] + '?');
                $("#suggestions-5").text(animation.suggestionArr[4] + '?');
                $(".suggestion").removeAttr('style');
            });

        },

        headerFly() {
            $("header").animate({ opacity: '0', top: '-=100vh', height: '0px' }, 200, 'easeInBack', function () {
                $("header").css({ display: 'none' });
                clearInterval(suggestionLoop);
            })
            $("#main-content").removeAttr('style');
        },

        errorMessageLanding(errText) {
            $("#landingErrMsg").finish();
            $("#landingErrMsg").text(errText);
            $("#landingErrMsg").animate({ opacity: '1' }, 0, function () {
                $("#landingErrMsg").animate({ opacity: '0'}, 2000, 'easeInExpo')
            })

        }
    }

    var suggestionLoop = setInterval(function () {
        animation.loopSuggestions()
    }, 3000);


    function searchValidation() {

        var error = [];
        if (!/^[a-zA-Z0-9\s._\-]+$/.test($("#searchTerm").val())) {
            error.push('search')
        }

        if (!/(^\d{5}$)|(^\d{5}-\d{4}$)/.test($("#zipCode").val())) {
            error.push("zipcode")
        }
        console.log('Error: ' + error);
        return error;
    }


    $("#submitSearch").on("click", function (e) {
        console.log("Search Validation Result: Error in : ", searchValidation());
        if (searchValidation().length > 0) {
            if (searchValidation().indexOf("zipcode") >= 0) animation.errorMessageLanding("Invalid Zip Code");
            else if (searchValidation().indexOf("search") >= 0) animation.errorMessageLanding("Please enter a search term");
            return;
        }
        animation.headerFly();
        animation.headerFade();


    });

});