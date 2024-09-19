import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "O email deve ser um endereço de email válido",
    "string.empty": "O email não pode ser vazio",
    "any.required": "O email é obrigatório",
  }),
  password: Joi.string().required().messages({
    "string.empty": "A senha é não pode ser vazia",
    "any.required": "A senha é obrigatória",
  }),
});

export default loginSchema;
