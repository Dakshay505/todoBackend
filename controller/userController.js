import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import catchAsyncError from "../middleware/catchasyncerror.js";


// Register
export const register = catchAsyncError(async (req, resp, next) => {
  const { name, email, password } = req.body;
  console.log("abc");

  let user = await User.findOne({ email });

  if (user) return next(new ErrorHandler("User already exist", 400));

  const hashedPassword = await bcrypt.hash(password, 10);
  user = await User.create({ name, email, password: hashedPassword });

  sendCookie(resp, user, "User created successfully.", 201);
});

//Login
export const login = catchAsyncError(async (req, resp, next) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("User doesn't exist.", 404));

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword)
    return next(new ErrorHandler("User or Password doesn't match.", 400));

  sendCookie(resp, user, `Welcome back , ${user.name}`, 200);
});

// getting user details
export const myProfile = catchAsyncError(async (req, resp) => {
  resp.status(200).json({
    success: true,
    user: req.user,
  });
});

// logout
export const logout = (req, resp) => {
  resp
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development " ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development " ? false : true,
    })
    .json({
      success: true,
      message: "User logged out successfully",
    });
};

// getting all user
export const all = catchAsyncError(async (req, resp, next) => {
  const users = await User.find();
  resp.status(200).json({
    success: true,
    users,
  });
});
