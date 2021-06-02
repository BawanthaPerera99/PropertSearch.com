// jQuery UI tabs
$(function() {
    $( "#tabs-1" ).tabs();
});

function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
}
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
}
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

// functionality for the add to favourites button in the property page
$(function() {
    $( ".addFavourites" ).on("click", function(){

        try {
            $(this).attr('disabled', true);

            var propIdToAdd = $(this).closest("p").attr("id");

            var myFavouriteProp=JSON.parse(localStorage.getItem("favProp"));

            if(myFavouriteProp == null) {
                myFavouriteProp = [];
            }
            var check = false;

            if(myFavouriteProp != null) {
                for ( var j = 0; j < myFavouriteProp.length; j++) {

                    if ( propIdToAdd == myFavouriteProp[j]) {
                        alert("This property is already in your favourites");
                        myFavouriteProp = [];
                        check = true;
                    }
                }
            }

            // creating the alert boxes
            if (!check){
                alert("This property has been added to the favourites")
            }

            myFavouriteProp.push(propIdToAdd);

            localStorage.setItem("favProp", JSON.stringify(myFavouriteProp));

        }

        // handling the exceptions
        catch (e) {
            if (e==QUOTA_EXCEEDED_ERR) {
                console.log("Error: Local storage limit exceeds");
            }

            else {
                console.log("ERROR: Saving to local storge.");
            }
        }
    });
});

// functionality for the remove from the favourites button in the property page
$(function() {
    $( ".removeFavourites" ).on("click", function(){

        $(this).attr('disabled', true);

        var propIdToRemove = $(this).closest("p").attr("id");

        myFavouriteProp=JSON.parse(localStorage.getItem("favProp"));


        if(myFavouriteProp != null) {
            for ( var j = 0; j < myFavouriteProp.length; j++) {

                if ( propIdToRemove == myFavouriteProp[j]) {

                    alert("This Property has been removed");

                    delete myFavouriteProp[j];

                    localStorage.setItem("favProp", JSON.stringify(myFavouriteProp));

                    myFavouriteProp[j] = [];
                }
            }
        }

        if(myFavouriteProp == null) {
            alert("You have no favourite items");
        }
    });
});
