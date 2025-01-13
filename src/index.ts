import dotenv from "dotenv"
import  cors from "cors"
import session from "express-session"
import connectDB from "./connect";
import indexRouter from "./routes/router"
import express , { Request , Response , NextFunction} from "express"

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}));



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

// so this line means every router will start from /api from now 
app.use('/api', indexRouter);

// why i used this what if the uper middle fail for that reason the middleware is return
app.use((err:Error, req:Request, res:Response, next:NextFunction) => {
    console.error(err.stack);
    res.status(500).json({
        message: "Something went wrong!"
    });
});
 const PORT  = process.env.PORT
// connnecting it to database 
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("🚀Server listening on port🚀", PORT);
    });
}).catch(err => {
    console.error("Failed to connect to database:", err);
    process.exit(1);
});
