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

//POSTS
app.post('/user/add',(req, res) => {
  const body = req.body;
  const query = `INSERT INTO usuario(user_name, email, user_password, telefono, ciudad,fecha_creacion) VALUES ('${body.user_name}', '${body.email}','${body.user_password}','${body.telefono}','${body.ciudad}','${body.fecha_creacion}');`;
  connection.query( query, (err, rows, fields) => {
    if (err) throw err
    console.log('Usuario Registrado');
  })
  res.send('Usuario Registrado');
})

app.post('/driver/add',(req, res) => {
  const body = req.body;
  const query = `INSERT INTO conductor(user_name, email, user_password, ciudad,telefono,fecha_creacion) VALUES ('${body.user_name}', '${body.email}','${body.user_password}','${body.ciudad}','${body.telefono}','${body.fecha_creacion}');`;
  connection.query( query, (err, rows, fields) => {
    if (err) throw err
    console.log('Conductor Registrado');
  })
  res.send('Conductor Registrado');
})
app.post('/drive/add',(req, res) => {
  const body = req.body;
  const query = `INSERT INTO coche(conductor_id,placa,marca,modelo,capacidad) VALUES (${body.conductor_id},'${body.placa}','${body.marca}','${body.modelo}',${body.capacidad});`
  connection.query(query,(err,rows)=>{
    if(err){
      console.log(err);
    }else{
      console.log('Coche registrado');
    }
  })
})


//
app.listen(port, () => {
  console.log(`Project sample is running on: ${port}`)
})

//GETS
app.get("/getUsers", (req, res) => {
  const query = `SELECT * FROM usuario`;
  connection.query(query,(err,rows) => {
    console.log(rows);
    res.send( rows);
  })
});
app.get("/getDrivers", (req, res) => {
  const query = `SELECT * FROM conductor`;
  connection.query(query,(err,rows) => {
    console.log(rows);
    res.send( rows);
  })
});
app.get('/getDriver', (req, res) => {
  const name = req.query.driver_name;
  const query = `SELECT * FROM conductor where user_name = '${name}'`
  connection.query(query,(err,rows)=>{
    console.log(rows);
    res.send( rows);
  })
})
app.get('/getDrivesWithDriver',(req, res) => {
  const query =`SELECT ch.id,user_name as conductors_name,c.id as conductors_id,placa,UPPER(marca) as marca,modelo,capacidad From conductor c inner Join coche ch on c.id=ch.conductor_id`;
  connection.query(query,(err,rows)=>{
    if(err){
      console.log(err);
    }
    res.send(rows);
  })
})

const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'proyecto',
  password: 'proyecto_final',
  database: 'proyecto_final'
})

connection.connect();