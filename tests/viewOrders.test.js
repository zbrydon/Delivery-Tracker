//Functions
const viewStoreOrders = require('./requests/viewStoreOrdersTest');
const viewWarehouseOrders = require('./requests/viewWarehouseOrdersTest');

//View store orders Tests
//Ensure order 1001 exists 
test('View Store Orders Test Success', async () => {
    const response = await viewStoreOrders();
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe('Orders Displayed');
    expect(response.data.orders[1].orderId).toBe(1001);
})

//View warehouse orders Tests
//Ensure order 1001 exists 
test('View Warehouse Orders Test Success', async () => {
    const response = await viewWarehouseOrders();
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe('Orders Displayed');
    expect(response.data.orders[1].orderId).toBe(1001);
})