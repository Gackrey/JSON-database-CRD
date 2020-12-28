const { test, expect } = require('@jest/globals');
const CRU = require('./library');
let cru = new CRU(); // let cru = new CRU('test.json');

//Testing Create Function
test('Create a key-value pair', () => {
    expect(cru.create("Hello", 1))
        .toEqual(expect.stringContaining("Hello added successfully"));
})

test('Duplicate key-value pair check', () => {
    expect(cru.create("Hello", 1))
        .toEqual(expect.stringContaining("Error: the key is already exists"));
})

test('Create another key-value pair', () => {
    expect(cru.create("world", 1000))
        .toEqual(expect.stringContaining("world added successfully"));
})

test('Key length less than 32 characters', () => {
    expect(cru.create("HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello", 1))
        .toEqual(expect.stringContaining("Error: length of key should be less than 32 characters"));
})

test('Non-string keys are not accepted ', () => {
    expect(cru.create(122, 1))
        .toEqual(expect.stringContaining("Error: invalid Key value!!! key must contain only alphabets and no special character or number"));
})

//Testing Read function
test('Reading a key to display value', () => {
    expect(cru.read("Hello"))
        .toEqual(expect.stringContaining("Hello:1"));
})

test('Error check for non existing keys', () => {
    expect(cru.read("World"))
        .toEqual(expect.stringContaining("Error: given key doesn't exists in database"));
})


//Testing Delete function
test('Deleting a key value pair', () => {
    expect(cru.Delete("Hello"))
        .toEqual(expect.stringContaining("Hello is deleted successfully"));
})