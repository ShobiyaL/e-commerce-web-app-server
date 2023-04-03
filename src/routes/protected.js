import express from 'express';
const router = express.Router();

import { getUserOrders, updateProfile } from '../controllers/UserController.js';
import { createOrder } from '../controllers/OrderController.js';
import { writeProductReview } from '../controllers/ProductController.js';


router.put('/users/updateProfile/:id',updateProfile)
router.post('/orders/createOrder',createOrder);
router.get('/orders/users/:id',getUserOrders)
router.post('/products/reviews/:id',writeProductReview)

export default router;