import express from "express";
import userRoutes from "./routes/userRoute.js";
import taskRoutes from "./routes/taskRoute.js";
import {config} from "dotenv"
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/error.js";

export const app = express();

// using dotenv
config({path:"./database/config.env"});

// adding middleware 
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
    origin:process.env.FRONTEND_URI
}))

// adding routes
app.use("/users",userRoutes);
app.use("/task",taskRoutes);


// handling the error
app.use(errorMiddleware);