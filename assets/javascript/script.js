//JavaScript Path Configuration
requirejs.config({
    "baseUrl": "./assets/javascript/lib",
    "paths": {
        "script": "../script",
        "jquery": "//code.jquery.com/jquery-3.3.1.min",
        "corsanywhere": "cors-anywhere",
        "ko": '//cdnjs.cloudflare.com/ajax/libs/knockout/3.4.2/knockout-min',
        "koDebug": '//cdnjs.cloudflare.com/ajax/libs/knockout/3.4.2/knockout-debug',
    }
});

requirejs(["script/main", "script/tests", "script/ko-components"]);