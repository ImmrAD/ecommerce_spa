import { Router } from 'express';
// Add 'clearCart' to the import list
import { getCart, addItemToCart, removeItemFromCart, clearCart } from '../controllers/cartController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.route('/')
  .get(protect, getCart)
  .post(protect, addItemToCart)
  .delete(protect, clearCart);
  
router.route('/:productId')
  .delete(protect, removeItemFromCart);

export default router;