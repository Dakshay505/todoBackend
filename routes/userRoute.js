import express from 'express';
import { login, register ,myProfile, logout, all } from "../controller/userController.js";
import { isAuthenticated } from '../middleware/auth.js';
const router = express.Router();

router.post("/new",register);

router.post("/login",login);
router.get("/me",isAuthenticated,myProfile);
router.get("/all",isAuthenticated,all);
router.get("/logout",isAuthenticated,logout);



export default router;