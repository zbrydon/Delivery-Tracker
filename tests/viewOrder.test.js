//Functions
const viewOrder = require('./requests/viewOrderTest');

//View store orders Tests
//Ensure order 1001 exists 
test('View Order Details Test Success', async () => {
    const response = await viewOrder(1003);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe('Order Details Displayed');
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
    expect(response.data.order.location).toEqual(expect.any(Object));
    expect(response.data.order.ETA).toBe(null);
    expect(response.data.order.EDA).toBe(null);
})
