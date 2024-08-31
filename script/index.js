const apiKey = '5aef51ccfa5c5219a2497c9b9ff81f71';
const loadingSpinner = document.getElementById('loadingSpinner');
const loadingSpinnerTwo = document.getElementById('loadingSpinnerTwo');

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
const table = document.getElementById('displayForecast');


// // Image setting
function setIcon (data) {

    const iconCode = data.weather[0].icon;

    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    document.getElementById('icon').setAttribute('src', `${iconUrl}`);

        
}

// Weather Functionality
function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;    

    cityName.innerHTML = ` `;
    time.innerHTML = ` `;
    currentTemp.innerHTML = ` `;
    description.innerHTML = ` `;
    wind.innerHTML = ` `;
    humidity.innerHTML = ` `;
    windImg.setAttribute('src', '');
    // humidityImg.setAttribute('src', '');
    // weatherIcon.setAttribute('src', '');

    loadingSpinner.style.display = 'block';
    detailsContainer.style.display = 'none';

    fetch(url)
    .then((response) => {
        loadingSpinner.style.display = 'none';

        return response.json();
    })
    .then((data) => {
        
        console.log(data);

        if(data.name) {
            detailsContainer.style.display = 'flex';
            document.getElementById('city').innerHTML = `${data.name}`;
            document.getElementById('time').innerHTML = `${new Date().getHours()}:${new Date().getMinutes()}`;
            document.getElementById('temp').innerHTML = `${data.main.temp}°C`;
            document.getElementById('description').innerHTML = data.weather[0].description;
            document.getElementById('wind').innerHTML = `${data.wind.speed} m/s`;
            document.getElementById('humidity').innerHTML = `${data.main.humidity}%`;
            // document.getElementById('windImg').setAttribute('src', '../images/wind.png');
            // document.getElementById('humidityImg').setAttribute('src', '../images/humidity.png');

            // const iconCode = data.weather[0].icon;

            // const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
            // document.getElementById('icon').setAttribute('src', `${iconUrl}`);
            setIcon(data)

            fiveDayForecast(`${data.name}`);
        }
        else {
            loadingSpinner.style.display = 'none';
            alert (`Enter a valid city`)
            fiveDayForecast('key');
        }
        

    })
    .catch((error) => {
        console.log(error);
        
    })
}

function fiveDayForecast(city) {
    const table = document.getElementById('displayForecast');
    // const loadingSpinnerTwo = document.getElementById('loadingSpinnerTwo');

    if (city === 'key') {
        table.innerHTML = ``;
        document.getElementById('insertCityName').innerHTML = '';

        console.log(`don't display`);

    } else {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric`;
        table.innerHTML = ``; // Clear previous entries if any
        loadingSpinnerTwo.style.display = 'block';

        fetch(url)
        .then((response) => {
            loadingSpinnerTwo.style.display = 'none';
            return response.json();
        })
        .then((data) => {
            document.getElementById('insertCityName').innerHTML = `${city} `;
            const dailyData = data.list.filter(entry => entry.dt_txt.includes("12:00:00"));
            table.innerHTML = ''; // Clear existing rows
            
            // Create Intersection Observer
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target); // Stop observing once it's visible
                    }
                });
            }, {
                threshold: 0.1
            });

            dailyData.forEach((element) => {
                const iconCode = element.weather[0].icon;
                const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

                const date = new Date(element.dt_txt);
                const options = { weekday: 'short', month: 'short', day: 'numeric' };
                const formattedDate = date.toLocaleDateString('en-US', options);

                const row = document.createElement('tr');
                row.classList.add('fade-in');
                row.innerHTML = `
                    <td>${formattedDate}</td>
                    <td><img src="${iconUrl}" alt="Weather Icon"></td>
                    <td>${element.main.temp}°C</td>
                    <td>${element.weather[0].description}</td>
                `;
                table.appendChild(row);

                // Observe the row element
                observer.observe(row);
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }
}


// Initial Weather Functionality
function getCurrentLocationWeather() {
    loadingSpinner.style.display = 'block';

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

            detailsContainer.style.display = 'none';

            fetch(url)
                .then((response) => {
                    loadingSpinner.style.display = 'none';
                    return response.json()
                })
                .then((data) => {
                    console.log(data);
                    
                    document.getElementById('city').innerHTML = `${data.name}`;
                    document.getElementById('time').innerHTML = `${new Date().getHours()}:${new Date().getMinutes()}`;
                    document.getElementById('temp').innerHTML = `${data.main.temp}°C`;
                    document.getElementById('description').innerHTML = data.weather[0].description;
                    document.getElementById('wind').innerHTML = `${data.wind.speed} m/s`;
                    document.getElementById('humidity').innerHTML = `${data.main.humidity}%`;
                    // document.getElementById('windImg').setAttribute('src', '../images/wind.png');
                    // document.getElementById('humidityImg').setAttribute('src', '../images/humidity.png');
                    setIcon(data);

                    detailsContainer.style.display = 'flex';
                    getFiveDayForecastForCurrentLocation(latitude, longitude);
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


function getFiveDayForecastForCurrentLocation(latitude, longitude) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    // const loadingSpinner = document.getElementById('loadingSpinner'); 
    loadingSpinnerTwo.style.display = 'block';

    fetch(url)
        .then((response) => {
            loadingSpinnerTwo.style.display = 'none';
            return response.json();
        })
        .then((data) => {
            const dailyData = data.list.filter(entry => entry.dt_txt.includes("12:00:00"));
            const table = document.getElementById('displayForecast');
            table.innerHTML = ''; 

            // Create Intersection Observer
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target); 
                    }
                });
            }, {
                threshold: 0.1
            });

            dailyData.forEach((element) => {
                const iconCode = element.weather[0].icon;
                const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

                const date = new Date(element.dt_txt);
                const options = { weekday: 'short', month: 'short', day: 'numeric' };
                const formattedDate = date.toLocaleDateString('en-US', options);

                const row = document.createElement('tr');
                row.classList.add('fade-in');
                row.innerHTML = `
                    <td>${formattedDate}</td>
                    <td><img src="${iconUrl}" alt="Weather Icon"></td>
                    <td>${element.main.temp}°C</td>
                    <td>${element.weather[0].description}</td>
                `;
                table.appendChild(row);

                observer.observe(row);
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
            // getFiveDayForecastForCurrentLocation(latitude, longitude);
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







// // clear
        // if (data.weather[0].description == 'clear sky') {
        //     document.getElementById('icon').setAttribute('src', '../images/Clear/clearsky.png');
        // } 
        
        // // clouds
        // else if (data.weather[0].description == 'few clouds') {
        //     document.getElementById('icon').setAttribute('src', '../images/Clouds/fewClouds.png');
        // } 
        
        // else if (data.weather[0].description == 'scattered clouds') {
        //     document.getElementById('icon').setAttribute('src', '../images/Clouds/scatteredClouds.png');
        // } 
    
        // else if (data.weather[0].description == 'broken clouds' || data.weather[0].description == 'overcast clouds') {
        //     document.getElementById('icon').setAttribute('src', '../images/Clouds/brokenOvercastClouds.png')
        // }
        
        // // thunderstorm
        // else if (data.weather[0].description == '	thunderstorm with light rain' || data.weather[0].description == '	thunderstorm with rain' || data.weather[0].description == '	thunderstorm with heavy rain' || data.weather[0].description == '	light thunderstorm' || data.weather[0].description == '	thunderstorm' || data.weather[0].description == '	heavy thunderstorm' || data.weather[0].description == '	ragged thunderstorm' || data.weather[0].description == '	thunderstorm with light drizzle' || data.weather[0].description == '	thunderstorm with drizzle' || data.weather[0].description == '	thunderstorm with heavy drizzle') {
        //     document.getElementById('icon').setAttribute('src', '../images/Thunderstorm/thunderstorm.png');
        // }
    
        // // drizzle
    
        // else if (data.weather[0].description == 'light intensity drizzle' || data.weather[0].description == 'drizzle' || data.weather[0].description == 'heavy intensity drizzle' || data.weather[0].description == 'light intensity drizzle rain' || data.weather[0].description == 'dizzle rain' || data.weather[0].description == 'heavy intensity drizzle rain' || data.weather[0].description == 'shower rain and drizzle' || data.weather[0].description == 'heavy shower rain and drizzle' || data.weather[0].description == 'shower drizzle') {
        //     document.getElementById('icon').setAttribute('src', '../images/Drizzle/drizzle.png');
        // }
    
        // // rain 
    
        // else if(data.weather[0].description == 'light rain' || data.weather[0].description == 'moderate rain' || data.weather[0].description == 'heavy intensity rain' || data.weather[0].description == 'very heavy rain' || data.weather[0].description == 'extreme rain') {
        //     document.getElementById('icon').setAttribute('src', '../images/Rain/rain.png');
        // }
    
        // else if (data.weather[0].description == 'light intensity shower rain' || data.weather[0].description == 'shower rain' || data.weather[0].description == 'heavy intensity shower rain' || data.weather[0].description == 'ragged shower rain') {
        //     document.getElementById('icon').setAttribute('src', '../images/Rain/heavyRain.png');
        // }
    
        // else if(data.weather[0].description == 'freezing rain') {
        //     document.getElementById('icon').setAttribute('src', '../images/Rain/freezingRain.png');
        // }
    
        // // snow
    
        // else if (data.weather[0].description == 'light snow' || data.weather[0].description == 'snow' || data.weather[0].description == 'heavy snow' || data.weather[0].description == 'sleet' || data.weather[0].description == 'light shower sleet' || data.weather[0].description == 'shower sleet' || data.weather[0].description == 'light rain and snow' || data.weather[0].description == 'rain and snow' || data.weather[0].description == 'light shower snow' || data.weather[0].description == 'shower snow' || data.weather[0].description == 'heavy shower snow') {
        //     document.getElementById('icon').setAttribute('src', '../images/Snow/snow.png');
        // }
        // else {
        //     document.getElementById('icon').setAttribute('src', '../images/Atmosphere/mist.png');
    
        // }        