import { Router } from "express";
import { getPublicContent } from "../controllers/contentControllers.js";
const router = Router();
router.get("/brain/:shareLink", getPublicContent);
export default router;
//# sourceMappingURL=publicRoutes.js.map