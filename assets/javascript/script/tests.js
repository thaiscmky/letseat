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

function getDbStructure() {
    return {
        "events" : {
          "mexicos-deli-houston" : {
            "categories" : "chicken",
            "eventName" : "Mexicos Deli",
            "location" : {
              "addess1" : "2374 S Dairy Ashford Rd",
              "city" : "houston",
              "zipCode" : 77077
            },
            "users" : [ {
              "email" : "tom@gmail.com",
              "firstName" : "Tom",
              "lastName" : "David"
            }, {
              "email" : "me@you.com",
              "fistName" : "me",
              "lastName" : "you"
            } ]
          },
          "ramen-bar-ichi-houston" : {
            "categories" : "chicken",
            "eventName" : "Ramen Bar Ichi",
            "location" : {
              "address1" : "2374 S Dairy Ashford Rd",
              "city" : "houston",
              "zipcode" : "77077"
            },
            "user" : [ {
              "email" : "Ali@gmail.com",
              "firstName" : "Ali",
              "lastName" : "Ali"
            }, {
              "email" : "letseat@yahoo.com",
              "firstName" : "lets",
              "lastName" : "eat"
            } ]
          }
        }
      };
      
}