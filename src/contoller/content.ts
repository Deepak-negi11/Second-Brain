import  mongoose  from "mongoose";
import { Content } from "../model/Content";
import express, {Request,Response,NextFunction} from 'express'


interface ContentData {
    type : {
        enum:'documents'|'tweet'|'youtube'|'link',
        required:true
        
    },
    link:'url',
    title:String,
}



export const createContent = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {link ,type,title}: ContentData = req.body
        const {id} = req.body;

       const Data = new Content({
        link,type,title
        
      })
     await Data.save()
       res.status(201).json({
        message:"Data created successfully"
       })
    }catch(error){
        message:"server failed"
        console.log(error)
    }
}

export const DeleteContent = async (req:Request,res:Response,next:NextFunction)=>{
    try{
       const {id} = req.params;
       if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            message:'Invalid Id'
        })

       }
        const deletedata  = await Content.findOneAndDelete({ _id: id });
       if(!deletedata){
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