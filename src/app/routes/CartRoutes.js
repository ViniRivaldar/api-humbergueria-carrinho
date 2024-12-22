import { Router } from "express";

import CartController from '../controller/CartController.js'
import authMiddleware from "../../config/authMiddleware.js";

const router = new Router()

router.get('/',authMiddleware,CartController.index)
router.post('/',authMiddleware,CartController.store)
router.delete('/:id', authMiddleware, CartController.delete)

export default router