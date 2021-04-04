require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex')

const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
});

const app = express();
const port = process.env.PORT;

//middleware
app.use(bodyParser.json());
app.use(cors());

//routes
app.get('/', (req, res) => { res.send('success') });

//signin --> POST = success/fail
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)});

//register --> user
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

//profile/:userID --> GET = user
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })

//image --> PUT --> user
app.put('/image', (req, res) => { image.handleImage(req, res, db)})

//imageUrl api call --> POST
app.post('/imageUrl', (req, res) => { image.handleApiCall(req, res)})

app.listen(port || 3000, () => {
  console.log(`app is running on port ${port}`);
})