# Weather App

A simple weather application that fetches real-time weather data using the OpenWeatherMap API. Users can search for a city's weather or get weather details based on their current location. The app also provides a 5-day weather forecast.

## Features
- **Current Weather Information**: Displays temperature, wind speed, humidity, and weather descriptions.
- **5-Day Weather Forecast**: Shows weather trends for the next five days.
- **Search Functionality**: Users can search for weather updates by city name.
- **Geolocation Support**: Fetches weather details based on the user's current location.
- **Dark Mode Toggle**: Users can switch between dark and light mode.

## Technologies Used
- **HTML5, CSS3, JavaScript** for front-end development
- **Bootstrap** for responsive design
- **OpenWeatherMap API** for fetching weather data

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/weather-app.git
   ```
2. Navigate to the project directory:
   ```sh
   cd weather-app
   ```
3. Open the `index.html` file in a web browser:
   ```sh
   open index.html
   ```

## Usage
1. Enter a city name in the search bar and click **Search**.
2. The app will display the current weather details and a 5-day forecast.
3. Click on the **Dark Mode Toggle** to switch between light and dark themes.
4. If location access is enabled, the app will fetch weather details for your current location.

## API Key Configuration
This project uses the OpenWeatherMap API. To use it:
1. Sign up on [OpenWeatherMap](https://openweathermap.org/).
2. Generate an API key.
3. Replace the `apiKey` in `index.js`:
   ```js
   const apiKey = 'your_api_key_here';
   ```

## File Structure
```
weather-app/
│── css/
│   ├── style.css
│── images/
│   ├── logo.png
│   ├── wind.png
│   ├── humidity.png
│── script/
│   ├── index.js
│── index.html
│── README.md
```

## Deployment
You can deploy this project using GitHub Pages, Netlify, or Vercel.
- **GitHub Pages**:
  1. Push your project to GitHub.
  2. Go to **Settings** > **Pages**.
  3. Select the `main` branch and save.
- **Netlify/Vercel**: Drag and drop the project folder into their deployment interface.

## Future Enhancements
- Add hourly weather updates.
- Implement temperature unit conversion (Celsius ↔ Fahrenheit).
- Improve UI with animations.

## License
This project is licensed under the MIT License.

---
### Author
**Yusra Saeed**  
[LinkedIn] www.linkedin.com/in/yusra-saeed-370791294

