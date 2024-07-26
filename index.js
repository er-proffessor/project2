const express = require('express')
const app = express()
const port = 3000
const path = require('path');

// console.log(__dirname);

const req_path = path.join(__dirname + '/public');
console.log(req_path);

app.use(express.static(path.join(__dirname, 'public')));

// app.use(express.static(__dirname + 'public'));

// console.log(__dirname);

// app.get('/', (req, res) => {
//   res.json({ "message": "Hello World. This start testing here" })
// })

app.get('/home', (req, resp) => {

  resp.sendFile(path.join(__dirname, 'public', 'dashboard.html'));

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})