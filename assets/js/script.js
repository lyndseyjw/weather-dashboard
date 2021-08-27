var searchButton = $('.searchButton');
var searchInput = $('.searchInput');
var localStorageDiv = $('.localStorageDiv');
var savedCities = [];

searchButton.on('click', function() {

    var city = searchInput.val();
    savedCities.push(city);
    localStorage.setItem("cities", JSON.stringify(savedCities));

    savedCities = JSON.parse(localStorage.getItem("cities"));

    var button = $("<button>");
    button.text(savedCities.slice(-1).pop());
    button.attr("style", "background-color:rgb(219, 84, 97); color:rgb(241, 237, 238)");
    localStorageDiv.append(button);

    searchInput.val('');

    var cityName = $('.cityName');
    cityName.text(city);

    var positionStackURL = 'http://api.positionstack.com/v1/forward?access_key=504536cca90d4c48fb032176b5240b9c&query=' + city

    fetch(positionStackURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data);

            latitude = data.data[0].latitude;
            longitude = data.data[0].longitude;
            console.log(latitude);
            console.log(longitude);

            var weatherURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&units=imperial&appid=ab330beac43f3deca21f334bab6bb536'


            fetch(weatherURL)
                .then(function (response) {
                    return response.json()
                })
                .then(function (data) {
                    console.log(data);
                })

        })
})

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