import { Router } from 'express';
import productsRouter from '@modules/products/routes/products.routes';
import usersRouter from '@modules/users/routes/users.routes';

const routes = Router();

routes.use(
  '/users',
  (req, res, next) => {
    console.log(req.query);
    next();
  },
  usersRouter,
);
routes.use('/products', productsRouter);

routes.get('/', (req, res) => {
  return res.json({ message: 'Hello Dev!' });
});

export default routes;
