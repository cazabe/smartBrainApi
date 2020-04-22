const express = require("express");
const app = express();
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

//coneccion a base de datos
const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "billabong1234",
    database: "smart-brain",
  },
});

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// /root
app.get("/", (req, res) => {
  res.send(database.user);
});

//signin
app.post("/signin",(req,res) =>{signin.handleSignin(req,res,db,bcrypt)} )

//register
//dependenci injection
app.post("/register",(req,res) =>{register.handleRegister(req,res,db,bcrypt)})

//get user with userId
app.get("/profile/:id",(req,res) =>{profile.handleProfileGet(req,res,db)});

// /image --> PUT --> user
app.put("/image",(req,res) =>{image.handleImage(req,res,db)});
//para el input de la imagen y guardar la url de la misma y detectar
app.post("/imageurl",(req,res) =>{image.handleApiCall(req,res)});


app.listen(3000, () => {
  console.log("app on port 3000 running");
});
/*
/signin --> POST = succes/fail
/register --> POST = use
/profile/userId --> GET = user
/image --> PUT --> user
*/
