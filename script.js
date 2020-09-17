$(document).ready(function () {

    var citiesArray = [];


    init();

    function displayCityInfo() {

        var cityName = $(this).attr("data-name");

        displayCityData(cityName);

        displayFiveDaysForecast(cityName);

    }

    function displayCityData(cityName) {

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=b7f4d75231af262c9708a31fe3061eda";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            $(".city").html("<h1>" + response.name + " Weather Details</h1>");
            $(".temperature").text("Temperature: " + response.main.temp + " K");
            $(".humidity").text("Humidity: " + response.main.humidity + " %");
            $(".windSpeed").text("Wind Speed: " + response.wind.speed + " mph");
            $(".uvIndex").text("Pressure: " + response.main.pressure + " atm");
        });

    }

    // Function for displaying city data
    function renderButtons() {

        $("#savedCitiesButtons").empty();

        for (var i = 0; i < citiesArray.length; i++) {

            var a = $("<li class='btn btn-primary'>");
            a.addClass("cityClick");
            a.attr("data-name", citiesArray[i]);
            a.text(citiesArray[i]);
            $("#savedCitiesButtons").append(a);
            $("#savedCitiesButtons").append("<br>");


        }
    }

    function init() {

        var storedCities = JSON.parse(localStorage.getItem("citiesArray"));

        if (storedCities !== null) {
            citiesArray = storedCities;
        }

        renderButtons();
    }

    function storedItems() {
        localStorage.setItem("citiesArray", JSON.stringify(citiesArray));
    }


    $("#searchSubmitButton").on("click", function (event) {

        event.preventDefault();

        var cities = $("#searchBar").val().trim();

        citiesArray.push(cities);


        renderButtons();
        storedItems();



    });


    $(document).on("click", ".cityClick", displayCityInfo);

    renderButtons();




    function displayFiveDaysForecast(cityName) {
        var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=b7f4d75231af262c9708a31fe3061eda";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var boxes = $("#day-boxes")
                boxes.empty()

                for (var i = 1; i <= 5; i++) {
                    var container = $("<div>")
                    container.attr("class", "col-md-2 db")


                    container.append("<h5>" + response.list[i * 4].dt_txt + "</h5>");
                    container.append("Temp: " + response.list[i * 4].main.temp + "K");
                    container.append(" Humidity: " + response.list[i * 4].main.humidity + " %");
                    boxes.append(container)

                };




            })



    };






});











































