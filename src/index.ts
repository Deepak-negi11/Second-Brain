// index.ts
import express, { Request, Response } from "express";
import { UserModel } from "./Db";  // Import User model from db.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";




const app = express();

// Middleware to parse JSON
app.use(express.json());

// Define signup request schema using zod
const signupSchema = z.object({
  username: z.string().min(6).max(20),
  password: z.string().min(12).max(29),
  email: z.string().email(),
});

// Signup route
app.post("/signup", async (req: Request, res: Response) => {
  try {
     // Validate the request body using zod
     const parsedData = signupSchema.parse(req.body);
     const { username, password, email } = parsedData;
     const securepass = await bcrypt.hash(password, 6);

     // Create a new user in the database
     await UserModel.create({
      username,
      password: securepass,
      email,
     });

      res.json({ message: "You are signed up" });
    }  catch (e) {
    console.error(e);
    res.status(404).json({ message: "Signup failed" });
  }
});

// Signin route
app.post("/signin", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await UserModel.findOne({ username });
    if (!user || !user.password) {
      return res.status(404).json({ message: "Invalid username or password" });
    }

    // Compare the provided password with the stored password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Signin failed" });
  }
});

// Start server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

   
