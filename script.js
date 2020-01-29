// API keys that may be useful
var APIKeyNutritionix = "543062e2f89a916d71461f4c8c3befda"
var APIKeyUSDA = "L3tHPcFfPTSKSiXbCfKg2KltRijm4Dlj6PL2hK7I"


// backend test code
var input = "Whopper"

$.ajax({
    url: "https://api.nal.usda.gov/fdc/v1/search?api_key="+APIKeyUSDA+"\&generalSearchInput="+input,

    method: "GET"
}).then(function (response) {
	console.log(response);
});
$.ajax({
    url: "https://api.nal.usda.gov/fdc/v1/"+ "444977"+"?api_key="+APIKeyUSDA,
    method:"GET"
}).then(function(response){
    console.log(response)
})