import Joi from 'joi';

interface CategorySchema {
  name: string;
  enabled?: 'true' | 'false';
}

const categorySchema = Joi.object({
  name: Joi.string().required().trim(),
  enabled: Joi.boolean().optional().sensitive(),
}).options({ abortEarly: false });

export default categorySchema;
export { CategorySchema };
