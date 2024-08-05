const {MongoClient} = require('mongodb');
const url = 'mongodb+srv://piyushshrivastava456:Piyush-9785@needit-project.jp2vnyx.mongodb.net/';


const client = new MongoClient(url);
const databaseName = 'Needit_App';

async function dbConnect1(){
    let result = await client.connect();
    let db = result.db(databaseName);
    
    return users = db.collection('User_Master');
    
};

async function dbConnect2(){
    let result = await client.connect();
    let db = result.db(databaseName);
    
    return users = db.collection('Categories');
    
};

module.exports = {dbConnect1, dbConnect2};

