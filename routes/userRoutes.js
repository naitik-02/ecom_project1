import express from "express";

const router = express.Router()
import { UserRegister , verifyUser ,LoginUser, myProfile } from "../controller/user.js";
import { isAuth } from "../middlewares/auth.js";


router.route('/user/register').post(UserRegister);
router.route('/user/verify').post(verifyUser);
router.route('/user/login').post(LoginUser);
router.route('/user/me').get(isAuth , myProfile);

export  default router