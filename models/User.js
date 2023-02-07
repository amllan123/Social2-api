const mongoose =require('mongoose')

const UserSchema = new mongoose.Schema({
  username:{
   type:String,
   required:true,
   min:3,
   max:20,
   unique:true
  },
  email:{
    type:String,
    required:true,
    max:50,
    unique:true

  },
  password:{
    type:String,
    required:true,
    min:4
  },
 profilePicture:{
     type:String,
     default:""
 },
 coverPicture:{
    type:String,
    default:""

 },
 followers:{
    type:Array,
    default:[]
 },
 following:{
    type:Array,
    default:[]
 },
 stories:{
    type:Array,
    default:[]
 },

 desc:{
    type:String,
    default:"",
    max:200
 }



},
{timestamps:true}


)

module.exports=mongoose.model("User",UserSchema);