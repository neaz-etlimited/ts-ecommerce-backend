import Joi from "joi";
import express from "express";

const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().min(0).required(),
  category: Joi.string().required(),
  tags: Joi.array().items(Joi.string()),
  variants: Joi.array().items(
    Joi.object({
      type: Joi.string().required(),
      value: Joi.string().required(),
    })
  ),
  inventory: Joi.object({
    quantity: Joi.number().min(0).required(),
    inStock: Joi.boolean().required(),
  }).required(),
});

const updateProductSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  price: Joi.number().min(0),
  category: Joi.string(),
  tags: Joi.array().items(Joi.string()),
  variants: Joi.array().items(
    Joi.object({
      type: Joi.string().required(),
      value: Joi.string().required(),
    })
  ),
  inventory: Joi.object({
    quantity: Joi.number().min(0).required(),
    inStock: Joi.boolean().required(),
  }),
}).or(
  "name",
  "description",
  "price",
  "category",
  "tags",
  "variants",
  "inventory"
);

export const validateProduct = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export const validateProductUpdate = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { error } = updateProductSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
