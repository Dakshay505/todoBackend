import ErrorHandler from "../middleware/error.js";
import { Task } from "../models/task.js";
import catchAsyncError from "../middleware/catchasyncerror.js";
// creating new task
export const newTask =catchAsyncError( async (req, resp) => {
  const { title, description } = req.body;

  await Task.create({ title, description, user: req.user });

  resp.status(201).json({
    success: true,
    message: "Task created successfully.",
  });
});
// getting all the tasks
export const allTask =catchAsyncError( async (req, resp) => {
  const tasks = await Task.find({ user: req.user });

  resp.status(201).json({
    success: true,
    tasks,
  });
});

// updating task
export const updateTask =catchAsyncError( async (req, resp,next) => {
  const task = await Task.findById(req.params.id);
  
  if(!task) return next(new ErrorHandler("Task not found",404));

  task.isCompleted = !task.isCompleted;
  await task.save();
  resp.status(201).json({
    success: true,
    message:"task updated successfully",
  });
});

// deleting task
export const deleteTask =catchAsyncError( async (req, resp,next) => {
  const task = await Task.findById(req.params.id);
  if(!task) return next(new ErrorHandler("Task not found",404))
  await task.deleteOne();
  resp.status(201).json({
    success: true,
    message:"task deleted successfully"
  });
});
