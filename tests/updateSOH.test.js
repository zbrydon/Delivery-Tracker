//Functions
const updateStoreSOH = require('./requests/updateStoreSOHTest');
const updateWarehouseSOH = require('./requests/updateWarehouseSOHTest');

// Update Store SOH  Tests

test('Update Store SOH Test Success', async () => {
    const body = {
        frozenQuantity: 5,
        dairyQuantity: 6,
        meatQuantity: 7,
        produceQuantity: 8,
        ambientQuantity:9
    }
    const response = await updateStoreSOH(body);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe('SOH Updated');
    expect(response.data.store.SOH).toEqual(expect.any(Object));
    expect(response.data.store.SOH.frozen).toBe(5);
    expect(response.data.store.SOH.dairy).toBe(6);
    expect(response.data.store.SOH.meat).toBe(7);
    expect(response.data.store.SOH.produce).toBe(8);
    expect(response.data.store.SOH.ambient).toBe(9);
})
test('Update Store SOH Test Fail 1', async () => {
    const body = {
        frozenQuantity: 0,
        dairyQuantity: 6,
        meatQuantity: 7,
        produceQuantity: 8,
        ambientQuantity: 9
    }
    return updateStoreSOH(body).catch(e => {
        expect(e.response.data.message).toMatch('Quantity inncorrect');
    });
})
test('Update Store SOH Test Fail 2', async () => {
    const body = {
        frozenQuantity: 21,
        dairyQuantity: 6,
        meatQuantity: 7,
        produceQuantity: 8,
        ambientQuantity: 9
    }
    return updateStoreSOH(body).catch(e => {
        expect(e.response.data.message).toMatch('Quantity inncorrect');
    });
})

//Update Warehouse SOH Tests

test('Update Warehouse SOH Test Success', async () => {
    const body = {
        frozenQuantity: 20,
        dairyQuantity: 6,
        meatQuantity: 7,
        produceQuantity: 8,
        ambientQuantity: 9
    }
    const response = await updateWarehouseSOH(body);
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe('SOH Updated');
    expect(response.data.warehouse.SOH).toEqual(expect.any(Object));
    expect(response.data.warehouse.SOH.frozen).toBe(20);
    expect(response.data.warehouse.SOH.dairy).toBe(6);
    expect(response.data.warehouse.SOH.meat).toBe(7);
    expect(response.data.warehouse.SOH.produce).toBe(8);
    expect(response.data.warehouse.SOH.ambient).toBe(9);
})
test('Update Warehouse SOH Test Fail 1', async () => {
    const body = {
        frozenQuantity: 0,
        dairyQuantity: 6,
        meatQuantity: 7,
        produceQuantity: 8,
        ambientQuantity: 9
    }
    return updateWarehouseSOH(body).catch(e => {
        expect(e.response.data.message).toMatch('Quantity inncorrect');
    });
})
test('Update Warehouse SOH Test Fail 2', async () => {
    const body = {
        frozenQuantity: 21,
        dairyQuantity: 6,
        meatQuantity: 7,
        produceQuantity: 8,
        ambientQuantity: 9
    }
    return updateWarehouseSOH(body).catch(e => {
        expect(e.response.data.message).toMatch('Quantity inncorrect');
    });
})