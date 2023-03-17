import express from 'express';
const router = express.Router();

import {getAllProducts,getProduct} from '../controllers/ProductController.js';
import {login,register} from '../controllers/UserController.js';
import {checkout} from '../controllers/CheckoutController.js';

router.get('/products',getAllProducts);
router.get('/products/:id',getProduct);

router.post('/users/login',login);
router.post('/users/register',register);
router.post('/payment',checkout);


export default router;