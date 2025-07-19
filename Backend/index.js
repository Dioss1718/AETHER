
import 'dotenv/config';
import express from 'express'; 
import cors from 'cors';       
import fetch from 'node-fetch';

const app = express();


app.use(cors({
    origin: 'http://localhost:3000' 
}));


const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;


app.use(express.json());


app.get('/weather', async (req, res) => {
    const city = req.query.city; // Get city from query parameter, e.g., /weather?city=London

    if (!city) {
        return res.status(400).json({ message: 'City parameter is required.' });
    }

    if (!OPENWEATHER_API_KEY) {
        console.error("OpenWeatherMap API key is not set in environment variables.");
        return res.status(500).json({ message: 'Server configuration error: API key missing.' });
    }

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`;
        const response = await fetch(url);
        const data = await response.json();

        // Check if OpenWeatherMap API returned an error (e.g., city not found)
        if (!response.ok) {
            // Forward the error message and status from OpenWeatherMap API
            return res.status(response.status).json({ message: data.message || 'Error fetching weather data from external API.' });
        }

        res.json(data); // Send the weather data back to the frontend
    } catch (error) {
        console.error("Error in backend fetching weather:", error);
        res.status(500).json({ message: 'Failed to fetch weather data.' });
    }
});

// Define the port for the server to listen on
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
    console.log(`Weather API endpoint: http://localhost:${PORT}/weather?city=YOUR_CITY`);
});