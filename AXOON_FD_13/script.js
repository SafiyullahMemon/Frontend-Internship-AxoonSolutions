document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const cityInput = document.getElementById('city-input');
    const weatherForm = document.getElementById('weather-form');
    const weatherDisplay = document.getElementById('weather-display');
    const cityNameElem = document.getElementById('city-name');
    const dateTimeElem = document.getElementById('date-time');
    const weatherIconElem = document.getElementById('weather-icon');
    const temperatureElem = document.getElementById('temperature');
    const descriptionElem = document.getElementById('description');
    const humidityElem = document.getElementById('humidity');
    const windSpeedElem = document.getElementById('wind-speed');
    const cloudsElem = document.getElementById('clouds');
    const pressureElem = document.getElementById('pressure');
    const sunriseElem = document.getElementById('sunrise');
    const sunsetElem = document.getElementById('sunset');
    const statusMessageElem = document.getElementById('status-message');
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');

    // --- OpenWeatherMap API Configuration ---
    const API_KEY = '5b4e0287f1506221811fad9f45000572'; // YOUR INTEGRATED API KEY
    const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

    // --- Loading Animation Messages ---
    const loadingMessages = [
        "Summoning clouds...",
        "Brewing forecast...",
        "Reading the skies...",
        "Fetching elements...",
        "Predicting the day...",
        "Consulting the winds..."
    ];
    let messageIndex = 0;
    let loadingInterval;
    let typingEffectInterval;

    // --- Helper Functions ---

    // Function to set dynamic background based on weather and time of day
    function setBackgroundByWeatherAndTime(weatherCondition, sunrise, sunset, currentTime) {
        const isDay = (currentTime > sunrise && currentTime < sunset);
        body.classList.remove('bg-day', 'bg-night');
        body.classList.add(isDay ? 'bg-day' : 'bg-night');

        body.classList.remove('bg-clear', 'bg-clouds', 'bg-rain', 'bg-snow', 'bg-drizzle', 'bg-thunderstorm', 'bg-mist', 'bg-fog', 'bg-haze', 'bg-default');

        if (weatherCondition.includes('clear')) {
            body.classList.add('bg-clear');
        } else if (weatherCondition.includes('cloud')) {
            body.classList.add('bg-clouds');
        } else if (weatherCondition.includes('rain')) {
            body.classList.add('bg-rain');
        } else if (weatherCondition.includes('snow')) {
            body.classList.add('bg-snow');
        } else if (weatherCondition.includes('drizzle') || weatherCondition.includes('thunderstorm')) {
            body.classList.add('bg-drizzle');
        } else if (weatherCondition.includes('mist') || weatherCondition.includes('fog') || weatherCondition.includes('haze')) {
            body.classList.add('bg-mist');
        } else {
            body.classList.add('bg-default');
        }
    }

    // Function to format date and time (for display)
    function formatDateTime(timestamp) {
        const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return date.toLocaleDateString('en-US', options);
    }

    // Function to format time (for sunrise/sunset)
    function formatTime(timestamp) {
        const date = new Date(timestamp * 1000);
        const options = { hour: '2-digit', minute: '2-digit', hour12: true };
        return date.toLocaleTimeString('en-US', options);
    }

    // Function to display messages (loading/error)
    function displayMessage(message, isError = false) {
        stopLoadingAnimation();

        statusMessageElem.textContent = message;
        if (isError) {
            statusMessageElem.classList.add('error');
        } else {
            statusMessageElem.classList.remove('error');
        }
    }

    // Function to start the loading animation
    function startLoadingAnimation() {
        weatherDisplay.classList.add('hidden');
        statusMessageElem.classList.remove('error');
        
        clearInterval(typingEffectInterval);
        clearInterval(loadingInterval);
        statusMessageElem.classList.remove('loading-text'); // Remove to re-apply animation

        const runTypingSequence = () => {
            const currentMessage = loadingMessages[messageIndex];
            let charIndex = 0;
            let typingPhase = true;

            statusMessageElem.textContent = ''; // Clear text before new sequence
            statusMessageElem.style.maxWidth = '0'; // Reset max-width for animation
            statusMessageElem.classList.add('loading-text'); // Re-add for animation

            typingEffectInterval = setInterval(() => {
                if (typingPhase) {
                    statusMessageElem.textContent = currentMessage.substring(0, charIndex++);
                    if (charIndex > currentMessage.length) {
                        typingPhase = false;
                        charIndex = currentMessage.length; // Ensure full text is displayed before backspacing
                    }
                } else {
                    statusMessageElem.textContent = currentMessage.substring(0, charIndex--);
                    if (charIndex < 0) {
                        clearInterval(typingEffectInterval);
                        messageIndex = (messageIndex + 1) % loadingMessages.length;
                    }
                }
            }, 80);
        };

        runTypingSequence(); // Start the first sequence
        loadingInterval = setInterval(runTypingSequence, 3500); // Repeat for other messages
    }

    // Function to stop the loading animation
    function stopLoadingAnimation() {
        clearInterval(loadingInterval);
        clearInterval(typingEffectInterval);
        statusMessageElem.textContent = '';
        statusMessageElem.classList.remove('loading-text');
        statusMessageElem.style.maxWidth = 'none'; // Ensure text takes full width if needed
    }

    // --- Fetch Weather Data ---
    async function getWeatherData(city) {
        startLoadingAnimation();

        localStorage.setItem('lastCity', city);

        const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;

        try {
            const response = await fetch(url);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            stopLoadingAnimation();
            displayWeather(data);
            weatherDisplay.classList.remove('hidden'); // Show weather display
        } catch (error) {
            stopLoadingAnimation();
            console.error('Error fetching weather data:', error);
            if (error.message.includes('city not found')) {
                displayError("City not found. Please check the spelling.");
            } else if (error.message.includes('Invalid API key') || error.message.includes('Invalid API key. Please check your subscription.')) {
                displayError("API Key issue. Please verify your key and OpenWeatherMap subscription.");
            } else if (error.message.includes('Failed to fetch')) {
                displayError("Network error. Please check your internet connection.");
            } else {
                displayError("An unexpected error occurred. Please try again.");
            }
            weatherDisplay.classList.add('hidden'); // Ensure weather display is hidden on error
        }
    }

    // --- Display Weather Data ---
    function displayWeather(data) {
        cityNameElem.textContent = data.name;
        dateTimeElem.textContent = formatDateTime(data.dt);
        temperatureElem.textContent = `${Math.round(data.main.temp)}°C`;
        descriptionElem.textContent = data.weather[0].description;

        const iconCode = data.weather[0].icon;
        weatherIconElem.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
        weatherIconElem.alt = data.weather[0].description;

        humidityElem.textContent = data.main.humidity;
        windSpeedElem.textContent = data.wind.speed;
        cloudsElem.textContent = data.clouds.all;
        pressureElem.textContent = data.main.pressure;
        sunriseElem.textContent = formatTime(data.sys.sunrise);
        sunsetElem.textContent = formatTime(data.sys.sunset);

        setBackgroundByWeatherAndTime(
            data.weather[0].main.toLowerCase(),
            data.sys.sunrise,
            data.sys.sunset,
            data.dt
        );
    }

    // --- Theme Toggle Functionality ---
    function toggleTheme() {
        if (body.classList.contains('light-theme')) {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    }

    // --- Event Listeners ---
    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const city = cityInput.value.trim();
        if (city) {
            getWeatherData(city);
        } else {
            displayMessage("Please enter a city name.", true);
            weatherDisplay.classList.add('hidden');
        }
    });

    themeToggle.addEventListener('click', toggleTheme);

    // --- Initial Load (check localStorage for city and theme) ---
    const lastCity = localStorage.getItem('lastCity');
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        if (savedTheme === 'dark') {
            body.classList.add('dark-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            body.classList.add('light-theme');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    } else {
        body.classList.add('light-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    if (lastCity) {
        cityInput.value = lastCity;
        getWeatherData(lastCity);
    } else {
        body.classList.add('bg-default');
        displayMessage("Enter a city to get started with WeatherSphere!");
    }
});