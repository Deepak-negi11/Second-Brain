import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';

// Hash a password
export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

// Compare password with hashed password
export const comparePasswords = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if(!req.session.loggedIn || !req.session.id){
     return res.status(401).json({
      message:"User not Authenticated"
     })
  }}

// export const isAdmin = (req: Request, res: Response, next: NextFunction)=>{
//   if(req.session.role !== 'admin'){
//     res.status(400).json({
//       message:"Onl6y Valid for Admin"
//     })

//   }
// }