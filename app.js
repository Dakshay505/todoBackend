import express from "express";
import userRoutes from "./routes/userRoute.js";
import taskRoutes from "./routes/taskRoute.js";
import {config} from "dotenv"
import cors from "cors";
import path from "path"
import { fileURLToPath } from "url"; // Import the fileURLToPath function
import { dirname } from "path";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/error.js";

export const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, "build")));
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

app.get("*", (req, res) => {
    const indexPath = path.join(__dirname, "build", "index.html");
    res.sendFile(indexPath);
  });
  
// handling the error
app.use(errorMiddleware);
