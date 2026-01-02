import jwt from "jsonwebtoken";

export const isAuthHistory = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_WEB_TOKEN);

    // 🔥 SUPPORT BOTH POSSIBILITIES (NO BREAKING CHANGE)
    req.userId = decoded.userId || decoded.id;

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
