import express from 'express';
import productRouter from './routes/product.router';
import userRouter from './routes/user.router';
import loginRouter from './routes/login.router';

const app = express();

app.use(express.json());

app.use(loginRouter);
app.use(productRouter);
app.use(userRouter);

export default app;
