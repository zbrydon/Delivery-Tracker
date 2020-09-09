//Functions
const viewStoreTEMP = require('./requests/viewStoreTEMPTest');
const viewWarehouseTEMP = require('./requests/viewWarehouseTEMPTest');

//View Store TEMP Tests
test('View Store TEMP Test Success', async () => {
    const response = await viewStoreTEMP();
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe('TEMP Displayed');
    expect(response.data.TEMP.frozen).toBeGreaterThanOrEqual(-25);
    expect(response.data.TEMP.frozen).toBeLessThan(-15);
    expect(response.data.TEMP.dairy).toBeGreaterThanOrEqual(0);
    expect(response.data.TEMP.dairy).toBeLessThan(6);
    expect(response.data.TEMP.meat).toBeGreaterThanOrEqual(0);
    expect(response.data.TEMP.meat).toBeLessThan(6);
    expect(response.data.TEMP.produce).toBeGreaterThanOrEqual(0);
    expect(response.data.TEMP.produce).toBeLessThan(10);
    expect(response.data.TEMP.ambient).toBeGreaterThanOrEqual(15);
    expect(response.data.TEMP.ambient).toBeLessThan(25);
})

//View warehouse TEMP Tests
test('View Warehouse TEMP Test Success', async () => {
    const response = await viewWarehouseTEMP();
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe('TEMP Displayed');
    expect(response.data.TEMP.frozen).toBeGreaterThanOrEqual(-25);
    expect(response.data.TEMP.frozen).toBeLessThan(-15);
    expect(response.data.TEMP.dairy).toBeGreaterThanOrEqual(0);
    expect(response.data.TEMP.dairy).toBeLessThan(6);
    expect(response.data.TEMP.meat).toBeGreaterThanOrEqual(0);
    expect(response.data.TEMP.meat).toBeLessThan(6);
    expect(response.data.TEMP.produce).toBeGreaterThanOrEqual(0);
    expect(response.data.TEMP.produce).toBeLessThan(10);
    expect(response.data.TEMP.ambient).toBeGreaterThanOrEqual(15);
    expect(response.data.TEMP.ambient).toBeLessThan(25);
})