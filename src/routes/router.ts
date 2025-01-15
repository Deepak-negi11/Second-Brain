import express, { Request, Response, RequestHandler } from "express";
import { createContent, deleteContent} from "../contoller/content";
import { signupcontroller ,signincontroller, updateUser, deleteUser } from "../contoller/user";

const router = express.Router();
router.use(express.json());

// Correctly register the routes
router.post("/user/signup", async (req ,res , next)=>{
  await signupcontroller(req , res, next)
}); // Use as a route handler
router.post("/user/signin", async (req , res, next)=>{
  await signincontroller(req , res, next)
});
router.put("/user/update",async (req , res , next)=>{
  await updateUser(req , res ,next)
});
router.delete("/user/delete/:id",async (req , res , next)=>{
  await deleteUser(req , res ,next)
})



// router.get("/admin/dashboard", isAdmin, (req, res) => {
//   res.json({ message: "Welcome to the Admin Dashboard" });
// });

// export default router;


router.post("/content/add" , async (req , res ,next)=>{
  await createContent(req , res , next)
} );
router.delete("/deletecontent/:id",async (req , res ,next)=>{
  await deleteContent(req , res , next)
})



export default router 