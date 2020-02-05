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
 //   getRecipe();
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
            getRecipe();

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

function getRecipe(){
// Spoonacular API call by ingredients. Returns 10 items
$.ajax({
    url: "https://api.spoonacular.com/recipes/findByIngredients?ingredients="+input+"&apiKey="+APIKeySpoonacular,
    method: "GET"
}).then(function(result){
    console.log(result)
    
    //$(result).each(function(index, element){
        // Spoonacular recipe call by ID. Currently hard-coded to only get item 0
        $.ajax({
            url: "https://api.spoonacular.com/recipes/"+result[0].id+"/information?includeNutrition=true&apiKey="+APIKeySpoonacular,
            method: "GET"
        }).then(function(result){
            console.log(result)
            createRecipeElement(result);
        })
    })
}

function createRecipeElement(result){
    $("#recipeList").empty();
    var listItem = $("<li>");
    var container = $("<div>");
    var image = $("<img>");
    var text = $("<a>");

    $(text).text(result.title);
    $(text).attr("href", result.sourceUrl);
    $(image).attr("src", result.image);

    $(container).attr("class", "ui segment");
    $(container).append(text);
    $(container).append(image);
    $(listItem).append(container);
    $("#recipeList").append(listItem);
}