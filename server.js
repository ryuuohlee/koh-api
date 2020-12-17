const express = require('express');
const bodyParser = require('body-parser');


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
  if(req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
    res.json('success');
  }
  else {
    res.status(400).json('error loggin in')
  }
})

//signin --> POST = success/fail
app.post('/signin', (req,res) => {
  res.send('signing')
})

//register --> user
//profile/:userID --> GET = user
//image --> PUT --> user

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
})