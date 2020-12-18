const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');


const app = express();
const port = 3000;

//middleware
app.use(bodyParser.json());

const database = {
  users: [
    {
      id: '123',
      name: 'John',
      email: 'john@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Sally',
      email: 'sally@gmail.com',
      password: 'bananas',
      entries: 0,
      joined: new Date()
    }
  ]
}

//routes
app.get('/', (req, res) => {
  res.send(database.users)
})

//signin --> POST = success/fail
app.post('/signin', (req, res) => {
  if(req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
    res.json('success');
  }
  else {
    res.status(400).json('error loggin in')
  }
})

//register --> user
app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
  database.users.push({
    id: '125',
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  })
  res.json(database.users[database.users.length - 1])
})

//profile/:userID --> GET = user
app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found =  false;
  database.users.forEach(user =>  {
    if(user.id === id) {
      found = true;
      return res.json(user);
    }
  })
  if(!found) {
    res.status(404).json('no such user');
  }
})

//image --> PUT --> user
app.post('/image', (req, res) => {
  const { id } = req.body;
  let found =  false;
  database.users.forEach(user =>  {
    if(user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  })
  if(!found) {
    res.status(404).json('no such user');
  }
})

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
})