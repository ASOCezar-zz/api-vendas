import { Router } from 'express';

import ProductsController from '../controllers/ProductsController';

import { Joi, celebrate, Segments } from 'celebrate';

import uploadConfig from '@config/uploads/uploadProductsImage';
import multer from 'multer';
import ProductsImageController from '../controllers/ProductsImageController';

const productsRouter = Router();

const productsController = new ProductsController();
const productsImageController = new ProductsImageController();

const upload = multer(uploadConfig.multer);

productsRouter.get('/', productsController.index);

productsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productsController.query,
);

productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
    },
  }),
  productsController.create,
);

productsRouter.patch(
  '/:id/image',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  upload.single('image'),
  productsImageController.update,
);

productsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      price: Joi.number().precision(2),
      quantity: Joi.number(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productsController.update,
);

productsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productsController.delete,
);

export default productsRouter;
