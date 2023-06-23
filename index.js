const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors()); 
const env=require('dotenv').config();
const connect = require('./db/connect');


const userSchema = new mongoose.Schema({
  id: Number,
  name: String,
  email: String,
  gender: String,
  status: String,
  createdAt: Date,
  updatedAt: Date,
});
const User = mongoose.model('Gold_Stone_User', userSchema);


app.get('/users', async (req, res) => {
  try {
    const response = await axios.get(
      'https://gorest.co.in/public-api/users'
    );

    let users = response.data.data;
      console.log(users);
      const saveUserPromises = users.map(async function (user) {
      const newUser = new User({
        id: user.id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        status: user.status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      await newUser.save();
    });
    await Promise.all(saveUserPromises);
    const users_1 = await User.find();
    console.log(users_1,"useeeeeer1");
    res.send(users_1);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred while fetching and storing data.');
  }
});

app.get('/users/:id', async (req, res) => {
    try {
      const user = await User.findOne({ id: req.params.id });
      if (user) {
        res.send(user);
      } else {
        res.status(404).send('User not found');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error occurred while retrieving user by ID.');
    }
  });

app.get('/', (req, res) => {
    res.send('Hello! Welcome to MicroService1 - where you get all users data & also get specific user data with respective ID');
}); 
const port = process.env.PORT;
connect()
.then(() => {
    app.listen(port, () => {
        console.log(`Server listening on http://localhost:${port}`);
    })
})
.catch((err) => {
    console.log('Server failed')
})
