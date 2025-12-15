import expres from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRoutes from './routes/product-routes.js';

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

const app = expres();
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(expres.json());

app.use('/api/products', productRoutes);
