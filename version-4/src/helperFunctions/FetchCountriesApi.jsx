import axios from 'axios';

// Airtable API Configuration
const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const AIRTABLE_COUNTRIES_TABLE = 'countries';

const airtableApi = axios.create({
    baseURL: `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`,
    headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
    },
});

export const fetchCountries = async () => {
    try {
        // Fetch from RESTCountries API
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const countries = await response.json();

        // Fetch additional data from Airtable (click counts, etc.)
        const airtableResponse = await airtableApi.get(`/${AIRTABLE_COUNTRIES_TABLE}`);
        const airtableData = airtableResponse.data.records;

        // Merge Airtable data with RESTCountries data
        const mergedData = countries.map(country => {
            const airtableMatch = airtableData.find(
                record => record.fields.country_key_cca3 === country.cca3
            );

            return {
                ...country,
                clickCount: airtableMatch ? airtableMatch.fields.click_count : 0,
            };
        });

        return mergedData;

    } catch (error) {
        console.error('Failed to fetch countries:', error);

        // Fallback to local data
        try {
            const localResponse = await fetch('version-2/src/data.json');
            if (!localResponse.ok) {
                throw new Error('Network response was not ok');
            }
            const localData = await localResponse.json();
            return localData;
        } catch (localError) {
            console.error('Failed to fetch countries from local data:', localError);
            throw localError;
        }
    }
};
