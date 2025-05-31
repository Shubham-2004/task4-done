// src/index.js

import CitySearch from './components/CitySearch';

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    if (app) {
        // Initialize the city search component
        const citySearchComponent = new CitySearch(app);
    }
});
