import { Response } from 'express';
import { Cart } from '../models/Cart';
import { AuthRequest } from '../middleware/authMiddleware';

// @desc    Get user's cart
// @route   GET /api/cart
export const getCart = async (req: AuthRequest, res: Response) => {
  try {
    const cart = await Cart.findOne({ userId: req.user?._id }).populate('items.productId');
    if (!cart) {
      return res.json({ items: [] });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Add or update item in cart
// @route   POST /api/cart
export const addItemToCart = async (req: AuthRequest, res: Response) => {
  const { productId, quantity } = req.body;
  const userId = req.user?._id;

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      const itemIndex = cart.items.findIndex(p => p.productId.toString() === productId);

      if (itemIndex > -1) {
        const productItem = cart.items[itemIndex];
        
        // --- FIX IS HERE ---
        // Add a check to ensure productItem is not undefined
        if (productItem) {
          productItem.quantity += quantity;
        }

      } else {
        cart.items.push({ productId, quantity });
      }
      cart = await cart.save();
    } else {
      cart = await Cart.create({
        userId,
        items: [{ productId, quantity }],
      });
    }
    
    const populatedCart = await cart.populate('items.productId');
    res.status(201).json(populatedCart);

  } catch (error) {
    console.error('Cart Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
export const removeItemFromCart = async (req: AuthRequest, res: Response) => {
    const { productId } = req.params;
    const userId = req.user?._id;

    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        
        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        await cart.save();
        
        const populatedCart = await cart.populate('items.productId');
        res.json(populatedCart);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Clear all items from cart
// @route   DELETE /api/cart
export const clearCart = async (req: AuthRequest, res: Response) => {
    try {
        await Cart.findOneAndDelete({ userId: req.user?._id });
        res.status(200).json({ message: 'Cart cleared' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};