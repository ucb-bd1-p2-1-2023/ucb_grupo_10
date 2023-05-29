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
app.post('/Travel/add',(req,res)=>{
  const body = req.body;
  const query = `Insert into viaje(conductor_id, pasajero_id, coche_id , latitud_init ,longitud_init, latitud_final ,longitud_final ,fecha_inicial, fecha_final , tarifa) Values(${body.conductor_id},${body.pasajero_id},${body.coche_id},${body.lat_init},${body.lng_init},${body.lat_end},${body.lng_end},'${body.fecha_init}','${body.fecha_end}',${body.tarifa});`
  connection.query(query,(err,rows)=>{
    if(err){
      console.log(err);
    }
    console.log("Viaje Registrado");
  })
})
app.post('/Payment/add',(req,res)=>{
  const body= req.body;
  const query = `Insert into pago(usuario_id,metodo_id,viaje_id,conductor_id,total) Values (${body.pasajero_id},${body.metodo_id},${body.viaje_id},${body.conductor_id}, ${body.total});`
  connection.query(query,(err,rows)=>{
    if(err){
      console.log(err);
    }
    console.log("Pago Registrado");
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
app.get('/Drive/get',(req,res)=>{
  const query = `select c.id as id,con.user_name as conductor_name, c.marca as Marca, c.capacidad as asientos FROM coche c INNER JOIN conductor con on c.conductor_id=con.id`
  connection.query(query,(err,rows)=>{
    if(err){
      console.log(err)
    }
    res.send(rows)
  })
})
app.get(`/drive/getDriver`,(req,res)=>{
  const coche_id = req.query.id;
  const query = `SELECT conductor_id as id FROM coche where id = ${coche_id}`
  connection.query(query,(err,rows)=>{
    if(err){
      console.log(err)
    }
    res.send(rows)
  })
})
app.get(`/User/get`,(req,res)=>{
  const name = req.query.name;
  const query = `Select * from usuario where user_name = '${name}';`;
  connection.query(query,(err,rows)=>{
    res.send(rows);
  })
})
app.get('/Travels/getAll',(req,res)=>{
  const query = `SELECT * FROM viaje`
  connection.query(query,(err,rows)=>{
    if(err){
      console.log(err)
    }
    res.send(rows)
  })
})

app.get('/Travels/get',(req,res)=>{
  const id = req.query.id;
  const query =`Select * from viaje where id = ${id}`
  connection.query(query,(err,rows)=>{
    if(err){
      console.log(err)
    }
    res.send(rows)
  })
})
app.get('/Payment/method/getAll',(req,res)=>{
  const query=`Select * from metodo_pago`;
  connection.query(query,(err,rows)=>{
    if(err){
      console.log(err)
    }
    res.send(rows)
  })
})
app.get('/Payment/method/get',(req,res)=>{
  const name = req.query.name;
  const query = ` Select * from metodo_pago where nombre = '${name}'`
  connection.query(query,(err,rows)=>{
    if(err){
      console.log(err)
    }
    res.send(rows)
  })
})
app.get('/Payments/getAll',(req,res)=>{
  const query=`Select pago.id,usuario_id,conductor_id,viaje_id,metodo_id,nombre,total from pago inner JOIN metodo_pago on pago.metodo_id=metodo_pago.id;`;
  connection.query(query,(err,rows)=>{
    if(err){
      console.log(err)
    }
    res.send(rows)
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