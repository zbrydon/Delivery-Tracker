const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const API_URL = process.env.API_URL;
const WAREHOUSE_TOKEN = process.env.WAREHOUSE_TOKEN;

async function registerStore() {

    const headers = {
        'authorization': WAREHOUSE_TOKEN
    };
    const response = await axios.get(`${API_URL}/viewWarehouseOrders`, { headers });
    return response;
}

module.exports = registerStore;