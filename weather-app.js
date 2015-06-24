var app = {};

app.getConditions = function(userProvince, userCity){

  $.ajax({
    url:"http://api.wunderground.com/api/6aaf4b4a2f7e9b41/conditions/q/" + userProvince + "/" + userCity + ".json",
    dataType:"jsonp",
    type:"GET",
    success:function(response){
      // console.log("conditions, It worked!");
      console.log(response.response.error);
      if(response.response.error  !== undefined) {

        var errorMsg = response.response.error.type; 
        console.error("No city");

        if (errorMsg === "querynotfound"){
          $('.notFound').text("No cities match your search query");
        }
        else if (errorMsg = "invalidquery"){
          $('.notFound').text("You must supply a location in the search below:");
        }
      }
      else {
        app.displayConditionsInfo(response);
      }
    }
  });
};

// gathering info from form search
app.collectInfo = function() {
  $('form').on('submit', function(e) {
    e.preventDefault();
    var province = $('input#province').val();
    var city = $('input#city').val();
    app.getConditions(province, city);
  //clear search value -- ('') -empty string is clearing the bar
    $(this).find('input[type=search]').val('');
  });
}

//Dislaying Info
app.displayAstronomyInfo = function(apiData){

//show info in results div
  var $elm = $("#scrollDown").offset();
  $('html, body').animate({
    scrollTop: $elm.top
  },1000);
}
  
// Displaying Conditions
app.displayConditionsInfo = function(apiData){

  // Condition API details
  var windGustMph = apiData.current_observation.wind_mph;
  var locationCity = apiData.current_observation.observation_location.city;
  var weather = apiData.current_observation.weather;
  var windDirection = apiData.current_observation.wind_dir;
  var temperature = apiData.current_observation.temperature_string;
  var uv = apiData.current_observation.UV;

  // //output details
  $('.temperature').text('Temperature: ' + temperature);
  $('.weather').text('Weather: '+ weather);
  $('.uv').text('UV Index: ' + uv);
  $('.windGustMph').text('Wind Speed: ' + windGustMph + ' MPH ');
  $('.windDirection').text('Wind Direction: ' + windDirection);
  $('.locationCity').text(' City: ' + locationCity);
}

// Initalize the function
app.init = function(){
  //this function is calling the collectinfo to start
  app.collectInfo();

};

$(document).ready(function(){
  app.init();

});

