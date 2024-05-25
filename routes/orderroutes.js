import express from 'express'
import { getMyOrder, newOrderCod, updateStatus  ,getAllOrders,getAdminOrder ,newOrderOnline , payment} from '../controller/order.js'
import { isAuth } from '../middlewares/auth.js'

const router = express.Router()

router.route("/order/new/cod").post(isAuth ,newOrderCod)
router.route("/order/new/online").post(isAuth ,newOrderOnline)
router.route("/payment").post(isAuth ,payment)
router.route("/order/all").get(isAuth ,getAllOrders)
router.route("/order/admin/all").get(isAuth ,getAdminOrder)
router.route("/order/:id").get(isAuth ,getMyOrder)
router.route("/order/update/:id").put(isAuth ,updateStatus)

export default  router