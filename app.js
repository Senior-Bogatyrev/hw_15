let daysOfTheWeek = {
    0: 'Вс',
    1: 'Пн',
    2: 'Вт',
    3: 'Ср',
    4: 'Чт',
    5: 'Пт',
    6: 'Сб',
}

let request = new XMLHttpRequest();
let selectedCity = 'Ставрополь';
let url = `http://api.weatherapi.com/v1/forecast.json?q=${selectedCity}&lang=ru&days=5&hour=14&aqi=no&alerts=no`;
request.open('GET', url);
request.setRequestHeader('key', password);
request.responseType = 'json';
request.addEventListener(`load`, cb);
request.send();


function cb() {
    let result = request.response;
    let city = result['location']['name'];
    let country = result['location']['country'];
    let last_updated = result['current']['last_updated'];
    let temp = Math.round(result['current']['temp_c']);
    let icon = result['current']['condition']['icon'];
    let iconText = result['current']['condition']['text'];
    let windSpeed = result['current']['wind_kph'];
    let precip = result['current']['precip_mm'];
    let pressure = result['current']['pressure_mb'];

    $('#cityCountry').text(`${city}, ${country}`);
    $('#dateTime').text(`${last_updated}`);
    $('#icon').attr('src',`https:${icon}`);
    $('#iconText').text(`${iconText}`);
    $('#temp').text(`${temp}°С`);
    $('#wind').text(`Скорость ветра: ${windSpeed} км/ч`);
    $('#precip').text(`Осадки: ${precip} мм`);
    $('#pressure').text(`Давление: ${pressure} мб`);

    for (let i = 0; i < 5; i++) {
        let dateNext = result['forecast']['forecastday'][i]['date'];
        let iconNext = result['forecast']['forecastday'][i]['day']['condition']['icon'];
        let avgTemp = Math.round(result['forecast']['forecastday'][i]['day']['avgtemp_c']);
        let date = new Date(dateNext);
        let daysWeekRu = daysOfTheWeek[date.getDay()];

        $('#margNextDays').append(`<div class="days">
        <p id="dayWeek">${daysWeekRu}</p><p id="date">${dateNext}</p>
        <img src="https:${iconNext}" alt="weather icon" id="iconNext">
        <p id="tempNext">${avgTemp}°С</p></div>`);
    }
}
