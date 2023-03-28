require("dotenv").config()
const express = require('express')
const app = express()
const cors =require("cors")
const dbConnect=require("./db")
const userRouter=require("./Routes/users.routes")
const authRouter=require("./Routes/auth.routes")
const blogRouter=require("./Routes/blog.routes")
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
dbConnect()
app.get('/', (req, res) => res.send('hello'))
app.use('/auth',authRouter)
app.use('/user',userRouter)
app.use('/blog',blogRouter)

app.listen(8080, () => {console.log('server started on port 8080')})