const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());

app.use(cors({
  origin: '*'
}));

const port = 3000;


app.get('/', (req, res) => {
  res.send('API is working');
})

app.post('/user',(req, res) => {
  const body = req.body;
  const query = `INSERT INTO conductor(user_name, email, user_password, telefono, ciudad) VALUES ('${body.user_name}', '${body.email}','${body.user_password}',${body.telefono},${body.ciudad});`;
  connection.connect();
  connection.query( query, (err, rows, fields) => {
    if (err) throw err
    console.log('1 record inserted');
  })
  connection.end();
  res.send('1 record inserted');
})

app.listen(port, () => {
  console.log(`Project sample is running on: ${port}`)
})

const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'Mathews%%##31//01##%%',
  database: 'proyecto_final'
})

