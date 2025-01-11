import express, { Request, Response, RequestHandler } from "express";

export const signupcontroller: RequestHandler = async (req, res, next) => {

};

export const signincontroller: RequestHandler = async (req, res, next) => {

};

const router = express();
router.use(express.json());

// Correctly register the routes
router.post("/signup", signupcontroller); // Use as a route handler
router.post("/signin", signincontroller);

// Start the server
router.listen(3000, () => {
  console.log("Server is running on port 3000");
});
