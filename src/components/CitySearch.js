// src/components/CitySearch.js

import { searchCities, getWeather } from '../api/openweathermap';
import { getRecentSearches, addRecentSearch } from '../utils/storage';

class CitySearch {
    constructor(containerElement) {
        this.container = containerElement;
        this.render();
        this.attachEventListeners();
        this.loadRecentSearches();
    }

    render() {
        this.container.innerHTML = `
            <input type="text" id="city-input" placeholder="Enter city name">
            <ul id="suggestions"></ul>
            <div id="weather-data"></div>
            <h2>Recent Searches</h2>
            <ul id="recent-searches"></ul>
        `;
        this.cityInput = document.getElementById('city-input');
        this.suggestionsList = document.getElementById('suggestions');
        this.weatherDataDiv = document.getElementById('weather-data');
        this.recentSearchesList = document.getElementById('recent-searches');
    }

    attachEventListeners() {
        this.cityInput.addEventListener('input', this.handleInput.bind(this));
        this.suggestionsList.addEventListener('click', this.handleSuggestionClick.bind(this));
    }

    async handleInput(event) {
        const query = event.target.value.trim();
        if (query.length > 2) {
            const cities = await searchCities(query);
            this.displaySuggestions(cities);
        } else {
            this.clearSuggestions();
        }
    }

    displaySuggestions(cities) {
        this.suggestionsList.innerHTML = '';
        if (cities && cities.length > 0) {
            cities.forEach(city => {
                const li = document.createElement('li');
                li.textContent = `${city.name}, ${city.sys.country}`;
                li.dataset.cityId = city.id;
                li.dataset.cityName = city.name;
                li.dataset.country = city.sys.country;
                this.suggestionsList.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            li.textContent = 'No cities found.';
            this.suggestionsList.appendChild(li);
        }
    }

    clearSuggestions() {
        this.suggestionsList.innerHTML = '';
    }

    async handleSuggestionClick(event) {
        const target = event.target;
        if (target.tagName === 'LI' && target.dataset.cityId) {
            const cityId = target.dataset.cityId;
            const cityName = target.dataset.cityName;
            const country = target.dataset.country;
            this.clearSuggestions();
            this.cityInput.value = `${cityName}, ${country}`;
            
            const weather = await getWeather(cityId);
            this.displayWeatherData(weather);
            addRecentSearch({ id: cityId, name: cityName, country: country });
            this.loadRecentSearches(); // Refresh recent searches list
        }
    }

    displayWeatherData(weather) {
        if (weather) {
            this.weatherDataDiv.innerHTML = `
                <h2>${weather.name}, ${weather.sys.country}</h2>
                <p>Temperature: ${weather.main.temp}°C</p>
                <p>Weather: ${weather.weather[0].description}</p>
            `;
        } else {
            this.weatherDataDiv.innerHTML = '<p>Could not retrieve weather data.</p>';
        }
    }

    loadRecentSearches() {
        const recentSearches = getRecentSearches();
        this.recentSearchesList.innerHTML = '';
        recentSearches.forEach(search => {
            const li = document.createElement('li');
            li.textContent = `${search.name}, ${search.country}`;
            li.dataset.cityId = search.id;
            li.dataset.cityName = search.name;
            li.dataset.country = search.country;
            this.recentSearchesList.appendChild(li);
        });
    }
}

export default CitySearch;
