import React, { useState } from 'react';
import './index.css';


const getWeatherIconClass = (iconCode) => {
    const day = iconCode.endsWith('d');
    switch (iconCode.slice(0, 2)) {
        case '01':
            return day ? 'wi wi-day-sunny' : 'wi wi-night-clear';
        case '02':
            return day ? 'wi wi-day-cloudy' : 'wi wi-night-alt-cloudy';
        case '03':
            return 'wi wi-cloud';
        case '04':
            return 'wi wi-cloudy';
        case '09':
            return 'wi wi-showers';
        case '10':
            return day ? 'wi wi-day-rain' : 'wi wi-night-alt-rain';
        case '11':
            return 'wi wi-thunderstorm';
        case '13':
            return 'wi wi-snow';
        case '50':
            return day ? 'wi wi-day-fog' : 'wi wi-night-fog';
        default:
            return 'wi wi-na';
    }
};


const App = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const BACKEND_URL = 'http://localhost:3001';

    const fetchWeatherData = async () => {

        setWeatherData(null);
        setError(null);
        setLoading(true);

        if (!city.trim()) {
            setError("Please enter a city name.");
            setLoading(false);
            return;
        }

        try {
            const url = `${BACKEND_URL}/weather?city=${city}`;
            const response = await fetch(url);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch weather data from server.');
            }

            const data = await response.json();
            setWeatherData(data);
        } catch (err) {
            setError(err.message);
            console.error("Error fetching weather data:", err);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className={`container ${weatherData ? 'container--weather-displayed' : ''}`}>
            <h1 className="title">AETHER</h1>
            <h5>"Beyond the horizon, powered by aether"</h5>
            <h6>Your one stop weather reporter</h6>

            <div className="input-group">
                <input
                    type="text"
                    placeholder="Enter city "
                    className="city-input"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
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

            {loading && (
                <div className="loading-message">
                    Just a moment..
                </div>
            )}

            {error && (
                <div className="error-message" role="alert">
                    <strong>Error:</strong>
                    <span>{error}</span>
                </div>
            )}

            {weatherData && (
                <div className="weather-display">
                    {/* The city name and description are now separate from the main weather data, allowing for flexible layout */}
                    <div className="city-description">
                        <h2>
                            {weatherData.name}, {weatherData.sys.country}
                        </h2>
                        <p className="description">
                            {weatherData.weather[0].description}
                        </p>
                    </div>

                    <div className="temp-icon-group">
                        {weatherData.weather[0].icon && (
                            <i
                                className={`${getWeatherIconClass(weatherData.weather[0].icon)} weather-icon-font`}
                                title={weatherData.weather[0].description}
                            ></i>
                        )}
                        <p className="temperature">
                            {Math.round(weatherData.main.temp)}°C
                        </p>
                    </div>

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
