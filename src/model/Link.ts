import mongoose, {Schema , model , Types}from "mongoose"
import { User } from "./userdb"

const LinkSchema = new Schema({
    hash :String,
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true },
    id:Types.ObjectId
})

LinkSchema.pre('save',async function(next){
    const user = await User.findOne(this.userId);
    if(!user){
        throw new Error ("User does not exist")
    }
    next()
})

export const  Link = model("link",LinkSchema)