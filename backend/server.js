require("dotenv").config()
const express = require('express')
const app = express()
const cors =require("cors")
const cookieParser=require("cookie-parser")
const dbConnect=require("./db")
const userRouter=require("./Routes/users.routes")
const authRouter=require("./Routes/auth.routes")
const blogRouter=require("./Routes/blog.routes")
app.use(express.urlencoded({extended: true}))
app.use(express.json())
const corsConfig={
    origin:['http://localhost:8080','*'],
    allowedHeaders:['Content-Type','Authorization','x-csrf-token'],
    credentials:true,
    exposedHeaders:['*','Authorization']
}
app.use(cors(corsConfig))
app.use(cookieParser())
dbConnect()
app.get('/', (req, res) => res.send('hello'))
app.use('/auth',authRouter)
app.use('/user',userRouter)
app.use('/blog',blogRouter)

app.listen(8080, () => {console.log('server started on port 8080')})