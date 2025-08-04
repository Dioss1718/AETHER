import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import the CSS file
import 'weather-icons/css/weather-icons.css';
import App from './app'; // Import App component


// Function to report web vitals (
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

// Create a root for rendering your React application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside React.StrictMode
root.render(
  <React.StrictMode>
    <App /> {/* main application component */}
  </React.StrictMode>
);

