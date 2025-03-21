const captainModel = require('../models/captain.model');
const axios = require('axios');

const apiKey = process.env.GOOGLE_MAPS_API;


module.exports.getAddressCoordinate = async (address) => {
    if (!address) throw new Error('Address is required');

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK' && response.data.results.length > 0) {
            const location = response.data.results[0].geometry.location;
            return { lat: location.lat, lng: location.lng };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error.response?.data || error.message);
        throw error;
    }
};

/**
 * Get distance and time between two locations
 * @param {string} origin - Starting location
 * @param {string} destination - Destination location
 * @returns {object} Distance and duration
 */
module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) throw new Error('Origin and Destination are required');

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK' && response.data.rows[0]?.elements[0]?.status !== 'ZERO_RESULTS') {
            return response.data.rows[0].elements[0]; // Returns { distance, duration }
        } else {
            throw new Error('No routes found between origin and destination');
        }
    } catch (error) {
        console.error('Error fetching distance and time:', error.response?.data || error.message);
        throw error;
    }
};

/**
 * Get autocomplete suggestions for a location search input
 * @param {string} input - User's search input
 * @returns {array} List of place predictions
 */
module.exports.getAutoCompleteSuggestion = async (input) => {
    if (!input) throw new Error('Query is required');

    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&types=geocode&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK' && response.data.predictions.length > 0) {
            return response.data.predictions.map(prediction => ({
                description: prediction.description,
                placeId: prediction.place_id
            }));
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (error) {
        console.error('Error fetching suggestions:', error.response?.data || error.message);
        throw error;
    }
};

module.exports.getCaptainInTheRadius = async (ltd, lng, radius) => {
    try {
        // 🔍 Log before query
        console.log(`🔍 Searching for captains near (${ltd}, ${lng}) within ${radius} km`);

        const captains = await captainModel.find({
            location: {
                $geoWithin: {
                    $centerSphere: [[ltd, lng], radius / 6371] // Earth's radius in km
                }
            }
        });

        // ✅ Log after captains is defined
        console.log("🟠 Captains found in radius:", captains);

        return captains;
    } catch (error) {
        console.error("🔴 Error in getCaptainInTheRadius:", error);
    }
}
