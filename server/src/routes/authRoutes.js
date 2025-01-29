const { Router } = require("express");
const { register, login, verifyToken } = require("../controllers/authController"); // Импортирай verifyToken
const adminMiddleware = require("../controllers/authAdminController");

const router = Router();

// User registration route
router.post("/register", register);

// User login route
router.post("/login", login);

// Admin dashboard route
router.get('/admin/dashboard', verifyToken, adminMiddleware, (req, res) => {
    res.json({ message: 'Admin Dashboard' });
});

module.exports = router;