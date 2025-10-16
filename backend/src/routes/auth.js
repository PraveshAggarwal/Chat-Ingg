import express from "express";
import { signup, login, logout } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { onboard } from "../controllers/auth.controller.js";
const router  = express.Router();


router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// before boarding to the boarding route when hit to this route we must ensure that it was protected 
router.post("/onboarding", protectRoute, onboard);

// checks if the user is logged in or not // checks you are authenticated or not
router.get("/me", protectRoute, (req,res) => {
    res.status(200).json({ success:true, user: req.user });
});



export default router;