import express from "express"
import { AddAdress, FetchAllAddress, deleteAdress, fetchOneAddress } from "../controller/adress.js";
import { isAuth } from "../middlewares/auth.js";

const router = express.Router();

router.route('/address/new').post( isAuth,AddAdress);
router.route('/address/all').get( isAuth,FetchAllAddress);
router.route('/address/:id').get( isAuth,fetchOneAddress);
router.route('/address/:id').delete( isAuth,deleteAdress);


export default router