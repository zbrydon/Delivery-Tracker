//Functions
const fulfillOrder = require('./requests/fulfillOrderTest');

//Fulfill Order Tests
//Ensure Order 1003 exists and has a satus of Unfulfilled
test('Fulfill Order Test Success', async () => {
    const body = {
        orderId: 1003,
        orderStatus: "Fulfilled"
    }
    const response = await fulfillOrder(body);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe('Updated Order');
    expect(response.data.order.orderId).toBe(1003);
    expect(response.data.order.storeId).toBe(11111);
    expect(response.data.order.warehouseId).toBe(1111);
    expect(response.data.order.frozenQuantity).toBe(1);
    expect(response.data.order.dairyQuantity).toBe(2);
    expect(response.data.order.meatQuantity).toBe(3);
    expect(response.data.order.produceQuantity).toBe(4);
    expect(response.data.order.ambientQuantity).toBe(5);
    expect(response.data.order.deliveryDateTime).toEqual(Date.parse("2021-08-20 10:10:10"));
    expect(response.data.order.orderDateTime).toEqual(expect.any(Number));
    expect(response.data.order.orderStatus).toEqual(expect.any(String));
})
test('Fulfill Order Test Fail 1', async () => {
    const body = {
        orderId: 100,
        orderStatus: "Fulfilled"
    }
    return fulfillOrder(body).catch(e => {
        expect(e.response.data.message).toMatch('Order ID in incorrect format');
    });
})
test('Fulfill Order Test Fail 2', async () => {
    const body = {
        orderId: "abcd",
        orderStatus: "Fulfilled"
    }
    return fulfillOrder(body).catch(e => {
        expect(e.response.data.message).toMatch('Order ID in incorrect format');
    });
})
test('Fulfill Order Test Fail 3', async () => {
    const body = {
        orderId: 1003,
        orderStatus: "thrown"
    }
    return fulfillOrder(body).catch(e => {
        expect(e.response.data.message).toMatch('Status in incorrect format');
    });
})
test('Fulfill Order Test Fail 4', async () => {
    const body = {
        orderId: 9999,
        orderStatus: "Fulfilled"
    }
    return fulfillOrder(body).catch(e => {
        expect(e.response.data.message).toMatch('Order not found');
    });
})
test('Fulfill Order Test Fail 5', async () => {
    const body = {
        orderId: 1003,
        orderStatus: "Fulfilled"
    }
    return fulfillOrder(body).catch(e => {
        expect(e.response.data.message).toMatch('Order cannot be fulfilled');
    });
})
test('Fulfill Order Test Fail 6', async () => {
    const body = {
        orderId: 1004,
        orderStatus: "In Transit"
    }
    return fulfillOrder(body).catch(e => {
        expect(e.response.data.message).toMatch('Order not ready to be dispacted');
    });
})
test('Fulfill Order Test Fail 7', async () => {
    const body = {
        orderId: 1003,
        orderStatus: "Delivered"
    }
    return fulfillOrder(body).catch(e => {
        expect(e.response.data.message).toMatch('Order not ready to be Delivered');
    });
})