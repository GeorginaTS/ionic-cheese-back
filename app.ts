import express, { Request, Response } from 'express';
import dbConnect from './config/db';
import cheeseRoutes from './routes/cheeses';
import userRoutes from './routes/users';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/cheeses', cheeseRoutes);
app.use('/api/users', userRoutes);

const PORT =  process.env.PORT || 3000 || 3001;

app.get('/', (req: Request, res: Response) => {
  res.send('Hola món amb TypeScript i Express! 🤓');
});

app.listen(PORT, () => {
  console.log(`Servidor escoltant al port ${PORT}`);
});

dbConnect(); // Connectem a la base de dades