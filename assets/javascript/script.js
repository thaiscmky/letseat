// JavaScript path configuration
requirejs.config({
    "baseUrl": "./assets/javascript/lib",
    "paths": {
        "script": "../script",
        "jquery": "//code.jquery.com/jquery-3.3.1.min",
        "bootstrap": "//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.bundle.min",
        "corsanywhere": "cors-anywhere",
        "ko": '//cdnjs.cloudflare.com/ajax/libs/knockout/3.4.2/knockout-min',
        "koDebug": '//cdnjs.cloudflare.com/ajax/libs/knockout/3.4.2/knockout-debug',
        "koComponentRegister": 'ko-components-registration',
        "text": '//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text',
        "domReady": '//cdnjs.cloudflare.com/ajax/libs/require-domReady/2.0.1/domReady'

    }
});

requirejs(["script/main", "script/tests", "script/ko-components-registration"]);