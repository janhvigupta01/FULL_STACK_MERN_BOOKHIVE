import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).send("Not authorized");
    }

    const decode = jwt.verify(token, process.env.JWT_WEB_TOKEN);

    req.userId = decode.userId;

    next();
  } catch (error) {
    return res.status(401).send("Invalid Token");
  }
};
