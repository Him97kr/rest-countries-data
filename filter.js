require('dotenv').config()
const fs = require('fs');

const API_KEY = process.env.REST_COUNTRIES_API_KEY;
const BASE_URL = 'https://api.restcountries.com/countries/v5?response_fields=names.common,names.official,population,area,capitals.name,flag.emoji,flag.url_png,flag.url_svg,codes.alpha_2,codes.alpha_3,languages.name,region,currencies,';

async function fetchCountries() {
    try {
        // v5 enforces pagination. Adjust limit (max 100) and offset as needed.
        const url = `${BASE_URL}?&pretty=&limit=100&offset=0`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Country Data:', data);
        fs.writeFileSync('countries.json', JSON.stringify(data, null, 2));
        return data;
    } catch (error) {
        console.error('Error fetching country data:', error.message);
    }
}

fetchCountries();