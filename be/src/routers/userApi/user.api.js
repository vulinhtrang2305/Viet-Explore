const express = require("express");
const router = express.Router();
const userController = require("../../controllers/users/users.controller");
const authMiddleware = require("../../middlewares/auth.middleware");

router.get("/users", userController.getAllUser)
router.put("/users/update/:id", userController.updateUser);
router.post("/users/register", userController.register)
router.post("/users/login", userController.login)
router.get("/users/profile", authMiddleware, userController.getProfile);
router.get("/users/logout", authMiddleware, userController.logout);
router.delete("/users/delete/:id", userController.deleteUser);

module.exports = router;
