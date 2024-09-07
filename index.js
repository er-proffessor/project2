const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const users = require('./mongodb').dbConnect1;
const category = require('./mongodb').dbConnect2;
const { ObjectId } = require('mongodb');

// const { injectSpeedInsights } = require('@vercel/speed-insights');

// injectSpeedInsights();

// console.log(__dirname);

const req_path = path.join(__dirname + '/public');
console.log(req_path);

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.json({ "message": "Hello World. This start testing here" })
})

app.get('/home', (req, resp) => {

  resp.sendFile(path.join(__dirname, 'public', 'dashboard.html'));

});

app.get('/usermgmt', (req, resp) => {

  resp.sendFile(path.join(__dirname, 'public', 'user_management.html'));

});

app.get("/record", async (req, resp) => {

  let data = await users();

  let result = await data.find().toArray();

  resp.json(result);

});

app.get("/limited_record", async (req, resp) => {

  let data = await users();

  let arr = await data.find().toArray();
 
  let result = [];
  for(let i=0; i<20; i++){

    result.push(arr[i]);
  
  }

  resp.json(result);

});

app.get("/Category-record", async (req, resp) => {

  let data = await category();

  let result = await data.find().toArray();

  resp.json(result);

});

app.post("/user-registration", async (req, resp) => {

  const formData = req.body;

  let data = await users();
  let result = await data.insertOne(formData);
  var msg = { status: "Succes: Welcome to Needit App" };

  resp.json(msg);
});

app.post("/get_profile", async (req, resp) => {

  const req_id = req.body.mob_no;

  let data = await users();
  const result = await data.find({ mob_no: req_id }).toArray();
  console.log(result);


  resp.json(result);

});

app.post("/srch-skilled-rec", async (req, resp) => {

  const srchSkill = req.body.skills_id;
  const pincode_val = req.body.pincode;

  let data = await users();

  if (!pincode_val) {

    let result = await data.find(req.body).toArray();
    resp.json(result);

  }
  else {
    
    let arr = await data.find({ "skills_id": srchSkill }).toArray();

    const keys = Object.keys(arr);
  
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[keys[i]].pincode != pincode_val) {

          let temp = arr[keys[i]];
          arr[keys[i]] = arr[keys[j]];
          arr[keys[j]] = temp;
        }
      }
    }
      resp.json(arr);

  }
});

app.post("/update_record", async (req, resp) => {

    const { filter , updates } = req.body;

    const objectId2 = new ObjectId(filter._id);

    let data = await users();

    let result = await data.updateOne( {"_id": objectId2 }, { $set: updates });

    resp.json(result);

});


app.get("/version_control", async (req, resp) => {

    const result = {"version" : "1",
                    "mandatory" : false
                  };
    
    resp.json(result);

});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})