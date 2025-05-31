// src/utils/storage.js

const RECENTS_STORAGE_KEY = 'weather_app_recent_searches';
const MAX_RECENT_SEARCHES = 5; // Limit the number of recent searches

export function getRecentSearches() {
    const searches = localStorage.getItem(RECENTS_STORAGE_KEY);
    return searches ? JSON.parse(searches) : [];
}

export function addRecentSearch(search) {
    const searches = getRecentSearches();
    // Remove if already exists to avoid duplicates and bring to front
    const filteredSearches = searches.filter(s => s.id !== search.id);
    // Add new search to the front
    filteredSearches.unshift(search);
    // Limit to max recent searches
    const recentSearches = filteredSearches.slice(0, MAX_RECENT_SEARCHES);
    localStorage.setItem(RECENTS_STORAGE_KEY, JSON.stringify(recentSearches));
}
