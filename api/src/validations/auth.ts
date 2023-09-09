import Joi from 'joi';

const loginSchema = Joi.object({
  email: Joi.string().email().required().trim(),
  password: Joi.string().max(100).required().trim(),
}).options({ abortEarly: false });

export { loginSchema };
