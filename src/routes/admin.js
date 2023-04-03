import express from 'express';
const router = express.Router();

import { deleteUser, getUsers } from '../controllers/UserController.js';
import { deleteOrder, getOrders, setDelivered } from '../controllers/OrderController.js';
import { createNewProduct, deleteProduct, removeProductReview, updateProduct } from '../controllers/ProductController.js';


router.get('/users',getUsers)
router.delete('/users/:id',deleteUser)
router.get('/orders',getOrders)
router.delete('/orders/:id',deleteOrder)
router.put('/orders/update/:id',setDelivered)

router.post('/products/create',createNewProduct)
router.put('/products/update',updateProduct)
router.delete('/products/:id',deleteProduct)

router.put('/reviews/:productId/:reviewId',removeProductReview)
export default router;