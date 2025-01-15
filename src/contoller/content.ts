import  mongoose, { Error, ObjectId , Types }  from "mongoose";
import { Content ,ContentSchema} from "../model/Content";
import express, {Request,Response,NextFunction} from 'express'
import { Link } from "../model/Link";
import { secure } from "../secure";

interface ContentSchema{
    type : {
        enum:'documents'|'tweet'|'youtube'|'link',
        required:true
        
    },
    link:'url',
    title:String,
    userId:Types.ObjectId
}

export const createContent = async(req:Request,res:Response,next:NextFunction):Promise<void> =>{
    try{
        const {link ,type,title,userId}: ContentSchema= req.body
        const Data = new Content({
        link,type,title ,userId
        
      })
     await Data.save()
       res.status(201).json({
        message:"Data created successfully"
       })
    }catch(error) {
        console.log( "Content can't be created",error)
        next()
    }
}

export const deleteContent = async(req:Request,res:Response,next:NextFunction)=>{
    try{
       const id = req.params.id;
       if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            message:'Invalid Id'
        })

       }
        const deleteContent = await Content.findOneAndDelete({ _id: id });
       if(!deleteContent){
        return res.status(400).json({
            message :"cant delete data"
        })
        }
        res.status(200).json({
           message:"deleted successfully"
        })
    }catch(error){
       console.error(error);
       res.status(500).json({
        message:"internal server error",
       })
    }
}
export const Share = async(req: Request,res: Response, next:NextFunction)=>{
    try{
       const {hash ,userId } = req.body;
       const Share = new Link({
            hash : secure,
             userId
          })
       Share.save()
       if(!Share){
           res.status(400).json({
              message:"data can't be saved" })
        
        }

    }catch(error){

    }
}

export const ShareLink = async(req:Request,res:Response,next:NextFunction)=>{
   try{
    const hash = req.params
     const link = await Link.findOne({
        hash
     })
    if(!link){
        return res.status(400).json({
            message:"hash not found"
        })
    }
    const content = await Content.find({
        userId: link.userId
    })
    
   }catch(error:any){
     res.status(500).json({
        message:"Server Crash",
        error:error.message
     })
   }
}