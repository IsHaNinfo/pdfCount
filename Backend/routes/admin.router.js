import express from "express";
const router = express.Router();

import adminController from "../controllers/admin.controller.js";
import verifyAdmin from "../middleware/verifyAdmin.js";

router.post("/login", adminController.adminLogin);
router.post("/register", adminController.registerAdmin);
router.post("/ChangePassword/:id", adminController.changeAdminPassword);
router.get("/verifyAdmin", verifyAdmin)
router.get('/getAdmin', adminController.getAdmin);

export default router;
