const fs = require('fs');
var filename = 'data.json';
let datastore = {};// JSON object to store key value pairs
class CRU {
    constructor(userfilename = 'data.json') {
        filename = userfilename;
    }
    create(key, value) {
        if (datastore[key]) {
            console.log("Error: the key is already exists");
            return "Error: the key is already exists";
        }
        else {
            if (typeof key === 'string' && /[A-Za-z]/.test(key)) {
                let countpairs = Object.keys(datastore).length;
                if (countpairs < 1024 * 1024 * 1024 * 1024 && value <= 16 * 1024 * 1024) { // Constraints for file size less than 1GB and JSON value less than 16kb
                    let dateobject = new Date();
                    let time =dateobject.getMinutes()*60 + dateobject.getSeconds();
                    if (key.length <= 32) {
                        datastore[key] = [value,time];
                        console.log(key + " added successfully");
                        let data = JSON.stringify(datastore);
                        fs.writeFileSync(filename,data);
                        return `${key} added successfully`;
                    }
                    else{
                        console.log("Error: length of key should be less than 32 characters");
                        return "Error: length of key should be less than 32 characters";
                    }
                }
                else
                    console.log("Error: memory limit exceeded");
            }
            else{
                console.log('Error: invalid Key value!!! key must contain only alphabets and no special character or number');
                return 'Error: invalid Key value!!! key must contain only alphabets and no special character or number';
            }
        }
    }

    read(key) {
        let rawdata = fs.readFileSync(filename,'utf8');
        let datastore = JSON.parse(rawdata);
        let dateobject = new Date();
        let time_to_live_seconds = 600; // Setting 10 minutes as time-to-live property of the key
        let time = dateobject.getMinutes()*60 + dateobject.getSeconds();
        if (datastore[key] === undefined) {
            console.log("Error: given key doesn't exists in database");
            return "Error: given key doesn't exists in database";
        }
        else if(datastore[key][1]+time_to_live_seconds>=time){ 
            console.log(`${key}:${datastore[key][0]}`);
            return `${key}:${datastore[key][0]}`;
        }
        else if(datastore[key][1]+time_to_live_seconds<time){
            console.log(`Error: time-to-live of ${key} has expired`);
        }
    }

    Delete(key) {
        let rawdata = fs.readFileSync(filename,'utf8');
        let datastore = JSON.parse(rawdata);
        if (datastore[key] === undefined) {
            console.log("Error: given key doesn't exists in database");
        }
        else {
            delete datastore[key];
            let data = JSON.stringify(datastore);
            fs.writeFileSync(filename,data);
            console.log(`${key} is deleted successfully`);
            return `${key} is deleted successfully`;
        }
    }
}

//Exporting the class
module.exports = CRU;