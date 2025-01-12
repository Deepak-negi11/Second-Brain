import mongoose, {Schema ,model ,Types} from "mongoose";
export const TagsSchema = new Schema ({
    id:Types.ObjectId,
    title:String
})

export const Tags = model('Tags',TagsSchema)