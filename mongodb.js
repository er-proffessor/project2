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

async function dbConnect3(){
    let result = await client.connect();
    let db = result.db(databaseName);

    return users = db.collection('Payment_req');
}

async function dbConnect4(){
    let result = await client.connect();
    let db = result.db(databaseName);

    return emitra_file = db.collection('emitra_serv');
}

module.exports = {dbConnect1, dbConnect2, dbConnect3, dbConnect4};

