import { Router } from "express";
import * as contentController from "../controllers/contentControllers.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = Router();
router.use(authMiddleware);
router
    .route("/")
    .get(contentController.getContent)
    .post(contentController.addContent);
// UPDATED route for deleting content
router.delete("/:contentId", contentController.deleteContent);
router.post("/share", contentController.manageShareLink);
export default router;
//# sourceMappingURL=contentRoutes.js.map