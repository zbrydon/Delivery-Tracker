const axios = require('axios'); 
const dotenv = require('dotenv');

dotenv.config();

const API_URL = process.env.API_URL;

async function registerStore(inputData) {

    const response = await axios.post(`${API_URL}/registerStore`, inputData);
    return response;
}

module.exports = registerStore;