const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const users = require('./mongodb');


// console.log(__dirname);

const req_path = path.join(__dirname + '/public');
console.log(req_path);

app.use(express.static(path.join(__dirname, 'public')));


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


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})