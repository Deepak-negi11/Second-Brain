import express, { Request, Response, RequestHandler } from "express";
import { createContent, deleteContent} from "../contoller/content";
import { signupcontroller ,signincontroller } from "../contoller/user";

const router = express.Router();
router.use(express.json());

// Correctly register the routes
router.post("/user/signup", async (req ,res , next)=>{
  await signupcontroller(req , res, next)
}); // Use as a route handler
router.post("/user/signin", async (req , res, next)=>{
  await signincontroller(req , res, next)
});

router.post("/content/add" , async (req , res ,next)=>{
  await createContent(req , res , next)
} );
router.delete("/deletecontent/:id",async (req , res ,next)=>{
  await deleteContent(req , res , next)
})



export default router 