const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const UserSchema=new Schema({
    first_name:String,
    last_name:String,
    username:String,
    password:String,
    is_member:Boolean,
})

UserSchema.virtual('full_name').get(function(){
    return this.first_name+' '+this.last_name;
})

const User=mongoose.model('User',UserSchema);
module.exports=User;