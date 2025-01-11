import express from"express";
import dotenv from "dotenv"
import  cors from "cors"
import session from "express-session"


dotenv.config()
const app = express()
app.use(express.json())

app.use(session({
    secret : process.env.SESSION_SECRET || 'Yoursecret',
    resave : false,
    saveUninitialized : false,
    cookie:{
        httpOnly:true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24*60*60*1000
    }
}))
console.log(process.env.mongo_URI)
console.log(process.env.PORT)


app.listen(()=>{
    console.log("Server is Running in", process.env.PORT)
})