import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'cg;Access denied, no token provided' });
 
       }  
 }
;

export const isAuthentication = (req:Request , res:Response,next:NextFunction)=>{
  if(!req.session.id){
    return res.status(401).json({
      message:"Authentication failed",
      err:Error
    })
  }
}
