import  mongoose, { ObjectId , Types }  from "mongoose";
import { Content } from "../model/Content";
import express, {Request,Response,NextFunction} from 'express'


interface ConetntSchema{
    type : {
        enum:'documents'|'tweet'|'youtube'|'link',
        required:true
        
    },
    link:'url',
    title:String,
    id:Types.ObjectId
}

export const createContent = async(req:Request,res:Response,next:NextFunction):Promise<void> =>{
    try{
        const {link ,type,title,id}: ConetntSchema= req.body
        const Data = new Content({
        link,type,title ,id
        
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