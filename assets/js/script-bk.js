// API keys that may be useful
var APIKeyUSDA = "L3tHPcFfPTSKSiXbCfKg2KltRijm4Dlj6PL2hK7I"
var APIKeySpoonacular = "bbf5060f9b6b4edaa0e013dcaafdeb43"

var input;

//Listens for a click on the Search submit button
$('#inputSubmit').on("click",(function(){
    input = $('#inputField').val();
    console.log("Search String: " + input);
    $('#usdaResultsList').empty();
    getUSDAGeneral();
}))


function getUSDAGeneral(){

    $.ajax({
        url: "https://api.nal.usda.gov/fdc/v1/search?api_key="+APIKeyUSDA+"\&generalSearchInput="+input,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        
        //Loop through the resulting array of food items 
        response.foods.forEach(function(item, index){

            //Create an appendix string specifying the brand if one exists 
            if ( 'brandOwner' in item )
                { var brand = " --[Brand: " + item.brandOwner + "]";}
            else 
                { var brand = "";}            

            //Create and append a list element that relates to this food item
            var listItem = $('<li/>').attr('data-fdcid', item.fdcId).html('<a class="usda-results" href="#">' + item.description +  brand + '</a>');
            $('#usdaResultsList').append(listItem);

        })

        //Listens for a click on any USDA general result
        $('.usda-results').on("click",(function(){
            event.stopPropagation();
            var fdcId = $(this).parent().attr('data-fdcid');
            console.log("FDC ID of selected item: " + fdcId);
            getUSDASpecific(fdcId);
        }))
    })
}

function getUSDASpecific(lookup){
    $.ajax({
        url: "https://api.nal.usda.gov/fdc/v1/"+ lookup +"?api_key="+APIKeyUSDA,
        method:"GET"
    }).then(function(response){
        console.log(response);



    })
}






