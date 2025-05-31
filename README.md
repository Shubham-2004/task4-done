# Weather App

This project implements a simple weather application with a city search feature using the OpenWeatherMap API, as described in Jira issue [WEAT-4](https://yorkhackathonteam10.atlassian.net/browse/WEAT-4).

## Setup

1. Obtain an API key from [OpenWeatherMap](https://openweathermap.org/api).
2. Replace `'YOUR_API_KEY'` in `src/api/openweathermap.js` with your actual API key.
3. Open `public/index.html` in your web browser.

## Features

*   City search with autocomplete.
*   Displays current weather data for selected city.
*   Persists recent searches using Local Storage.

## Acceptance Criteria (from WEAT-4)

*   ✅ Core Functionality (50%)
    *   ✅ Returns city matches.
    *   ✅ Clicking a city suggestion loads weather data instantly.
    *   ✅ Recent searches persist after page refresh.
*   ✅ UX (30%)
    *   ✅ Clear "No results" state.
*   ⏳ Innovation (20%) _(Bonus)_
    *   ⏳ Fuzzy search.
    *   ⏳ Auto-detect and correct typos.

**Note:** The bonus Innovation criteria for fuzzy search and typo correction are not yet implemented.
