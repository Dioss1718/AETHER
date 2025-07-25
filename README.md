
 # AETHER: Your One-Stop Weather Reporter

"Beyond the horizon, powered by aether" – Get real-time weather at your fingertips.


• Purpose : Ever wonder what the weather's like in Tokyo, or if you need an umbrella in London? AETHER is here to give you real-time weather updates for any city you search for! It's a simple, intuitive web application designed to quickly fetch and display current weather conditions.

• Key Features:

1. Get current temperature, humidity, wind speed, and pressure for any city.

2. A clean and responsive design makes checking the weather a breeze.

3. Visual cues for different weather conditions (sunny, cloudy, rainy, etc.).

4. Fetches data reliably from the OpenWeatherMap API.

• Prerequisites

Before you start, make sure you have these installed:

1. Node.js (LTS version recommended)

2. npm (Node Package Manager): Usually comes bundled with Node.js.

3. An OpenWeatherMap API Key: You'll need to sign up for a free API key at OpenWeatherMap to allow the backend to fetch weather data.

• Installation & Setup

# 1. Clone the repository (both frontend and backend projects):



(For the backend (assuming its in a folder like 'aether-backend'))

<i>git clone <your-backend-repo-url> aether-backend</i>

<i>cd aether-backend</i>

(For the frontend (assuming its in a folder like 'aether-frontend'))

<i>git clone <your-frontend-repo-url> aether-frontend</i>

<i>cd aether-frontend</i>

# 2. Backend Setup:

(Navigate into your backend project directory)



<i>cd aether-backend</i>

(Install backend dependencies)



<i>npm install</i>

(Create a .env file in the root of your backend directory and add your OpenWeatherMap API key and the desired port)

<i>OPENWEATHER_API_KEY=YOUR_OPENWEATHER_API_KEY_HERE</i>

<i>PORT=3001</i>

(Note: The frontend expects the backend to run on port 3001 by default).

# 3. Frontend Setup:

(Navigate into your frontend project directory)



<i>cd aether-frontend</i>

(Install frontend dependencies)



<i>npm install</i>


• Running the Project

# 1. Start the Backend Server:

(From your backend project directory (aether-backend))



<i>npm start</i>

(You should see a message indicating the backend server is running, likely on http://localhost:3001.)

# 2. Start the Frontend Application:

(From your frontend project directory (aether-frontend))



<i>npm start</i>

(This will open the AETHER application in your browser, usually at http://localhost:3000)

• How to Use It 

Once both the backend and frontend are running:

Open your web browser and navigate to http://localhost:3000.

You'll see a search bar labeled "Enter city".

Type in the name of any city (e.g., "London", "New York", "Tokyo").

Click the "Get Weather" button or press Enter.

AETHER will display the current temperature, description, humidity, wind speed, and "feels like" temperature for that city.

Watch the container gracefully expand to show the weather details!

# Project Structure

Here's a quick overview of how the different parts of AETHER are organized:

-aether-backend/

    -index.js: The heart of the backend, handling API requests and fetching data from OpenWeatherMap.

    -.env: (Your secret file!) Stores API keys and configuration.

    -package.json: Backend dependencies.

-aether-frontend/

      -src/: Contains all the magic for the user interface.
    
         -app.js: The main React component, managing state, fetching data, and rendering the weather display.
    
         -index.js: Renders the React application to the DOM.
    
         -index.css: Stylesheets to make AETHER look good, including responsive design and transitions.
    
     -public/: Static assets for the frontend.
    
     -package.json: Frontend dependencies.



# AETHER is built with:

Backend:

• Node.js: JavaScript runtime.

• Express.js: Fast, unopinionated, minimalist web framework for Node.js.

• axios: Promise-based HTTP client for making API requests.

• cors: For enabling Cross-Origin Resource Sharing.

• dotenv: To load environment variables from a .env file.

Frontend:

• React: A JavaScript library for building user interfaces.

• HTML & CSS: For structuring and styling the web application.

• Weather Icons (wi): A fantastic font set for weather-related icons.
