import express from "express";
import { allTask, deleteTask, editTask, getSingleTask, newTask, updateTask } from "../controller/taskController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/new",isAuthenticated,newTask);
router.get("/all",isAuthenticated,allTask);

router.route("/:id").put(isAuthenticated,updateTask).delete(isAuthenticated,deleteTask).get(getSingleTask);
router.post("/edit",isAuthenticated,editTask);


export default router;