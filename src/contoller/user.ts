import express, { Request, Response,NextFunction} from "express";
import mongoose ,{ Types } from "mongoose";
import { User } from "../model/userdb";  
import { z } from "zod";
import { hashPassword,comparePasswords } from "../middleware/auth";
import { Error } from "mongoose";


const app = express();
app.use(express.json()); /// Middleware to parse JSON

// Define signup schema using zod
const signupSchema = z.object({
  username: z.string().min(6).max(49),
  password: z.string().min(12).max(29).regex(/[A-Z]/).regex(/[0-9]/),
  email: z.string().email("invalid email"),
  confirmPassword : z.string(),
}).refine((data)=> data.password == data.confirmPassword ,{
  message:"Password does not match",
  path:["confrimPassword"]
})

const signinSchema = z.object({
  password: z.string().min(12).max(29).regex(/[A-Z]/).regex(/[0-9]/),
  email: z.string().email(),
  confirmPassword :z.string(),
}).refine((data)=> data.password == data.confirmPassword ,{
  message:"Password does not match",
  path:["confrimPassword"]
}) 


type SignupData = z.infer<typeof signupSchema>
// Signup controller or handler

export const signupcontroller = async(req:Request,res:Response,next:NextFunction)=>{
  try{
      const SignupParse= signupSchema.safeParse(req.body);
      if(!SignupParse.success){
        return res.status(411).json({
            message :"Incorrect Input",
            error:SignupParse.error.errors
        })
       }
        const {username ,password,email}:SignupData = req.body;
        const user = await User.findOne({
          email,
          password
        })
        if(user){
        res.status(400).json({
            message:"User already Exict"
        })
        }
        const hashedPassword = await hashPassword(password);
        await User.create({
        username,
        password :hashedPassword,
        email
        })
        res.status(201).json({
        message:"User Created Successfully",

        })
    }catch(e:any){
      res.status(500).json({
        message: "Server Crash",
        error: e.message

      })
      next()
    }
} 

type SigninData = z.infer<typeof signinSchema>
export const signincontroller = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const SigninParse= signinSchema.safeParse(req.body);
        if(!SigninParse.success){
          return res.status(411).json({
              message :"Incorrect Input",
              error: SigninParse.error.errors
          })
         }
          const { password , email ,confirmPassword}:SigninData = req.body
          const user = await User.findOne({
               $or : [{email}]
          })
          if(!user){
           return res.status(400).json({
              message:"User does not exist",
              
          })
          }
          const IsPasswordValid = await comparePasswords(password, user.password as string)
          if(!IsPasswordValid){
             res.status(401).json({
                 message:"Incorrect Password",
         
              }) 
           }
           

          req.session.userid = user._id
          req.session.loggedIn = true;

          const userResponse = {
            id: user._id,
            email: user.email,
          };
          
          res.status(201).json({
            message:"User signed in",
            user:userResponse
          })
     console.log(userResponse)
      }catch(e:any){
        res.status(500).json({
          message: "Sersver Crash",
          err: e.message
  
         })
      }
  }
 
  export const updateUser  = async (req:Request, res:Response, next:NextFunction)=>{
    try{
      //so it means that id will contain id and ..updatedata will contain all other data that is been updated
      const {id , ...updateData} = req.body;\
          if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
          }
      const UpdateUser = await User.findByIdAndUpdate(id ,updateData);
      if(!UpdateUser){
           res.status(400).json({
            message:"User not found " })
           res.status(200).json({
            message:"User Updated Successfully" })

      }

    }catch(error:Error){
      console.error(error)
      res.status(500).json({
        message:"Server Failed",
        error : error.message || "Internal Server Error"
      })
    }
    }
  
export const DeleteUser = async (req: Request, res: Response, next: NextFunction)=>{
  try{
      const {id} = req.params;
      if(!mongoose.Types.ObjectId.isValid(id)){
     res.status(400).json({
         message:"Invalid id "})
     }
      const DeleteUser = await User.findByIdAndDelete(id);
     if(DeleteUser){
         res.status(400).json({
          message:"User can't Be Deleted"  })
     }
     res.status(200).json({
        message:"User Deleted Successfully " }) 
  }catch(error:Error){
    console.error("Server Error",error)
    res.status(500).json({
      Success:false,
      error:error.message
    })
  }
}