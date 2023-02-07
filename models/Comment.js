const mongoose =require("mongoose")

const CommentSchema = new  mongoose.Schema({
    userId:{
        type:String,
    },
    postID:{
        type:String
    },
    commentText:{
        type:String
    }


},
{timestamps:true}


)

module.exports =mongoose.model("Comment",CommentSchema)