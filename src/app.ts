import express from 'express';
import productRouter from './routes/product.router';
import userRouter from './routes/user.router';

const app = express();

app.use(express.json());

app.use(productRouter);
app.use(userRouter);

export default app;
