const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const { DATABASE_URL, DATABASE_HOST, DATABASE_USER, DATABASE_PW, DATABASE_DB } = process.env;
const knex = require('knex')({
    client: 'pg',
    connection: {
      connectionString : DATABASE_URL,
      host : DATABASE_HOST,
      port : 5432,
      user : DATABASE_USER,
      password : DATABASE_PW,
      database : DATABASE_DB
    }
  });

import { handleRegister } from "./controllers/register.js";
import { handleSignin } from "./controllers/signin.js";
import { handleProfileGet } from "./controllers/profile.js";
import { handleImage, handleApiCall } from "./controllers/image.js";

const app = express();

// const PORT = process.env.PORT;



app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('success');
})

app.post('/signin', handleSignin(knex, bcrypt))

app.post('/register', (req, res) => {handleRegister(req, res, knex, bcrypt)})

app.get('/profile/:id', (req, res) => {handleProfileGet(req, res, knex)})

app.put('/image', (req, res) => {handleImage(req, res, knex)})

app.post('/imageurl', (req, res) => {handleApiCall(req, res)})

app.listen(3000, () => {
    console.log('app is running on port 3000');
});