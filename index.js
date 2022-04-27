const express = require('express');
const mongoose = require('mongoose');
const FriendModel = require('./models/Friends');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());
//DATABASE CONNECTION

mongoose.connect(
    "mongodb://localhost:27017/tutorialmern?readPreference=primary&appname=MongoDB%20Compass&ssl=false",
{useNewUrlParser:true}
).then(()=>{
    console.log("connected to database");
});


app.post('/addFriend',async(req,res)=>{
    const name = req.body.name;
    const age = req.body.age;

    const friend = new FriendModel({name:name,age:age});
    await friend.save();
    res.send('success');
});

app.get('/read',async (req,res)=>{
   FriendModel.find({},(err,result)=>{
       if(err)res.send(err);
       else res.send(result);
   })
});

app.put('/update',(req,res) => {
    const newAge = req.body.newAge;
    const id = req.body.id;
    try{
      FriendModel.findById(id,(err,friendToUpdate)=>{
          friendToUpdate.age = Number(newAge);
          friendToUpdate.save();
      })
    }catch(err)
    {
        console.log(err);
    }
    res.send("updated");
});
app.delete('/delete/:id',async(req,res)=>{
    const id = req.params.id;
    await FriendModel.findByIdAndRemove(id).exec();
    res.send("deleted successfully");
})

app.listen(process.env.PORT,()=>{
    console.log("listning to the port at 3001");
})