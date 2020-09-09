const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const API_URL = process.env.API_URL;
const WAREHOUSE_TOKEN = process.env.WAREHOUSE_TOKEN;

async function registerStore(inputData) {

    const headers = {
        'authorization': WAREHOUSE_TOKEN
    };
    const response = await axios.post(`${API_URL}/updateWarehouseSOH`, inputData, { headers });
    return response;
}

module.exports = registerStore;