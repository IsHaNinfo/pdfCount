import express from "express";
const router = express.Router();
import userAuthentication from "../middleware/userAuthentication.js";
import userController from "../controllers/user.controller.js";

router.post("/register", userController.registerUser);
router.post("/login", userController.userLogin);
router.get("/allUsers", userAuthentication, userController.getAllUsersForUser);


export default router;
