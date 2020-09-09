//Functions
const submitOrder = require('./requests/submitOrderTest');

//Submit Order tests
test('Submit Order Test Success', async () => {
    const body = {
        warehouseId: 1111,
        productType: "frozen",
        quantity: 5,
        deliveryDateTime: "2021-08-20 10:10:10"
    }
    const response = await submitOrder(body);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe('Order Created');
    expect(response.data.order.orderId).toEqual(expect.any(Number));
    expect(response.data.order.storeId).toEqual(expect.any(Number));
    expect(response.data.order.warehouseId).toBe(1111);
    expect(response.data.order.productType).toBe('frozen');
    expect(response.data.order.quantity).toBe(5);
    expect(response.data.order.deliveryDateTime).toEqual(Date.parse("2021-08-20 10:10:10"));
    expect(response.data.order.orderDateTime).toEqual(expect.any(Number));
    expect(response.data.order.orderStatus).toBe("Unfulfilled");
})
test('Submit Order Test Fail 1', async () => {
    const body = {
        warehouseId: 11111,
        productType: "frozen",
        quantity: 5,
        deliveryDateTime: "2021-08-20 10:10:10"
    }
    return submitOrder(body).catch(e => {
        expect(e.response.data.message).toMatch('Warehouse ID in incorrect format');
    });
})
test('Submit Order Test Fail 2', async () => {
    const body = {
        warehouseId: 1111,
        productType: "rotten",
        quantity: 5,
        deliveryDateTime: "2021-08-20 10:10:10"
    }
    return submitOrder(body).catch(e => {
        expect(e.response.data.message).toMatch('Product Type in incorrect format');
    });
})
test('Submit Order Test Fail 3', async () => {
    const body = {
        warehouseId: 1111,
        productType: "frozen",
        quantity: 0,
        deliveryDateTime: "2021-08-20 10:10:10"
    }
    return submitOrder(body).catch(e => {
        expect(e.response.data.message).toMatch('Quantity inncorrect');
    });
})
test('Submit Order Test Fail 4', async () => {
    const body = {
        warehouseId: 1111,
        productType: "frozen",
        quantity: 21,
        deliveryDateTime: "2021-08-20 10:10:10"
    }
    return submitOrder(body).catch(e => {
        expect(e.response.data.message).toMatch('Quantity inncorrect');
    });
})
test('Submit Order Test Fail 5', async () => {
    const body = {
        warehouseId: 1111,
        productType: "frozen",
        quantity: 5,
        deliveryDateTime: "2012-08-20 10:10:10"
    }
    return submitOrder(body).catch(e => {
        expect(e.response.data.message).toMatch('Date in incorrect format (2020-08-20 10:10:10) or has already passed');
    });
})
test('Submit Order Test Fail 6', async () => {
    const body = {
        warehouseId: 1111,
        productType: "frozen",
        quantity: 5,
        deliveryDateTime: "10:10:10 2021-08-20"
    }
    return submitOrder(body).catch(e => {
        expect(e.response.data.message).toMatch('Date in incorrect format (2020-08-20 10:10:10) or has already passed');
    });
})
test('Submit Order Test Fail 7', async () => {
    const body = {
        warehouseId: 1000,
        productType: "frozen",
        quantity: 5,
        deliveryDateTime: "2021-08-20 10:10:10"
    }
    return submitOrder(body).catch(e => {
        expect(e.response.data.message).toMatch('Warehouse does not exist');
    });
})
