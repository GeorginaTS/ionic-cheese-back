import { Request, Response, NextFunction } from 'express';
import { auth } from '../config/firebase';

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token missing or invalid' });
  }

  const token = header.split('Bearer ')[1];

  try {
    const decodedToken = await auth.verifyIdToken(token);
    (req as any).user = decodedToken; // afegim l'usuari al request
    next();
  } catch (error) {
    console.error('Error verificant token:', error);
    return res.status(401).json({ error: 'Invalid token' });
  }
}
