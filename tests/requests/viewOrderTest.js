const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const API_URL = process.env.API_URL;
const STORE_TOKEN = process.env.STORE_TOKEN;

async function registerStore(inputData) {
    const params = { orderId: inputData };
    const headers = {
        'authorization': STORE_TOKEN
    };
    const response = await axios.get(`${API_URL}/viewOrder`, { headers , params });
    return response;
}

module.exports = registerStore;