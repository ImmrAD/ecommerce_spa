import { Schema, model, Document, Types } from 'mongoose';

interface ICartItem {
  productId: Types.ObjectId;
  quantity: number;
}

export interface ICart extends Document {
  userId: Types.ObjectId;
  items: ICartItem[];
}

const cartItemSchema = new Schema<ICartItem>({
  productId: { type: Schema.Types.ObjectId, ref: 'Item', required: true },
  quantity: { type: Number, required: true, min: 1, default: 1 },
});

const cartSchema = new Schema<ICart>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [cartItemSchema],
}, { timestamps: true });

export const Cart = model<ICart>('Cart', cartSchema);