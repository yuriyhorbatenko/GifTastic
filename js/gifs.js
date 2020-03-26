

var searchTerm = "";

var topics = ["BMW", "Audi", "Football", "Dua Lipa", "Mortal Kombat", "Airplanes", "Nike"]

var authKeyGiphy = "3q7G0RzvYaIOREuv0CawTAaXF5wWdWNe";

var queryUrlGiphy = "https://api.giphy.com/v1/gifs/search?api_key=" + authKeyGiphy + "&q=";

var limit10Giphy = "&limit=10&offset=&rating=&lang=en";



function runQuarry(queryUrlGiphy) {

    $.ajax({url: queryUrlGiphy, method: "GET"})

        .done(function(response) {

            console.log(queryUrlGiphy);
            
            for (var i = 0; i < response.data.length; i++) {

            var GiphyGifStill = response.data[i].images.fixed_height_still.url;
            var GiphyGifState = response.data[i].images.fixed_height.url;
            var GiphyRateUrl = response.data[i].rating;
            var GiphyTitleUrl = response.data[i].title;
            
            var GiphyDiv = $("<div>");
                GiphyDiv.attr("id", "gifs");

            var GiphyRate = $("<p>").text("Rating: " + GiphyRateUrl);
            var GiphyTitle = $("<p>").text(GiphyTitleUrl);

            var GiphyGif = $("<img>");
                GiphyGif.attr("src", GiphyGifStill);
                GiphyGif.attr("data-animate", GiphyGifState);
                GiphyGif.attr("data-still", GiphyGifStill);
                GiphyGif.on('click', Animate);

                GiphyDiv.append(GiphyTitle);
                GiphyDiv.append(GiphyGif);
                GiphyDiv.append(GiphyRate);
                
            $("#gifsDiv").prepend(GiphyDiv);
        }
    })
}



function Animate() { 
    var state = $(this).attr("data-state");
        console.log(state);
if  (state === "still"){
    $(this).attr("src", $(this).data("animate"));
    $(this).attr("data-state", "animate");
    }

else {
    $(this).attr("src", $(this).data("still"));
    $(this).attr("data-state", "still");
    }
}



function TagsForYou(){
        
        $("#tags").empty();

    for ( var i=0; i < topics.length; i++) {
        
        var Tags = $("<button>");

        Tags.attr("type", "button");
        Tags.addClass("btn btn-outline-dark");
        Tags.addClass("allTags");
        Tags.attr("data-name", topics[i]);
        Tags.attr("id", "buttonTags");
        Tags.text(topics[i]);
        $("#tags").append(Tags);
    }
}
         TagsForYou();



function addButton() {

        event.preventDefault();
        if ($("#exampleFormControlInput1").val().trim() == ""){
            alert("Please type something!");
        }

        else {
            searchTerm = $("#exampleFormControlInput1").val().trim();
            topics.push(searchTerm);
            TagsForYou();
        }
}



$(document).on("click", ".allTags",  function() {

    var NewSearchTerm = $(this).attr("data-name");
    var MyButtonTags = queryUrlGiphy + NewSearchTerm + limit10Giphy;
    $("#gifsDiv").empty();
    console.log(this)
    
    runQuarry(MyButtonTags);
    
    return false;
});   



$("#SearchButton").on("click", function() {

    if ($("#exampleFormControlInput1").val().trim() == ""){
        alert("Please type something!");
    }

    else {
        $("#gifsDiv").empty();

        searchTerm = $("#exampleFormControlInput1").val().trim();

    var newUrlGiphy = queryUrlGiphy + searchTerm + limit10Giphy;
        
        console.log(newUrlGiphy)
    
        runQuarry(newUrlGiphy);
    }
});



$("#ClearButton").on("click", function() {

    $("#gifsDiv").empty();
    $("#exampleFormControlInput1").empty();
    
});



$("#addButton").on("click", function(event) {

    if(!event.detail || event.detail == 1){
    
    addButton()
    }
    return false         
});