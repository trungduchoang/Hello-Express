// libs
import Joi from "joi";
// others
import { validPassword, validMongoId } from "./common";

export const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(validPassword),
    name: Joi.string().required(),
    role: Joi.string().required().valid("user", "admin"),
  }),
};

export const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(validMongoId),
  }),
};

export const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(validMongoId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(validPassword),
      name: Joi.string(),
    })
    .min(1),
};

export const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(validMongoId),
  }),
};
