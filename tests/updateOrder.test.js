//Functions
const updateOrder = require('./requests/updateOrderTest');

//Update Order Tests
//Ensure order 1003 exists 
test('Update Order Test Success', async () => {
    const body = {
        orderId: 1003,
        warehouseId: 1111,
        frozenQuantity: 1,
        dairyQuantity: 2,
        meatQuantity: 3,
        produceQuantity: 4,
        ambientQuantity: 5,
        deliveryDateTime: "2021-08-20 10:10:10"
    }
    const response = await updateOrder(body);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe('Order Updated');
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
test('Update Order Test Fail 1', async () => {
    const body = {
        orderId: 100,
        warehouseId: 1111,
        frozenQuantity: 1,
        dairyQuantity: 2,
        meatQuantity: 3,
        produceQuantity: 4,
        ambientQuantity: 5,
        deliveryDateTime: "2021-08-20 10:10:10"
    }
    return updateOrder(body).catch(e => {
        expect(e.response.data.message).toMatch('Order ID in incorrect format');
    });
})
test('Update Order Test Fail 2', async () => {
    const body = {
        orderId: "abcd",
        warehouseId: 1111,
        frozenQuantity: 1,
        dairyQuantity: 2,
        meatQuantity: 3,
        produceQuantity: 4,
        ambientQuantity: 5,
        deliveryDateTime: "2021-08-20 10:10:10"
    }
    return updateOrder(body).catch(e => {
        expect(e.response.data.message).toMatch('Order ID in incorrect format');
    });
})
test('Update Order Test Fail 3', async () => {
    const body = {
        orderId: 10000,
        warehouseId: 1111,
        frozenQuantity: 1,
        dairyQuantity: 2,
        meatQuantity: 3,
        produceQuantity: 4,
        ambientQuantity: 5,
        deliveryDateTime: "2021-08-20 10:10:10"
    }
    return updateOrder(body).catch(e => {
        expect(e.response.data.message).toMatch('Order ID in incorrect format');
    });
})
test('Update Order Test Fail 4', async () => {
    const body = {
        orderId: 1003,
        warehouseId: 11111,
        frozenQuantity: 1,
        dairyQuantity: 2,
        meatQuantity: 3,
        produceQuantity: 4,
        ambientQuantity: 5,
        deliveryDateTime: "2021-08-20 10:10:10"
    }
    return updateOrder(body).catch(e => {
        expect(e.response.data.message).toMatch('Warehouse ID in incorrect format');
    });
})
test('Update Order Test Fail 6', async () => {
    const body = {
        orderId: 1003,
        warehouseId: 1111,
        frozenQuantity: -1,
        dairyQuantity: 2,
        meatQuantity: 3,
        produceQuantity: 4,
        ambientQuantity: 5,
        deliveryDateTime: "2021-08-20 10:10:10"
    }
    return updateOrder(body).catch(e => {
        expect(e.response.data.message).toMatch('Quantity inncorrect');
    });
})
test('Update Order Test Fail 7', async () => {
    const body = {
        orderId: 1003,
        warehouseId: 1111,
        frozenQuantity: 1,
        dairyQuantity: 2,
        meatQuantity: 3,
        produceQuantity: 4,
        ambientQuantity: 7,
        deliveryDateTime: "2021-08-20 10:10:10"
    }
    return updateOrder(body).catch(e => {
        expect(e.response.data.message).toMatch('Quantity inncorrect');
    });
})
test('Update Order Test Fail 8', async () => {
    const body = {
        orderId: 1003,
        warehouseId: 1111,
        frozenQuantity: 1,
        dairyQuantity: 2,
        meatQuantity: 3,
        produceQuantity: 4,
        ambientQuantity: 5,
        deliveryDateTime: "2012-08-20 10:10:10"
    }
    return updateOrder(body).catch(e => {
        expect(e.response.data.message).toMatch('Date in incorrect format (2020-08-20 10:10:10) or has already passed');
    });
})
test('update Order Test Fail 9', async () => {
    const body = {
        orderId: 1003,
        warehouseId: 1111,
        frozenQuantity: 1,
        dairyQuantity: 2,
        meatQuantity: 3,
        produceQuantity: 4,
        ambientQuantity: 5,
        deliveryDateTime: "10:10:10-2021/08/20"
    }
    return updateOrder(body).catch(e => {
        expect(e.response.data.message).toMatch('Date in incorrect format (2020-08-20 10:10:10) or has already passed');
    });
})
test('Update Order Test Fail 10', async () => {
    const body = {
        orderId: 9999,
        warehouseId: 1111,
        frozenQuantity: 1,
        dairyQuantity: 2,
        meatQuantity: 3,
        produceQuantity: 4,
        ambientQuantity: 5,
        deliveryDateTime: "2021-08-20 10:10:10"
    }
    return updateOrder(body).catch(e => {
        expect(e.response.data.message).toMatch('Order does not exist');
    });
})
test('Update Order Test Fail 11', async () => {
    const body = {
        orderId: 1002,
        warehouseId: 1111,
        frozenQuantity: 1,
        dairyQuantity: 2,
        meatQuantity: 3,
        produceQuantity: 4,
        ambientQuantity: 5,
        deliveryDateTime: "2021-08-20 10:10:10"
    }
    return updateOrder(body).catch(e => {
        expect(e.response.data.message).toMatch('Order does not belong to this store');
    });
})
test('Update Order Test Fail 12', async () => {
    const body = {
        orderId: 1003,
        warehouseId: 1000,
        frozenQuantity: 1,
        dairyQuantity: 2,
        meatQuantity: 3,
        produceQuantity: 4,
        ambientQuantity: 5,
        deliveryDateTime: "2021-08-20 10:10:10"
    }
    return updateOrder(body).catch(e => {
        expect(e.response.data.message).toMatch('Warehouse does not exist');
    });
})
test('Update Order Test Fail 13', async () => {
    const body = {
        orderId: 1001,
        warehouseId: 2222,
        frozenQuantity: 1,
        dairyQuantity: 2,
        meatQuantity: 3,
        produceQuantity: 4,
        ambientQuantity: 5,
        deliveryDateTime: "2021-08-20 10:10:10"
    }
    return updateOrder(body).catch(e => {
        expect(e.response.data.message).toMatch('Order cannot be updated it has left the warehouse');
    });
})