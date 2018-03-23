var animation = {
    suggestionArr: [
        // The first 5 items CAN'T be changed thanks
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
        console.log(animation.suggestionArr);
        animation.drawSuggestions();
    },

    drawSuggestions() {
        console.log('sdf');
        console.log(animation.suggestionArr[0]);
        $("#suggestions-1").animate({ opacity: '0' }, 500);
        $("#suggestions-2").animate({ top: "0em", opacity: '1' }, 1000);
        $("#suggestions-3").animate({ top: "1em", opacity: '.75' }, 1000);
        $("#suggestions-4").animate({ top: "2em", opacity: '.50' }, 1000);
        $("#suggestions-5").animate({ top: "3em", opacity: '.25' }, 1000, function () {
            $("#suggestions-1").text(animation.suggestionArr[0] + '?');
            $("#suggestions-2").text(animation.suggestionArr[1] + '?');
            $("#suggestions-3").text(animation.suggestionArr[2] + '?');
            $("#suggestions-4").text(animation.suggestionArr[3] + '?');
            $("#suggestions-5").text(animation.suggestionArr[4] + '?');
            $(".suggestion").removeAttr('style');
        });

    }
}

var suggestionLoop = setInterval(function() {
    animation.loopSuggestions()
}, 3000);

// $("#")