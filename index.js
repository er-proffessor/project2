const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const users = require('./mongodb').dbConnect1;
const category = require('./mongodb').dbConnect2;

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
  var msg = {status:"User Profile Updated Successfully"};

  resp.json(msg);

  console.log(result);

});

app.post("/get_profile", async (req, resp) => {

    console.log("test api");
    const req_id = req.body.mob_no;
    console.log(req_id);

    
    let data = await users();
    const result = await data.find({mob_no: req_id}).toArray();
    console.log(result);

    resp.json(result);

});

app.post("/srch-skilled-rec", async (req, resp) => {
        const srchSkill = req.body.skills_id;
        console.log(srchSkill);

        let data = await users();
        
        let result =await data.find({skills_id: new RegExp(`(^|,\\s*)${srchSkill}(\\s*,|$)`)}).toArray();

        console.log(result);
        resp.json(result);

  });


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})