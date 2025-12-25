import jwt from "jsonwebtoken"




export const GenToken = (userId) => {
  try {
    const token = jwt.sign(
      { userId },
      process.env.JWT_WEB_TOKEN,
      { expiresIn: "7d" }     
    );

    return token;            
  } catch (error) {
    console.log("Token generation failed:", error.message);
  }
};
