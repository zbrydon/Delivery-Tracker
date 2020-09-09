const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const API_URL = process.env.API_URL;
const STORE_TOKEN = process.env.STORE_TOKEN;

async function registerStore() {

    const headers = {
        'authorization': STORE_TOKEN
    };
    const response = await axios.get(`${API_URL}/viewStoreOrders`, { headers });
    return response;
}

module.exports = registerStore;