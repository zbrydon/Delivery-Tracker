//Functions
const viewStoreSOH = require('./requests/viewStoreSOHTest');
const viewWarehouseSOH = require('./requests/viewWarehouseSOHTest');

//View Store SOH Tests
test('View Store SOH Test Success', async () => {
    const response = await viewStoreSOH();
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe('SOH Displayed');
    expect(response.data.SOH.frozen).toBeGreaterThanOrEqual(1);
    expect(response.data.SOH.frozen).toBeLessThan(21);
    expect(response.data.SOH.dairy).toBeGreaterThanOrEqual(1);
    expect(response.data.SOH.dairy).toBeLessThan(21);
    expect(response.data.SOH.meat).toBeGreaterThanOrEqual(1);
    expect(response.data.SOH.meat).toBeLessThan(21);
    expect(response.data.SOH.produce).toBeGreaterThanOrEqual(1);
    expect(response.data.SOH.produce).toBeLessThan(21);
    expect(response.data.SOH.ambient).toBeGreaterThanOrEqual(1);
    expect(response.data.SOH.ambient).toBeLessThan(21);
})

//View warehouse SOH Tests
test('View Warehouse SOH Test Success', async () => {
    const response = await viewWarehouseSOH();
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe('SOH Displayed');
    expect(response.data.SOH.frozen).toBeGreaterThanOrEqual(1);
    expect(response.data.SOH.frozen).toBeLessThan(21);
    expect(response.data.SOH.dairy).toBeGreaterThanOrEqual(1);
    expect(response.data.SOH.dairy).toBeLessThan(21);
    expect(response.data.SOH.meat).toBeGreaterThanOrEqual(1);
    expect(response.data.SOH.meat).toBeLessThan(21);
    expect(response.data.SOH.produce).toBeGreaterThanOrEqual(1);
    expect(response.data.SOH.produce).toBeLessThan(21);
    expect(response.data.SOH.ambient).toBeGreaterThanOrEqual(1);
    expect(response.data.SOH.ambient).toBeLessThan(21);
})