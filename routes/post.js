const router = require("express").Router();
const Post=require("../models/Post")
const User=require("../models/User")
const Comment= require("../models/Comment")
router.post("/",async(req,res)=>{
    const newPost=new Post(req.body)
    try {
        const savedPost=await newPost.save()
        res.status(201).json(savedPost)

    } catch (error) {
        res.status(500).json(error)
    }
                                                
})

//delete a post 
router.delete("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      console.log(post.userId,"  ",req.body.userId);
      if (post.userId === req.body.userId) {
        await post.deleteOne();
        res.status(200).json("the post has been deleted");
      } else {
        res.status(403).json("you can delete only your post");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  //like / dislike a post
  
  router.put("/:id/like", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post.likes.includes(req.body.userId)) {
        await post.updateOne({ $push: { likes: req.body.userId } });
        res.status(200).json("The post has been liked");
      } else {
        await post.updateOne({ $pull: { likes: req.body.userId } });
        res.status(200).json("The post has been disliked");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  //get a post
  
  router.get("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //get timeline posts
  
  router.get("/timeline/:userId", async (req, res) => {
    try {
      const currentUser = await User.findById(req.params.userId);
      const userPosts = await Post.find({ userId: currentUser._id });
      const friendPosts = await Promise.all(
        currentUser.following.map((friendId) => {
          return Post.find({ userId: friendId });
        })
      );
      res.json(userPosts.concat(...friendPosts))
    } catch (err) {
      res.status(500).json(err);
    }
  });


//post a comment

router.post("/comment",async (req, res)=>{
    const newComment= new Comment({
        userId:req.body.userId,
        postID:req.body.postID,
        commentText:req.body.commentText
    })

    try {
        const savedComment=await newComment.save();
        const post = await Post.findById(req.body.postID)
        await post.updateOne({$push:{comments:savedComment._id}})
        res.status(201).json(savedComment)
        
    }
     catch (error) {
        res.status(500).json(error)
    }
    
})

// get comments

router.get("/comment/:postId",async(req,res)=>{
    const com=await Comment.find({postID:req.params.postId})
    res.status(200).json(com)



})

// get all the post of user

router.get("/allpost/:id", async(req,res)=>{

  try {
       const posts= await  Post. find({userId:req.params.id})
       res.status(200).json(posts)

  } catch (error) {
    
    res.status(500).json(error)
  }



})




module.exports = router