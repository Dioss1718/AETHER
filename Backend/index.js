// Load environment variables from .env file
import 'dotenv/config'; 
import express from 'express'; 
import cors from 'cors'; 
import fetch from 'node-fetch';

const app = express();

// Configure CORS for the frontend application
app.use(cors({
 origin: 'http://localhost:3000' 
}));

// Get the API key from environment variables
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

// Parse incoming JSON requests
app.use(express.json());

// Main weather endpoint
app.get('/weather', async (req, res) => {
 // Get the city from the query parameter
 const city = req.query.city; 

 if (!city) {
return res.status(400).json({ message: 'City parameter is required.' });
}

 if (!OPENWEATHER_API_KEY) {
 console.error("OpenWeatherMap API key is not set.");
 return res.status(500).json({ message: 'Server configuration error: API key missing.' });
 }

 try {
 // Construct the API URL and fetch data
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`;
const response = await fetch(url);
const data = await response.json();

 // Check for errors from the external API
 if (!response.ok) {
 return res.status(response.status).json({ message: data.message || 'Error fetching weather data.' });
 }

// Send the successful data back
 res.json(data); 
 } catch (error) {
console.error("Error in backend fetching weather:", error);
 res.status(500).json({ message: 'Failed to fetch weather data.' });
 }
});

// Set the port and start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
 console.log(`Backend server running on port ${PORT}`);
 console.log(`Weather API endpoint: http://localhost:${PORT}/weather?city=YOUR_CITY`);
});