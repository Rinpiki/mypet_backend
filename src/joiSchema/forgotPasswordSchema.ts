import Joi from "joi";

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "O email deve ser um endereço de email válido",
    "string.empty": "O email é obrigatório",
    "any.required": "O email é obrigatório",
  }),
});

export default forgotPasswordSchema;
