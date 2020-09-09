//Functions 
const registerStore = require('./requests/registerStoreTest');
const registerWarehouse = require('./requests/registerWarehouseTest');

//Register Store Tests
//Ensure Store 12345 does not exist 
const successResponseRegisterStore = {
    success: true,
    message: 'Store Created'
}
test('Register Store Test Success', async () => {
    const body = {
        id: 12345,
        password: "password",
        confirm_password: "password",
        location: {
            lat: "-30",
            long: "140"
        }
    }
    const response = await registerStore(body);
    expect(response.data).toMatchObject(successResponseRegisterStore);
})

test('Register Store Test Fail 1', async () => {
    const body = {
        id: 12345,
        password: "password",
        confirm_password: "password",
        location: {
            lat: "-30",
            long: "140"
        }
    }

    return registerStore(body).catch(e => {
        expect(e.response.data.message).toMatch('ID already exists');
    });

})
test('Register Store Test Fail 2', async () => {
    const body = {
        id: "abcde",
        password: "password",
        confirm_password: "password",
        location: {
            lat: "-30",
            long: "140"
        }
    }
    return registerStore(body).catch(e => {
        expect(e.response.data.message).toMatch('ID or Password in incorrect format');
    });
})
test('Register Store Test Fail 3', async () => {
    const body = {
        id: 123,
        password: "password",
        confirm_password: "password",
        location: {
            lat: "-30",
            long: "140"
        }
    }
    return registerStore(body).catch(e => {
        expect(e.response.data.message).toMatch('ID or Password in incorrect format');
    });
})

test('Register Store Test Fail 4', async () => {
    const body = {
        id: 123456,
        password: "password",
        confirm_password: "password",
        location: {
            lat: "-30",
            long: "140"
        }
    }
    return registerStore(body).catch(e => {
        expect(e.response.data.message).toMatch('ID or Password in incorrect format');
    });
})
test('Register Store Test Fail 5', async () => {
    const body = {
        id: 12345,
        password: "passwor",
        confirm_password: "passwor",
        location: {
            lat: "-30",
            long: "140"
        }
    }
    return registerStore(body).catch(e => {
        expect(e.response.data.message).toMatch('ID or Password in incorrect format');
    });
})

test('Register Store Test Fail 6', async () => {
    const body = {
        id: 12345,
        password: "password",
        confirm_password: "password",
        location: {
            lat: "location",
            long:"location"
        }
    }
    return registerStore(body).catch(e => {
        expect(e.response.data.message).toMatch('Location in Incorrect format');
    });
})



//Register Warehouse Tests
//Ensure Warehouse
const successResponseRegisterWarehouse = {
    success: true,
    message: 'Warehouse Created'
}
test('Register Warehouse Test Success', async () => {
    const body = {
        id: 1234,
        password: "password",
        confirm_password: "password"
    }
    const response = await registerWarehouse(body);
    expect(response.data).toMatchObject(successResponseRegisterWarehouse);
})

test('Register Warehouse Test Fail 1', async () => {
    const body = {
        id: 1234,
        password: "password",
        confirm_password: "password"
    }

    return registerWarehouse(body).catch(e => {
        expect(e.response.data.message).toMatch('ID already exists');
    });

})
test('Register Warehouse Test Fail 2', async () => {
    const body = {
        id: "abcd",
        password: "password",
        confirm_password: "password"
    }
    return registerWarehouse(body).catch(e => {
        expect(e.response.data.message).toMatch('ID or Password in incorrect format');
    });
})
test('Register Warehouse Test Fail 3', async () => {
    const body = {
        id: 123,
        password: "password",
        confirm_password: "password"
    }
    return registerWarehouse(body).catch(e => {
        expect(e.response.data.message).toMatch('ID or Password in incorrect format');
    });
})

test('Register Warehouse Test Fail 4', async () => {
    const body = {
        id: 12345,
        password: "password",
        confirm_password: "password"
    }
    return registerWarehouse(body).catch(e => {
        expect(e.response.data.message).toMatch('ID or Password in incorrect format');
    });
})
test('Register Warehouse Test Fail 5', async () => {
    const body = {
        id: 1234,
        password: "passwor",
        confirm_password: "passwor"
    }
    return registerWarehouse(body).catch(e => {
        expect(e.response.data.message).toMatch('ID or Password in incorrect format');
    });
})

test('Register Warehouse Test Fail 6', async () => {
    const body = {
        id: 1234,
        password: "password",
        confirm_password: "password1"
    }
    return registerWarehouse(body).catch(e => {
        expect(e.response.data.message).toMatch('Passwords do not match');
    });
})


