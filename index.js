const express = require('express')
const app = express()
const mongoose=require('mongoose')
const dotenv=require("dotenv")
const cors=require("cors")
app.use(cors())
dotenv.config()
app.use(express.json())
mongoose.set("strictQuery",true)
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Server Connected to MongoDB");
})

const authRoute=require("./routes/auth")
const postRoute= require("./routes/post")
const userRoute=require("./routes/user")






app.use("/api/auth",authRoute);
app.use("/api/post",postRoute)
app.use("/api/user",userRoute)













app.all('/', (req, res) => {
    res.send('Yo!')
})



app.listen(process.env.PORT || 5000,(req,res)=>{
    console.log("Server Connected");
})