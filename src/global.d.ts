// Extend NodeJS.ProcessEnv to include custom environment variables
declare namespace NodeJS {
  interface ProcessEnv {
    mongo_URI: string; // Add any other environment variables here
  }
}
// types/express-session.d.ts
import 'express-session';

declare module 'express-session' {
  interface SessionData {
    userid: Types.ObjectId; // Example custom property
  }
}


// Extend express-session to include custom session properties
import session from "express-session";
declare module "express-session" {
  interface SessionData {
    loggedIn?: boolean; // Add custom properties as needed
  }
}

import dotenv from "dotenv";
import express from "express";
import { z } from "zod";

dotenv.config(); // Initialize dotenv
