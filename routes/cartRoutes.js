import express from 'express'
import{addToCart ,removeFromCart,fetchCart,updateCart} from '../controller/cart.js'
import { isAuth } from '../middlewares/auth.js';

const  router = express.Router();
router.post("/cart/new", isAuth, addToCart);
router.get("/cart/all", isAuth, fetchCart);
router.delete("/cart/:id", isAuth, removeFromCart);
router.put("/cart", isAuth, updateCart);


export default router ;