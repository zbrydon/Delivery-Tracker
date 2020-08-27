//First Look of Jest Testing API

const dotenv = require('dotenv'); 
const axios = require('axios'); 

dotenv.config();

const { API_URL } = process.env;

test('test orders Store', () => { 
    expect.assertions(1);
    axios.get(`${API_URL}/...`) //Add later when testing api 
        .then(resp => resp.data) 
        .then(resp => {
            expect(resp[0].orders).toEqual('...'); //Add later when testing api
    });
});

test('test orders Warehouse', () => { 
    expect.assertions(1);
    axios.get(`${API_URL}/...`) //Add later when testing api 
        .then(resp => resp.data) 
        .then(resp => {
            expect(resp[0].orders).toEqual('...'); //Add later when testing api
    });
});

test('test products', () => { 
    expect.assertions(1);
    axios.get(`${API_URL}/...`) //Add later when testing api 
        .then(resp => resp.data) 
        .then(resp => {
            expect(resp[0].name).toEqual('...'); //Add later when testing api 
    });
});

test('test products', () => { 
    expect.assertions(1);
    axios.get(`${API_URL}/...`) //Add later when testing api 
        .then(resp => resp.data) 
        .then(resp => {
            expect(resp[0].name).toEqual('...'); //Add later when testing api 
    });
});





