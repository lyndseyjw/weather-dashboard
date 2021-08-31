var searchButton = $('.searchButton');
var searchInput = $('.searchInput');
var localStorageDiv = $('.localStorageDiv');
var savedCities = [];
var weatherIcon;
var iconCode;
var iconArray = [];
var weatherCodeArray = [];
var weatherIconArray = [];
var temp;
var wind;
var humidity;
var UV;
var city;

localStorageDiv.on("click", 'button', function(event) {
    
    console.log(event);

    var savedCity = $(this).attr("data-city");

    city = savedCity;
    searchWeather();
});

searchButton.on('click', function() {

    city = searchInput.val();
    savedCities.push(city);
    localStorage.setItem("cities", JSON.stringify(savedCities));

    savedCities = JSON.parse(localStorage.getItem("cities"));

    var button = $("<button>");
    button.text(savedCities.slice(-1).pop());
    button.attr("style", "background-color:rgb(219, 84, 97); color:rgb(241, 237, 238)");
    button.attr("data-city", city);
    localStorageDiv.append(button);

    searchInput.val('');
    searchWeather();
})

function searchWeather() {

    // var positionStackURL = 'https://cors-anywhere.herokuapp.com/http://api.positionstack.com/v1/forward?access_key=504536cca90d4c48fb032176b5240b9c&query=' + city

    var openWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=ab330beac43f3deca21f334bab6bb536"

    fetch(openWeatherURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data);

            latitude = data.coord.lat;
            longitude = data.coord.lon;
            console.log(latitude);
            console.log(longitude);

            var weatherURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&units=imperial&appid=ab330beac43f3deca21f334bab6bb536'

            fetch(weatherURL)
                .then(function (response) {
                    return response.json()
                })
                .then(function (data) {
                    console.log(data);
                    
                    iconCode = data.current.weather[0].icon;
                    console.log(iconCode);

                    var url = "https://openweathermap.org/img/w/" + iconCode + ".png";
                    var iconEl = $('<img>');
                    iconEl.attr('src',url);

                    var cityName = $('.cityName');
                    console.log(cityName);
                    cityName.text(city + " " + moment().format("M/D/YYYY"));
                    cityName.append(iconEl);

                    temp = data.current.temp;
                    var cityTemp = $('.cityTemp');
                    console.log(cityTemp);
                    cityTemp.text("Temp : " + temp + "°F");

                    wind = data.current.wind_speed;
                    var cityWind = $('.cityWind');
                    console.log(cityWind);
                    cityWind.text("Wind : " + wind + " MPH");

                    humidity = data.current.humidity;
                    var cityHumidity = $('.cityHumidity');
                    console.log(cityHumidity);
                    cityHumidity.text("Humidity : " + humidity + "%");

                    UV = data.current.uvi;
                    var cityUV = $('.cityUV');
                    console.log(cityUV);
                    cityUV.text(UV);

                    if (UV <= 2) {

                        cityUV.attr('style', 'background-color:green; color:white; padding:5px; border-radius:5px;');
                    
                    } else if (UV >= 8) {

                        cityUV.attr('style', 'background-color:red; color:white; padding:5px; border-radius:5px;');
                    
                    } else {

                        cityUV.attr('style', 'background-color:yellow; color:rgb(219, 84, 97); padding:5px; border-radius:5px;');
                    }

                    var date1 = moment().add(1, 'days');
                    $('.date1').text(date1.format("M/D/YYYY"));

                    var date1IconEl = $('<img>');
                    var date1IconCode = data.daily[1].weather[0].icon;
                    var date1IconURL = "https://openweathermap.org/img/w/" + date1IconCode + ".png";
                    date1IconEl.attr("src", date1IconURL);
                    $('.date1Emoji').html(date1IconEl);

                    var date1Temp = data.daily[1].temp.day;
                    $('.date1Temp').text("Temp : " + date1Temp + "°F");

                    var date1Wind = data.daily[1].wind_speed;
                    $('.date1Wind').text("Wind : " + date1Wind + " MPH");

                    var date1Humidity = data.daily[1].humidity;
                    $('.date1Humidity').text("Humidity : " + date1Humidity + "%");

                    var date2 = moment().add(2, 'days');
                    $('.date2').text(date2.format("M/D/YYYY"));

                    var date2IconEl = $('<img>');
                    var date2IconCode = data.daily[2].weather[0].icon;
                    var date2IconURL = "https://openweathermap.org/img/w/" + date2IconCode + ".png";
                    date2IconEl.attr("src", date2IconURL);
                    $('.date2Emoji').html(date2IconEl);

                    var date2Temp = data.daily[2].temp.day;
                    $('.date2Temp').text("Temp : " + date2Temp + "°F");

                    var date2Wind = data.daily[2].wind_speed;
                    $('.date2Wind').text("Wind : " + date2Wind + " MPH");

                    var date2Humidity = data.daily[2].humidity;
                    $('.date2Humidity').text("Humidity : " + date2Humidity + "%");

                    var date3 = moment().add(3, 'days');
                    $('.date3').text(date3.format("M/D/YYYY"));

                    var date3IconEl = $('<img>');
                    var date3IconCode = data.daily[3].weather[0].icon;
                    var date3IconURL = "https://openweathermap.org/img/w/" + date3IconCode + ".png";
                    date3IconEl.attr("src", date3IconURL);
                    $('.date3Emoji').html(date3IconEl);

                    var date3Temp = data.daily[3].temp.day;
                    $('.date3Temp').text("Temp : " + date3Temp + "°F");

                    var date3Wind = data.daily[3].wind_speed;
                    $('.date3Wind').text("Wind : " + date3Wind + " MPH");

                    var date3Humidity = data.daily[3].humidity;
                    $('.date3Humidity').text("Humidity : " + date3Humidity + "%");

                    var date4 = moment().add(4, 'days');
                    $('.date4').text(date4.format("M/D/YYYY"));

                    var date4IconEl = $('<img>');
                    var date4IconCode = data.daily[4].weather[0].icon;
                    var date4IconURL = "https://openweathermap.org/img/w/" + date4IconCode + ".png";
                    date4IconEl.attr("src", date4IconURL);
                    $('.date4Emoji').html(date4IconEl);

                    var date4Temp = data.daily[4].temp.day;
                    $('.date4Temp').text("Temp : " + date4Temp + "°F");

                    var date4Wind = data.daily[4].wind_speed;
                    $('.date4Wind').text("Wind : " + date4Wind + " MPH");

                    var date4Humidity = data.daily[4].humidity;
                    $('.date4Humidity').text("Humidity : " + date4Humidity + "%");

                    var date5 = moment().add(5, 'days');
                    $('.date5').text(date5.format("M/D/YYYY"));

                    var date5IconEl = $('<img>');
                    var date5IconCode = data.daily[5].weather[0].icon;
                    var date5IconURL = "https://openweathermap.org/img/w/" + date5IconCode + ".png";
                    date5IconEl.attr("src", date5IconURL);
                    $('.date5Emoji').html(date5IconEl);

                    var date5Temp = data.daily[5].temp.day;
                    $('.date5Temp').text("Temp : " + date5Temp + "°F");

                    var date5Wind = data.daily[5].wind_speed;
                    $('.date5Wind').text("Wind : " + date5Wind + " MPH");

                    var date5Humidity = data.daily[5].humidity;
                    $('.date5Humidity').text("Humidity : " + date5Humidity + "%");
                })

        })
}

function displayCities() {

    if (localStorage.getItem("cities")) {

        savedCities = JSON.parse(localStorage.getItem("cities"));

        for (var i = 0; i < savedCities.length; i++) {
        
            var button = $("<button>");
            button.text(savedCities[i]);
            button.attr("data-city", savedCities[i]);
            button.attr("style", "background-color:rgb(219, 84, 97); color:rgb(241, 237, 238)")
            localStorageDiv.append(button);
        }
    }
}

displayCities();