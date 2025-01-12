import { User } from "./userdb";
import mongoose, { Schema, Document, model, Types } from "mongoose";
import {Tags} from "./Tags"


interface IContentData extends Document {
    type : {
        enum:'documents'|'tweet'|'youtube'|'link',
        required:true
        
    },
    link?: String,
    title: String,
    tags?: Types.ObjectId,
    userId: Types.ObjectId
}
export const ContentSchema:Schema = new Schema({
    type: {
        type: String,
        enum: ["document", "tweet", "youtube", "link"],
        required: true
    },
    title: String,
    link: String,
    tags:[
        {
            type: mongoose.Types.ObjectId ,
        ref:"Tags"
    }],
    userId:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    id:Types.ObjectId
})


export const Content = model<IContentData>("Content",ContentSchema) 

