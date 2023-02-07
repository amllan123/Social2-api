const router = require("express").Router();
const User=require("../models/User")

//update user

router.put('/:id',async(req,res)=>{
      if(req.body.userId === req.params.id){
           try {
               const user= await User.findByIdAndUpdate(req.params.id,{
                $set:req.body,
               })
               res.status(200).json("Account Updated")


           } catch (error) {
            
           }    



      }
      else{
        return res.status(403).json("You can update only your account")
      }


})


//delete useer

router.delete('/:id',async(req,res)=>{
    if(req.body.userId === req.params.id){
        try {
         
            await User.deleteOne({_id:req.params.id})
            res.status(202).json("Accout deleted successfully")



        } catch (error) {
         
        }    



   }
   else{
     return res.status(403).json("You can delete only your account")
   }



})


//find user

router.get("/:id",async (req,res)=>{
  try {
     const user= await User.findOne({_id:req.params.id});
    
    if(!user)
    res.status(404).json("Use not found")
   else{
    const {password, ...others}=user._doc
    res.status(200).json(others);
  }} catch (error) {
    
  }
   
   



})


// follow user
 router.put("/:id/follow",async(req,res)=>{
    
       if(req.body.userId !== req.params.id){

        try {
            const user =await User.findById(req.params.id)
            const Currentuser= await User.findById(req.body.userId)

            if(!Currentuser.following.includes(req.params.id)){
                await user.updateOne({$push:{followers:req.body.userId}})
                await Currentuser.updateOne({$push:{following:req.params.id}})
                res.status(202).json("you follow the user")
            }
            else{
                res.status(403).json("You already follow the user")
            }


          
        } catch (error) {
          console.log(error);
        }

       }
       else{
          res.status(403).json("You cant follow youself")

       }


 })

 // unfollow user

 router.put("/:id/unfollow",async(req,res)=>{
    
  if(req.body.userId !== req.params.id){

   try {
       const user =await User.findById(req.params.id)
       const Currentuser= await User.findById(req.body.userId)

       if(Currentuser.following.includes(req.params.id)){
           await user.updateOne({$pull:{followers:req.body.userId}})
           await Currentuser.updateOne({$pull:{following:req.params.id}})
           res.status(202).json("you unfollow the user")
       }
       else{
           res.status(403).json("You already unfollow the user")
       }


     
   } catch (error) {
     console.log(error);
   }

  }
  else{
     res.status(403).json("You cant unfollow youself")

  }


})





module.exports= router