import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
            .status(401)
            .json({ message: "Authorization header is missing or malformed" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, env.JWT_SECRET);
        if (!decoded.id) {
            return res.status(403).json({ message: "Invalid token payload" });
        }
        req.userId = decoded.id;
        next();
    }
    catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};
//# sourceMappingURL=authMiddleware.js.map