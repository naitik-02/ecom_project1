import express from 'express'
import { isAuth } from '../middlewares/auth.js';
import { createProduct,deleteProduct,fetchProduct, fetchSingleProduct, udateStock,fetchAdminProduct } from '../controller/product.js';

import { uploadFiles } from '../middlewares/multer.js';

const router = express.Router();

router.route('/product/new').post(isAuth ,uploadFiles, createProduct);
router.route('/product/all').get(fetchProduct);
router.route('/product/admin/all').get(fetchAdminProduct);
router.route('/product/:id').get(fetchSingleProduct);
router.route('/product/:id').put(isAuth , udateStock);
router.route('/product/:id').delete(isAuth , deleteProduct);


export default router