const express = require("express");
const mongoose = require("mongoose");
const User = require("./model/userModel");
const app = express();
var cors = require("cors");

app.use(cors());

app.use(express.json());

app.get(`/user/:id`, async (request, response) => {
  try {
    const { id } = request.params;
    const user = await User.findById(id);
    response.status(200).json(user);
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: error.message });
  }
});

app.post(`/register`, async (request, response) => {
  try {
    const user = await User.create(request.body);
    response.status(200).json(user);
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: error.message });
  }
});

// run with nodemon - npm run server
mongoose
  .connect("mongodb+srv://urosdelic:uros7@cluster0.f8dyaqe.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    app.listen(5000, () => {
      console.log("server is runing on port 5000");
    });
    console.log("mongoDB connected");
  })
  .catch((err) => console.log("mongoDB connection failed"));
