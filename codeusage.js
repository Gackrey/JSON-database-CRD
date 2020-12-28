//Importing the CRU library
const CRU = require('./library');

//Instantiating the class with an object
let cru = new CRU();

//Creating 2 key-value pairs
cru.create("Hello",1);
cru.create("Hello",100);
cru.create("World",2);

//Reading the database with key as a parameter
cru.read("Hello");

//Deleting a key-value pair with key as a parameter
cru.Delete("World");

//Checking whether key-value pair is deleted or not
cru.read("World");