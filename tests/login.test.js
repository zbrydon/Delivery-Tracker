//Functions
const login = require('./requests/loginTest');

//Store Login Tests

test('Login Store Test Success', async () => {
    const body = {
        id: 11111,
        password: "password"
    }
    const response = await login(body);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe('Logged In');
    expect(response.data.tokens.token).toEqual(expect.any(String));
    expect(response.data.tokens.refreshToken).toEqual(expect.any(String));
    expect(response.data.type).toBe('store');
})
test('Login Store Test Fail 1', async () => {
    const body = {
        id: "abcde",
        password: "password"
    }
    return login(body).catch(e => {
        expect(e.response.data.message).toMatch('ID is not a number');
    });
})
test('Login Store Test Fail 2', async () => {
    const body = {
        id: 123,
        password: "password"
    }
    return login(body).catch(e => {
        expect(e.response.data.message).toMatch('ID is the incorrect length');
    });
})
test('Login Store Test Fail 3', async () => {
    const body = {
        id: 123456,
        password: "password"
    }
    return login(body).catch(e => {
        expect(e.response.data.message).toMatch('ID is the incorrect length');
    });
})
test('Login Store Test Fail 4', async () => {
    const body = {
        id: 1111,
        password: "passwor"
    }
    return login(body).catch(e => {
        expect(e.response.data.message).toMatch('Password must be longer than 8 characters');
    });
})
test('Login Store Test Fail 5', async () => {
    const body = {
        id: 54321,
        password: "password"
    }
    return login(body).catch(e => {
        expect(e.response.data.message).toMatch('ID does not exist');
    });
})
test('Login Store Test Fail 6', async () => {
    const body = {
        id: 11111,
        password: "passwordd"
    }
    return login(body).catch(e => {
        expect(e.response.data.message).toMatch('Authentication failed. Wrong password.');
    });
})

//Login Warehouse Tests

test('Login Warehouse Test Success', async () => {
    const body = {
        id: 1111,
        password: "password"
    }
    const response = await login(body);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe('Logged In');
    expect(response.data.tokens.token).toEqual(expect.any(String));
    expect(response.data.tokens.refreshToken).toEqual(expect.any(String));
    expect(response.data.type).toBe('warehouse');
})
test('Login Warehouse Test Fail 1', async () => {
    const body = {
        id: "abcde",
        password: "password"
    }
    return login(body).catch(e => {
        expect(e.response.data.message).toMatch('ID is not a number');
    });
})
test('Login Warehouse Test Fail 2', async () => {
    const body = {
        id: 123,
        password: "password"
    }
    return login(body).catch(e => {
        expect(e.response.data.message).toMatch('ID is the incorrect length');
    });
})
test('Login Warehouse Test Fail 3', async () => {
    const body = {
        id: 123456,
        password: "password"
    }
    return login(body).catch(e => {
        expect(e.response.data.message).toMatch('ID is the incorrect length');
    });
})
test('Login Warehouse Test Fail 4', async () => {
    const body = {
        id: 1111,
        password: "passwor"
    }
    return login(body).catch(e => {
        expect(e.response.data.message).toMatch('Password must be longer than 8 characters');
    });
})
test('Login Warehouse Test Fail  5' , async () => {
    const body = {
        id: 5432,
        password: "password"
    }
    return login(body).catch(e => {
        expect(e.response.data.message).toMatch('ID does not exist');
    });
})
test('Login Warehouse Test Fail 6', async () => {
    const body = {
        id: 1111,
        password: "passwordd"
    }
    return login(body).catch(e => {
        expect(e.response.data.message).toMatch('Authentication failed. Wrong password.');
    });
})

