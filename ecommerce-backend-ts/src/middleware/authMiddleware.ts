import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User';

// This interface allows us to add the 'user' property to the Express request object
export interface AuthRequest extends Request {
  user?: IUser;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  // 1. Check for the header first.
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  // 2. Extract the token.
  const token = authHeader.split(' ')[1];

  // 3. Check if the token was successfully extracted.
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, token is malformed' });
  }

  // 4. Now that we know the token exists, verify it inside a try...catch block.
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    // Safely check the decoded payload
    if (typeof decoded === 'object' && 'id' in decoded) {
      const userId = decoded.id as string;
      
      req.user = await User.findById(userId).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }

      next();
    } else {
      throw new Error('Token payload is invalid');
    }
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};