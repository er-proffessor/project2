const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const users = require('./mongodb').dbConnect1;
const category = require('./mongodb').dbConnect2;
const { ObjectId } = require('mongodb');

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

  const filter = {
    "registered": true,
    "serv_provider": true,
    "is_active": "Y"
  };

  let data = await users();

  let result = await data.find(filter).toArray();

  resp.json(result);

});

app.get("/limited_record", async (req, resp) => {

  const filter = {
    "registered": true,
    "serv_provider": true,
    "is_active": "Y"
  };

  let data = await users();

  let arr = await data.find(filter).toArray();

  let result = [];
  for (let i = 0; i < 20; i++) {

    if (arr[i]) {

      result.push(arr[i]);
    }

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
  console.log(formData.mob_no);
  console.log(formData.referenced_user);


  let data = await users();
  let check_user = await data.find({ mob_no: formData.mob_no }).toArray();

  console.log(check_user);

  if (check_user.length > 0) {
    console.log("Already User");
    resp.json("Already Existing User in record");
  }
  else {
    console.log("New User");
    let result = await data.insertOne(formData);
    var msg = { status: "Succes: Welcome to Needit App" };
    resp.json(msg);
  }

});

app.post("/count_update", async (req, resp) => {

  const formData = req.body;

  let data = await users();

  let result1 = await data.updateOne({ mob_no: formData.mob_no }, { $set: { registered: formData.registered, is_active: "Y" } });

  let result2 = await data.updateOne({ mob_no: formData.referenced_user }, { $inc: { total_count: 50 } });

  let msg = { status: "User registered successfully"};
  
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

  const filter = {
    "registered": true,
    "serv_provider": true,
    "is_active": "Y"
  };
  const srchData = {
    "skills_id": req.body.skills_id
  }

  console.log(srchData.skills_id);

  console.log("srchData:", srchData);
  console.log("filter:", filter);


  let data = await users();

  const pincode_val = req.body.pincode;

  if (!pincode_val) {
    let result = await data.find({ $and: [srchData, filter] }).toArray();

    console.log("Query result:", result);
    resp.json(result);

  }
  else {

    let arr = await data.find({ $and: [srchData, filter] }).toArray();

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

  const { filter, updates } = req.body;

  const objectId2 = new ObjectId(filter._id);

  let data = await users();

  let result = await data.updateOne({ "_id": objectId2 }, { $set: updates });

  resp.json(result);

});


app.get("/version_control", async (req, resp) => {

  const result = {
    "version": "1",
    "mandatory": false
  };

  resp.json(result);

});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})