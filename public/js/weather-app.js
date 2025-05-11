import { config } from './config.js';

// Theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeToggle.checked = savedTheme === 'dark';
    }

    // Theme toggle event listener
    themeToggle.addEventListener('change', () => {
        const theme = themeToggle.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });
});

// API key configuration
const apiKey = config.weatherApiKey;
let currentUnit = 'celsius';

document.getElementById('getWeather').addEventListener('click', function() {
  const location = document.getElementById('location').value;
  if (location) {
    fetchWeatherByLocation(location);
  } else {
    getUserLocation();
  }
});

function fetchWeatherByLocation(location) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  console.log('Fetching weather for:', location);
  console.log('API URL:', url);
  
  fetch(url)
    .then(response => {
      console.log('Response status:', response.status);
      return response.json();
    })
    .then(data => {
      console.log('Weather data:', data);
      if (data.cod === 200) {
        displayWeatherData(data);
      } else {
        showError(`Error: ${data.message || 'City not found. Please try again.'}`);
      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
      showError('An error occurred while fetching the weather data.');
    });
}

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      fetchWeatherByCoordinates(lat, lon);
    }, () => {
      showError('Unable to access your location.');
    });
  } else {
    showError('Geolocation is not supported by this browser.');
  }
}

function fetchWeatherByCoordinates(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  console.log('Fetching weather for coordinates:', lat, lon);
  console.log('API URL:', url);

  fetch(url)
    .then(response => {
      console.log('Response status:', response.status);
      return response.json();
    })
    .then(data => {
      console.log('Weather data:', data);
      if (data.cod === 200) {
        displayWeatherData(data);
      } else {
        showError(`Error: ${data.message || 'Unable to fetch weather data for your location.'}`);
      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
      showError('An error occurred while fetching the weather data.');
    });
}

function convertTemperature(temp, fromUnit, toUnit) {
  if (fromUnit === toUnit) return temp;
  if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
    return (temp * 9/5) + 32;
  } else {
    return (temp - 32) * 5/9;
  }
}

function displayWeatherData(data) {
  const weatherInfo = document.getElementById('weather-info');
  const cityName = document.getElementById('city-name');
  const temperature = document.getElementById('temperature');
  const weatherCondition = document.getElementById('weather-condition');
  const humidity = document.getElementById('humidity');
  const windSpeed = document.getElementById('wind-speed');
  
  cityName.textContent = data.name;
  
  // Store the temperature in Celsius
  const tempCelsius = data.main.temp;
  temperature.setAttribute('data-temp', tempCelsius);
  
  // Display temperature in current unit
  const displayTemp = convertTemperature(tempCelsius, 'celsius', currentUnit);
  temperature.textContent = `${Math.round(displayTemp)}°${currentUnit === 'celsius' ? 'C' : 'F'}`;
  
  weatherCondition.textContent = `Condition: ${data.weather[0].description}`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
  
  weatherInfo.classList.remove('hidden');
  document.getElementById('error-message').classList.add('hidden');
}

function showError(message) {
  const errorMessage = document.getElementById('error-message');
  errorMessage.textContent = message;
  errorMessage.classList.remove('hidden');
  document.getElementById('weather-info').classList.add('hidden');
}

// Temperature toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const tempToggle = document.getElementById('tempToggle');
    const units = document.querySelectorAll('.unit');

    tempToggle.addEventListener('change', () => {
        currentUnit = tempToggle.checked ? 'fahrenheit' : 'celsius';
        
        // Update active unit display
        units.forEach(unit => {
            unit.classList.toggle('active', unit.dataset.unit === currentUnit);
        });

        // Update temperature display
        const temperature = document.getElementById('temperature');
        if (temperature) {
            const currentTemp = parseFloat(temperature.getAttribute('data-temp'));
            if (!isNaN(currentTemp)) {
                const convertedTemp = convertTemperature(currentTemp, 'celsius', currentUnit);
                temperature.textContent = `${Math.round(convertedTemp)}°${currentUnit === 'celsius' ? 'C' : 'F'}`;
            }
        }
    });
}); 