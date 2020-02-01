// API keys that may be useful
var APIKeyUSDA = "L3tHPcFfPTSKSiXbCfKg2KltRijm4Dlj6PL2hK7I"
var APIKeySpoonacular = "bbf5060f9b6b4edaa0e013dcaafdeb43"

var input
function makeCalls(){
    // USDA ajax call of the generic item
    $.ajax({
        url: "https://api.nal.usda.gov/fdc/v1/search?api_key="+APIKeyUSDA+"\&generalSearchInput="+input,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        // USDA call with item's ID
        $.ajax({
            url: "https://api.nal.usda.gov/fdc/v1/"+ response.foods[0].fdcId+"?api_key="+APIKeyUSDA,
            method:"GET"
        }).then(function(response){
            console.log(response)
    })})
    
}
$("#searchBar").on("click", function(){
    input = $("#inputField").val();
    console.log(input)
    makeCalls();
})