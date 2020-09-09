const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const API_URL = process.env.API_URL;
const STORE_TOKEN = process.env.STORE_TOKEN;

async function registerStore(inputData) {

    const headers = {
        'authorization': STORE_TOKEN
    };
    const response = await axios.post(`${API_URL}/submitOrder`, inputData, { headers } );
    return response;
}

module.exports = registerStore;