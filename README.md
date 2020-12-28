# JSON database CRD
A file-based key-value store library that support the basic CRD(create, read and delete) operations. 

## Usage of CRU library

1. Initialing the class
    ```
   const CRU = require('./library');

    // to use default JSON file i.e data.json
   let cru = new CRU();

    // to use any JSON file
   let cru = new CRU('newdata.json'); 
   ```
2. Creating a key-value data
    ```
    cru.create(key, value); //key is always a string
    ```
3. Reading a key-value data
    ```
    cru.read(key)  // Key can be read within 10 minutes of its creation
    ```
4. Deleting a key-value data
    ```
    cru.Delete(key)
    ```

## Requirements for JSON data file

 * Size of file should not exceed 1Gb
 * JSON value less than 16kb
 * Key should be a string

## Running Tests

### 1. Install Node.js

You need to have npm installed in your computer for this problem. It comes with Node.js and you can get it by installing Node from https://nodejs.org/en/

### 2. Install dependencies

Run `npm install` to install all dependencies.

### 3. Run test cases on CRU library

Run `npm test` to run all the test cases.