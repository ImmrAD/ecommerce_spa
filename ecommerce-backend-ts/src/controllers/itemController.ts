import { Request, Response } from 'express';
import { Item } from '../models/Item';

export const getItems = async (req: Request, res: Response) => {
  try {
    const { category, minPrice, maxPrice } = req.query;

    const filter: any = {};
    if (category) filter.category = category as string;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const items = await Item.find(filter);
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};