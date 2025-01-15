// import { isAdmin } from "../middleware/auth";
// import {Request , Response , NextFunction} from "express"
// import { User ,IUser} from "../model/userdb";

// export const AdminAuth = [isAdmin,async (req:Request ,res: Response ,next:NextFunction)=>{
//     try{
//      const { id } = req.params;
//      if (!id) {
//         return res.status(400).json({
//           message: "User ID is required",
//         });
//       }
//      const user: IUser | null = await User.findById(id);
//      if(!user){
//            res.status(400).json({
//             message:"User not Found" 
//             })
//        }
//        if(user.role === 'admin'){}
//     }catch(error){
//      res.status(400).json{}
//     }
// }]