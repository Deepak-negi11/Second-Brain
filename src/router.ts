import express, { Request, Response, RequestHandler } from "express";

export const signupcontroller: RequestHandler = async (req, res, next) => {

  // signup logic

};

export const signincontroller: RequestHandler = async (req, res, next) => {

  // signin logic

};

const app = express();
app.use(express.json());

// Correctly register the routes
app.post("/signup", signupcontroller); // Use as a route handler
app.post("/signin", signincontroller);

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
