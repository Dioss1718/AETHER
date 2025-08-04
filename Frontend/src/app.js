import React, { useState } from 'react';
import './index.css';

/**
 * Maps OpenWeatherMap icon codes to a corresponding 'Weather Icons' class.
 * This allows a custom font to display a weather icon based on the API response.
 * @param {string} iconCode The icon code from the OpenWeatherMap API (e.g., '01d', '02n').
 * @returns {string} The CSS class name for the weather icon font.
 */
const getWeatherIconClass = (iconCode) => {
    // Check if the icon code ends with 'd' for day or 'n' for night.
    const day = iconCode.endsWith('d');
    
    // Use a switch statement on the first two characters of the icon code
    // to determine the general weather condition.
    switch (iconCode.slice(0, 2)) {
        case '01': // Clear sky
            return day ? 'wi wi-day-sunny' : 'wi wi-night-clear';
        case '02': // Few clouds
            return day ? 'wi wi-day-cloudy' : 'wi wi-night-alt-cloudy';
        case '03': // Scattered clouds
            return 'wi wi-cloud';
        case '04': // Broken clouds
            return 'wi wi-cloudy';
        case '09': // Shower rain
            return 'wi wi-showers';
        case '10': // Rain
            return day ? 'wi wi-day-rain' : 'wi wi-night-alt-rain';
        case '11': // Thunderstorm
            return 'wi wi-thunderstorm';
        case '13': // Snow
            return 'wi wi-snow';
        case '50': // Mist
            return day ? 'wi wi-day-fog' : 'wi wi-night-fog';
        default: // Not available or unknown
            return 'wi wi-na';
    }
};

/**
 * The main App component for the weather application.
 * It manages state for the city input, weather data, loading status, and errors.
 */
const App = () => {
    // State to store the user's city input
    const [city, setCity] = useState('');
    // State to store the weather data fetched from the API
    const [weatherData, setWeatherData] = useState(null);
    // State to track if the API call is in progress
    const [loading, setLoading] = useState(false);
    // State to store any error messages
    const [error, setError] = useState(null);

    // The base URL for the backend server
    const BACKEND_URL = 'http://localhost:3001';

    /**
     * An async function to fetch weather data from the backend server.
     * It handles the entire request lifecycle, including loading, success, and error states.
     */
    const fetchWeatherData = async () => {
        // Reset previous weather data and error state before a new fetch
        setWeatherData(null);
        setError(null);
        setLoading(true);

        // Check if the city input is empty. If so, set an error and stop.
        if (!city.trim()) {
            setError("Please enter a city name.");
            setLoading(false);
            return;
        }

        try {
            // Construct the full URL for the API call
            const url = `${BACKEND_URL}/weather?city=${city}`;
            // Await the fetch response from the backend
            const response = await fetch(url);

            // If the response is not OK (e.g., 404, 500), throw an error
            if (!response.ok) {
                // Attempt to parse the error message from the JSON response
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch weather data from server.');
            }

            // If the response is OK, parse the JSON data
            const data = await response.json();
            // Update the weatherData state with the new data
            setWeatherData(data);
        } catch (err) {
            // Catch any errors during the fetch or parsing process
            setError(err.message);
            // Log the full error to the console for debugging
            console.error("Error fetching weather data:", err);
        } finally {
            // This block always runs, regardless of success or failure.
            // It ensures the loading state is set to false.
            setLoading(false);
        }
    };

    // The component's JSX structure.
    return (
        // The main container. Its class changes based on whether weather data is displayed.
        <div className={`container ${weatherData ? 'container--weather-displayed' : ''}`}>
            <h1 className="title">AETHER</h1>
            <h5>"Beyond the horizon, powered by aether"</h5>
            <h6>Your one stop weather reporter</h6>

            {/* Input group containing the city input field and the search button */}
            <div className="input-group">
                <input
                    type="text"
                    placeholder="Enter city "
                    className="city-input"
                    value={city}
                    // Update the 'city' state as the user types
                    onChange={(e) => setCity(e.target.value)}
                    // Trigger the search function when the 'Enter' key is pressed
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            fetchWeatherData();
                        }
                    }}
                />
                <button
                    onClick={fetchWeatherData}
                    className="search-button"
                >
                    Get Weather
                </button>
            </div>

            {/* Conditionally render the loading message if 'loading' is true */}
            {loading && (
                <div className="loading-message">
                    Just a moment..
                </div>
            )}

            {/* Conditionally render the error message if 'error' is not null */}
            {error && (
                <div className="error-message" role="alert">
                    <strong>Error:</strong>
                    <span>{error}</span>
                </div>
            )}

            {/* Conditionally render the weather display if 'weatherData' is not null */}
            {weatherData && (
                <div className="weather-display">
                    {/* Display the city name and country */}
                    <div className="city-description">
                        <h2>
                            {weatherData.name}, {weatherData.sys.country}
                        </h2>
                        {/* Display the weather description */}
                        <p className="description">
                            {weatherData.weather[0].description}
                        </p>
                    </div>

                    {/* Group for the temperature and icon */}
                    <div className="temp-icon-group">
                        {/* Conditionally render the weather icon if it exists */}
                        {weatherData.weather[0].icon && (
                            <i
                                // Call the helper function to get the icon's CSS class
                                className={`${getWeatherIconClass(weatherData.weather[0].icon)} weather-icon-font`}
                                title={weatherData.weather[0].description}
                            ></i>
                        )}
                        {/* Display the temperature, rounded to the nearest whole number */}
                        <p className="temperature">
                            {Math.round(weatherData.main.temp)}°C
                        </p>
                    </div>

                    {/* A grid for displaying additional weather details */}
                    <div className="details-grid">
                        <p>Humidity: <span>{weatherData.main.humidity}%</span></p>
                        <p>Wind Speed: <span>{weatherData.wind.speed} m/s</span></p>
                        <p>Feels Like: <span>{Math.round(weatherData.main.feels_like)}°C</span></p>
                        <p>Pressure: <span>{weatherData.main.pressure} hPa</span></p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
