const router = require("express").Router();
const Conversation= require('../models/Conversation')
const User = require("../models/User")

//create new conversation

router.post('/',async (req,res)=>{
    const conversation= await Conversation.find({
        $and:[{ members :{ $in :[req.body.senderId] }},{ members :{ $in :[req.body.reciverId] }}]
       
    })

    if (conversation.length !== 0) {
        res.status(200).json(conversation[0])
    }
    else{

    const newConversation= new Conversation({
    members:[req.body.senderId,req.body.reciverId]

    })
    try {
        const savedConversation= await newConversation.save()
        res.status(201).json(savedConversation);
    } catch (error) {
        res.status(500).json(error)
    }
}



})

// get conversation

router.get('/:userId',async(req,res)=>{
    try {
        const conversation= await Conversation.find({
            members :{ $in :[req.params.userId] }
        })
        res.status(200).json(conversation)

    } catch (error) {
        res.status(500).json(error)
    }
})



//get another user data
router.get('/getUser/:id/:currentUser', async(req,res)=>{
    const conversation = await Conversation.findById(req.params.id)
    const friendId= conversation.members.filter((e)=> e !== req.params.currentUser)
    const friendData = await User.findById(friendId[0]);
    res.status(200).json(friendData);



})

module.exports= router