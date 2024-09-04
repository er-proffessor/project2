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

// console.log(__dirname);

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

app.get("/Category-record", async (req, resp) => {

  let data = await category();

  let result = await data.find().toArray();

  resp.json(result);

});

app.post("/user-registration", async (req, resp) => {

  const formData = req.body;

  console.log(formData);


  let data = await users();
  let result = await data.insertOne(formData);
  var msg = { status: "Succes: Welcome to Needit App" };

  resp.json(msg);

  console.log(result);

});

app.post("/get_profile", async (req, resp) => {

  console.log("test api");
  const req_id = req.body.mob_no;
  console.log(req_id);


  let data = await users();
  const result = await data.find({ mob_no: req_id }).toArray();
  console.log(result);

  resp.json(result);

});

app.post("/srch-skilled-rec", async (req, resp) => {
  
  const srchSkill = req.body.skills_id;
  const pincode = req.body.pincode;
  
  let data = await users();

  let result = await data.find({ $and: [ {"skills_id": srchSkill }, {"pincode": pincode} ]}).toArray();

  resp.json(result);

});

app.post("/update-rec", async (req, resp) => {

  const keys = Object.keys(req.body);

  const srchId = req.body[keys[0]];
  console.log(srchId);

  const objectId = ObjectId.isValid(srchId) ? new ObjectId(srchId) : null;

  let data = await users();

  let result = await data.updateOne({ "_id": objectId },
    {
      $set:
      {
        [keys[1]]: req.body[keys[1]],
        [keys[2]]: req.body[keys[2]],
        [keys[3]]: req.body[keys[3]],
        [keys[4]]: req.body[keys[4]],
        [keys[5]]: req.body[keys[5]],
        [keys[6]]: req.body[keys[6]],
        [keys[7]]: req.body[keys[7]],
        [keys[8]]: req.body[keys[8]],
        [keys[9]]: req.body[keys[9]],
        [keys[10]]: req.body[keys[10]],
      }
    });

  resp.json("User details updated");

});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})