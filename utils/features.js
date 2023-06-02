import jwt from "jsonwebtoken";

export const sendCookie = (resp, user, message, statusCode = 200) => {
  const token = jwt.sign({ user: user }, process.env.JWT_KEY);
  return resp
    .status(statusCode)
    .cookie("token", token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "Development " ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development " ? false : true,
    })
    .json({
      success: true,
      user,
      message,
    });
};
