const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FriendSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:false
    }
})

const FriendModel = mongoose.model('friends',FriendSchema);

module.exports = FriendModel;