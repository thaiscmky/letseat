var animation = {
    suggestionArr: [
        'food 1',
        'food 2',
        'food 3',
        'food 4',
        'food 5',
        'food 6'
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
        $("#suggestions-1").text(animation.suggestionArr[0] + '?');
        $("#suggestions-2").text(animation.suggestionArr[1] + '?');
        $("#suggestions-3").text(animation.suggestionArr[2] + '?');
        $("#suggestions-4").text(animation.suggestionArr[3] + '?');
    }
}
