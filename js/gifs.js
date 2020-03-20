
var authKey = "3q7G0RzvYaIOREuv0CawTAaXF5wWdWNe";

var queryURLBase = "http://api.giphy.com/v1/gifs/search?api_key=" + authKey + "&q=";

var limit10 = "&limit=10&offset=&rating=G&lang=en";

var searchTerm = "";



function runQuarry(queryURL) {


    $.ajax({url: queryURL, method: "GET"})
        .done(function(response) {

            console.log(queryURL);
            console.log(response);
        })
}




$("#addButton").on("click", function() {

    searchTerm = $("#exampleFormControlInput1").val().trim();
    console.log(searchTerm);

    var newURL = queryURLBase + searchTerm + limit10;
    console.log(newURL)
    
    runQuarry(newURL);

    return false;
});
