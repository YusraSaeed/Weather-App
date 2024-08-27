const apiKey = '5aef51ccfa5c5219a2497c9b9ff81f71';
const loadingSpinner = document.getElementById('loadingSpinner');
const detailsContainer = document.querySelector('.details');
const cityName = document.getElementById('city');
const time = document.getElementById('time');
const currentTemp = document.getElementById('temp');
const weatherIcon = document.getElementById('icon');
const description = document.getElementById('description');
const wind = document.getElementById('wind');
const windImg = document.getElementById('windImg');
const humidity = document.getElementById('humidity');
const humidityImg = document.getElementById('humidityImg');

// Image setting
function setIcon (data) {
        // clear
        if (data.weather[0].description == 'clear sky') {
            document.getElementById('icon').setAttribute('src', '../images/Clear/clearsky.png');
        } 
        
        // clouds
        else if (data.weather[0].description == 'few clouds') {
            document.getElementById('icon').setAttribute('src', '../images/Clouds/fewClouds.png');
        } 
        
        else if (data.weather[0].description == 'scattered clouds') {
            document.getElementById('icon').setAttribute('src', '../images/Clouds/scatteredClouds.png');
        } 
    
        else if (data.weather[0].description == 'broken clouds' || data.weather[0].description == 'overcast clouds') {
            document.getElementById('icon').setAttribute('src', '../images/Clouds/brokenOvercastClouds.png')
        }
        
        // thunderstorm
        else if (data.weather[0].description == '	thunderstorm with light rain' || data.weather[0].description == '	thunderstorm with rain' || data.weather[0].description == '	thunderstorm with heavy rain' || data.weather[0].description == '	light thunderstorm' || data.weather[0].description == '	thunderstorm' || data.weather[0].description == '	heavy thunderstorm' || data.weather[0].description == '	ragged thunderstorm' || data.weather[0].description == '	thunderstorm with light drizzle' || data.weather[0].description == '	thunderstorm with drizzle' || data.weather[0].description == '	thunderstorm with heavy drizzle') {
            document.getElementById('icon').setAttribute('src', '../images/Thunderstorm/thunderstorm.png');
        }
    
        // drizzle
    
        else if (data.weather[0].description == 'light intensity drizzle' || data.weather[0].description == 'drizzle' || data.weather[0].description == 'heavy intensity drizzle' || data.weather[0].description == 'light intensity drizzle rain' || data.weather[0].description == 'dizzle rain' || data.weather[0].description == 'heavy intensity drizzle rain' || data.weather[0].description == 'shower rain and drizzle' || data.weather[0].description == 'heavy shower rain and drizzle' || data.weather[0].description == 'shower drizzle') {
            document.getElementById('icon').setAttribute('src', '../images/Drizzle/drizzle.png');
        }
    
        // rain 
    
        else if(data.weather[0].description == 'light rain' || data.weather[0].description == 'moderate rain' || data.weather[0].description == 'heavy intensity rain' || data.weather[0].description == 'very heavy rain' || data.weather[0].description == 'extreme rain') {
            document.getElementById('icon').setAttribute('src', '../images/Rain/rain.png');
        }
    
        else if (data.weather[0].description == 'light intensity shower rain' || data.weather[0].description == 'shower rain' || data.weather[0].description == 'heavy intensity shower rain' || data.weather[0].description == 'ragged shower rain') {
            document.getElementById('icon').setAttribute('src', '../images/Rain/heavyRain.png');
        }
    
        else if(data.weather[0].description == 'freezing rain') {
            document.getElementById('icon').setAttribute('src', '../images/Rain/freezingRain.png');
        }
    
        // snow
    
        else if (data.weather[0].description == 'light snow' || data.weather[0].description == 'snow' || data.weather[0].description == 'heavy snow' || data.weather[0].description == 'sleet' || data.weather[0].description == 'light shower sleet' || data.weather[0].description == 'shower sleet' || data.weather[0].description == 'light rain and snow' || data.weather[0].description == 'rain and snow' || data.weather[0].description == 'light shower snow' || data.weather[0].description == 'shower snow' || data.weather[0].description == 'heavy shower snow') {
            document.getElementById('icon').setAttribute('src', '../images/Snow/snow.png');
        }
        else {
            document.getElementById('icon').setAttribute('src', 'images/Atmosphere/mist.png');
    
        }        
}

// Weather Functionality
function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;    

    document.getElementById('city').innerHTML = ` `;
        document.getElementById('time').innerHTML = ` `;
        document.getElementById('temp').innerHTML = ` `;
        document.getElementById('description').innerHTML = ` `;
        document.getElementById('wind').innerHTML = ` `;
        document.getElementById('humidity').innerHTML = ` `;
        document.getElementById('windImg').setAttribute('src', '');
        document.getElementById('humidityImg').setAttribute('src', '');
        document.getElementById('icon').setAttribute('src', '');

    loadingSpinner.style.display = 'block';
    detailsContainer.style.display = 'none';

    fetch(url)
    .then((response) => {
        loadingSpinner.style.display = 'none';
        detailsContainer.style.display = 'flex';
        return response.json();
    })
    .then((data) => {
        console.log(data);

        document.getElementById('city').innerHTML = `${data.name}`;
        document.getElementById('time').innerHTML = `${new Date().getHours()}:${new Date().getMinutes()}`;
        document.getElementById('temp').innerHTML = `${data.main.temp}°C`;
        document.getElementById('description').innerHTML = data.weather[0].description;
        document.getElementById('wind').innerHTML = `${data.wind.speed} m/s`;
        document.getElementById('humidity').innerHTML = `${data.main.humidity}%`;
        document.getElementById('windImg').setAttribute('src', '../images/wind.png');
        document.getElementById('humidityImg').setAttribute('src', '../images/humidity.png');

        setIcon(data);

        fiveDayForecast(`${data.name}`);

    })
    .catch((error) => {
        console.log(error);
        
    })
}

function fiveDayForecast (city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric`
    loadingSpinner.style.display = 'block';

    fetch(url)
    .then((response) => {
        loadingSpinner.style.display = 'none';
        return response.json();
    })
    .then((data) => {
        const dailyData = data.list.filter(entry => entry.dt_txt.includes("12:00:00"));
        const table = document.getElementById('displayForecast');
        table.innerHTML = ''; // Clear previous entries if any
        dailyData.forEach((element) => {
            const iconCode = element.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

            const date = new Date(element.dt_txt);
            const options = { weekday: 'short', month: 'short', day: 'numeric' };
            const formattedDate = date.toLocaleDateString('en-US', options);

            table.innerHTML += `
                <tr>
                <td>${formattedDate}</td>
                <td><img src="${iconUrl}" alt="Weather Icon"></td>
                <td>${element.main.temp}°C</td>
                <td>${element.weather[0].description}</td>
                </tr>
            `;
        });
        `</table>`
    })
    .catch((error) => {
        console.log(error);
        
    })    
}

// Initial Weather Functionality
function getCurrentLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

            loadingSpinner.style.display = 'block';
            detailsContainer.style.display = 'none';

            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    
                    document.getElementById('city').innerHTML = `${data.name}`;
                    document.getElementById('time').innerHTML = `${new Date().getHours()}:${new Date().getMinutes()}`;
                    document.getElementById('temp').innerHTML = `${data.main.temp}°C`;
                    document.getElementById('description').innerHTML = data.weather[0].description;
                    document.getElementById('wind').innerHTML = `${data.wind.speed} m/s`;
                    document.getElementById('humidity').innerHTML = `${data.main.humidity}%`;
                    document.getElementById('windImg').setAttribute('src', '../images/wind.png');
                    document.getElementById('humidityImg').setAttribute('src', '../images/humidity.png');
                    setIcon(data);

                    loadingSpinner.style.display = 'none';
                    detailsContainer.style.display = 'flex';
                })
                .catch((error) => {
                    console.error(error);
                    loadingSpinner.style.display = 'none';
                });
        });
    } else {
        alert('Geolocation is not supported by your browser.');
    }
}



// Five Day Forecast Functionality
function getFiveDayForecastForCurrentLocation(latitude, longitude) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    loadingSpinner.style.display = 'block';

    fetch(url)
        .then((response) => {
            loadingSpinner.style.display = 'none';
            return response.json()
        })
        .then((data) => {
            const dailyData = data.list.filter(entry => entry.dt_txt.includes("12:00:00"));
            const table = document.getElementById('displayForecast');
            table.innerHTML = ''; // Clear previous entries if any

            dailyData.forEach((element) => {
                const iconCode = element.weather[0].icon;
                const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

                const date = new Date(element.dt_txt);
                const options = { weekday: 'short', month: 'short', day: 'numeric' };
                const formattedDate = date.toLocaleDateString('en-US', options);

                table.innerHTML += `
                    <tr>
                    <td>${formattedDate}</td>
                    <td><img src="${iconUrl}" alt="Weather Icon"></td>
                    <td>${element.main.temp}°C</td>
                    <td>${element.weather[0].description}</td>
                    </tr>
                `;
            });
        })
        .catch((error) => {
            console.log(error);
        });
}

function getCurrentLocationWeatherAndForecast() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;

            // Fetch current weather
            getCurrentLocationWeather();

            // Fetch 5-day forecast for the current location
            getFiveDayForecastForCurrentLocation(latitude, longitude);
        });
    } else {
        alert('Geolocation is not supported by your browser.');
    }
}


// Dark Mode Functionality
const modeToggleBtn = document.getElementById('changeMode');
modeToggleBtn.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');

    const isDarkMode = document.body.classList.contains('dark-mode');
    modeToggleBtn.src = isDarkMode ? './images/lightMode.png' : './images/darkMode.png';
    
});


// Search Functionality
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();

    city = cityInput.value;
    cityInput.value = '';
    getWeather(city);
})


window.onload = getCurrentLocationWeatherAndForecast;