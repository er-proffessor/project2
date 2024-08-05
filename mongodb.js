const {MongoClient} = require('mongodb');
const url = 'mongodb+srv://piyushshrivastava456:Piyush-9785@needit-project.jp2vnyx.mongodb.net/';
// const url = 'mongodb+srv://piyushshrivastava456:Piyush@9785@needit.ckxhfjc.mongodb.net/Needit_App?retryWrites=true&w=majority';

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://piyushshrivastava456:Piyush@9785@Project0.mongodb.net/?retryWrites=true&w=majority&appName=Needit";
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

const options = {
    
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000, // Increased timeout to 10 seconds
    socketTimeoutMS: 45000, // Optional: Set socket timeout (default is 360000)
    connectTimeoutMS: 30000, // Optional: Set connection timeout (default is 30000)
    family: 4 // Optional: Use IPv4, skip trying IPv6
  };

const client = new MongoClient(url, options);
const databaseName = 'Needit_App';

async function dbConnect1(){
    let result = await client.connect();
    let db = result.db(databaseName);
    
    return users = db.collection('User_Master');
    
};

module.exports = dbConnect1;

