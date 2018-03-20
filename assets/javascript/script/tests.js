function testYelpRequest(apitoken){
    var args = {
        url: 'https://api.yelp.com/v3/businesses/',
        type: 'search?',
        query: {
            categories: 'chicken',
            limit: 10, //number of results to return
            location: '77077'
        }
    };
    testApiCall(args, apitoken)
}

function testApiCall(options, apitoken){
    $.when(secureApiRequest.fetchResponse(options, apitoken)).done(function(){
        console.log(secureApiRequest.responseObject);
    });
}