// API keys that may be useful
var APIKeyUSDA = "L3tHPcFfPTSKSiXbCfKg2KltRijm4Dlj6PL2hK7I"
var APIKeySpoonacular = "bbf5060f9b6b4edaa0e013dcaafdeb43"

var input;

//Listens for a click on the Search submit button
$('#inputSubmit').on("click",(function(){
    $('#inputDiv').addClass('loading');
    input = $('#inputField').val();
    console.log("Search String: " + input);

    //Clears any existing search results
    $('#usdaResultsList').empty();

    getUSDAGeneral();
}))


function getUSDAGeneral(){

    $.ajax({
        url: "https://api.nal.usda.gov/fdc/v1/search?api_key="+APIKeyUSDA+"\&generalSearchInput="+input+"\&includeDataTypeList=SR%20Legacy,Foundation",
        method: "GET"
    }).then(function(response) {
        console.log(response);
        $('#inputDiv').removeClass('loading');
        
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

        //Listens for clicks on USDA general result items
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

        $('#itemName').text(response.description)

    })
}