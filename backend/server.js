const express = require("express");

require('dotenv').config();
const connectDB=require('./config/db')
const User =require('./routes/User')
const crud = require('./models/crudSchema')


const app = express()
app.use(express.json())
connectDB();
//get add users

app.post("/crud/add", async (req, res) => {
    const {fullName, email, age,Phone,Description } = req.body;
    const newUser = new crud({
      fullName:req.body.fullName,
      email:req.body.email,
      age:req.body.age,
      Phone:req.body.Phone,
      Description:req.body.Description
    });
    try {
      await newUser.save();
      res.send(newUser);
    } catch (error) {
      res.send("post error");
    }
  });
  //get all users
  app.get("/crud/get", async(req,res)=> {
  try {
      const users = await crud.find()
      res.send(users)
  } catch (error) {
      res.send("get error")
  }
  })
  //Edit user by id
  app.put("/crud/update/:id", async (req, res) => {
      try {
        let editedUser = await crud.findByIdAndUpdate(
          req.params.id,
          { ...req.body },
          { new: true }
        );
        res.send(editedUser);
      } catch (error) {
        res.send("update user error");
      }
    });
    //Delete user by id
    app.delete("/crud/delete/:id", async(req,res) => {
  try {
      await crud.findByIdAndDelete(req.params.id)
      res.send("delete succesfuly")
      
  } catch (error) {
      res.send("delete error")
      
  }
  
  
    })



app.use('/user', User)
const PORT = process.env.PORT || 5000;
app.listen(PORT,err=>err ? console.error(err) : console.log(`server run on  port ${PORT}`))