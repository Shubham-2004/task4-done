// src/api/openweathermap.js

const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function searchCities(query) {
    try {
        const response = await fetch(`${BASE_URL}/find?q=${query}&appid=${API_KEY}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.list;
    } catch (error) {
        console.error('Error searching for cities:', error);
        return [];
    }
}

export async function getWeather(cityId) {
    try {
        const response = await fetch(`${BASE_URL}/weather?id=${cityId}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}
