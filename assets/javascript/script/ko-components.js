define(["jquery", "ko", "koDebug"], function($, ko, kob) {
    ko.components.register('suggestion-widget', {
        viewModel: function(params) {
            this.food = params.value;
            this.searchSelected = function() {
                console.log('Execute search on keyword: ' + this.food + '.');
            };
        },
        template: //TODO: load template from external file
            '<a data-bind="click: searchSelected.bind($data), clickBubble: false"><li data-bind="text: food"></li></a>'
    });
});