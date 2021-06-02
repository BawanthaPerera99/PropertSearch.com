// adding the jQuery UI spinner
$(function() {
    $("#spinner").spinner({
        min: 1,
        max: 10,
        spin: function(event, ui) {
            $(this).change();
        }
    });
});

// adding the jQuery UI spinner
$(function() {
    $("#spinner2").spinner({
        min: 1,
        max: 10,
        spin: function(event, ui) {
            $(this).change();
        }
    });
});

// adding the jQuery UI selectmenu
$(function() {
    $("#property").selectmenu();
});

// adding the jQuery UI selectmenu
$(function() {
    $("#time").selectmenu();
});

// adding the jQuery UI slider
$(function() {
    $("#slider-range").slider({
        range:true,
        min: 249500,
        max: 2550000,
        values: [ 75, 300 ],
        slide: function( event, ui ){
            $("#amount").val( "£" + ui.values[ 0 ] + " - £" + ui.values[ 1 ] );
            $("#slider-range").css('ba')
        }
    });

    $("#amount").val(" £" + $(" #slider-range").slider( "values", 0 ) + " - £" + $("#slider-range").slider( "values", 1 ) );
});

// functionality for the search button in the form
$(function() {
    $( "#Search" ).on("click", function(){

        var propType = $("#property").val();
        var maxBed =  $("#spinner").val();
        var minBed =  $("#spinner2").val();
        var date =  $("#time").val();
        var minPrice = $("#slider-range").slider("option", "values")[0];
        var maxPrice = $("#slider-range").slider("option", "values")[1];

        //retrieving the data from the external json file(properties.json)
        $.getJSON('properties.json', function (data) {
            var output="<ul>";
            for (var i in data.properties) {
                if (( propType == data.properties[i].type) || (propType=="Any"))
                    if (( minBed >= data.properties[i].bedrooms && maxBed <= data.properties[i].bedrooms ))
                        if (( date == data.properties[i].added.month) || (date=="Anytime"))
                            if (( data.properties[i].price >= minPrice && data.properties[i].price <= maxPrice ))
                            {
                                {
                                    {
                                        {
                                            output+="<h2><li>" + "£" + data.properties[i].price +"</li></h2>" + "<img src=" + data.properties[i].picture + ">" + "<h4>" + data.properties[i].location +"</h4>" + "<p>" + data.properties[i].description + "</p>" + "<button><a href='" + data.properties[i].url + "' target='_blank'>Visit Page</a></button>";
                                        } } } } }
            output+="</ul>";
            document.getElementById( "Placeholder" ).innerHTML = output;
        });
    })
});

// functionality for the view favourites button in the search page
$(function() {
    $( ".viewFavourites" ).on("click", function(){

        $("#Placeholder").remove();

        console.log("Restoring array data from local storage");

        myFavouriteProp=JSON.parse(localStorage.getItem("favProp"));

        if(myFavouriteProp == null) {
            alert("You have no favourite items");
        }

        $.getJSON('properties.json', function (data) {
            var output = "<ul>";

            if (myFavouriteProp != null) {

                for (var i = 0; i < data.properties.length; i++) {
                    for (j = 0; j < myFavouriteProp.length; j++) {

                        if (data.properties[i].id == myFavouriteProp[j]) {

                            output+="<h3><li>" + data.properties[i].bedrooms + " Bedroom" + " " + data.properties[i].type + "</li></h3>" +
                                "<img src=" + data.properties[i].picture + ">" + "<h5><li style='list-style-type: none'>"+ data.properties[i].location +"</li></h5>" +"<li style='list-style-type: none'><button><a href=' " +data.properties[i].url + "'>Visit page</a></button></li>";
                        }
                    }
                }
            }
            output+="</ul>";

            document.getElementById( "Placeholder2" ).innerHTML = output;
        })
    });
});

// functionality for the clear favourites button in the search page
$(function() {
    $( ".clearFavourites" ).on("click", function(){

        $("#Placeholder2").remove();

        myFavouriteProp=JSON.parse(localStorage.getItem("favProp"));

        localStorage.clear();

    });
});

