import { Schema, model, Document } from 'mongoose';

export interface IItem extends Document {
  name: string;
  category: string;
  price: number;
  imageUrl: string;
}

const itemSchema = new Schema<IItem>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
});

export const Item = model<IItem>('Item', itemSchema);