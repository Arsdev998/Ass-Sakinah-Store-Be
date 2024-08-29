import express from 'express';
import passport from 'passport';
import { googleLogin } from '../controllers/googleControllers/google.auth.controller.js';

const router = express.Router();

router.get("/google",passport.authenticate("google",{scope:["email", "profile"]}))

router.get("/google/ass-sakinah", passport.authenticate("google", {
    failureRedirect: "/",
}),
 googleLogin
);
export default router;