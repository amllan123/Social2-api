const mongoose=require('mongoose')

const StorySchema= new mongoose.Schema({
    userId:{
        type:String,
        require:true
    },
    storyImg:{
        type:String,
    },
    storyDesc:{
        type:String
    }


},
{timestamps:true}

)

module.exports=mongoose.model("Story",StorySchema)