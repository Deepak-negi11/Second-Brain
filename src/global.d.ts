// Extend NodeJS.ProcessEnv to include custom environment variables
declare namespace NodeJS {
  interface ProcessEnv {
    mongo_URI: string; // Add any other environment variables here
  }
}
import 'express-session';

declare module 'express-session' {
  interface SessionData {
    userid: Types.ObjectId;
    loggedIn :boolean,
    role:string
  }
}
