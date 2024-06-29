import Joi from "joi";

const useSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "O nome deve ser um texto",
    "string.empty": "O nome é obrigatório",
    "any.required": "O nome é obrigatório",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "O email deve ser um endereço de email válido",
    "string.empty": "O email é obrigatório",
    "any.required": "O email é obrigatório",
  }),
  password: Joi.string().required().messages({
    "string.base": "A senha nao pode compostas so por numeros",
    "string.empty": "A senha é obrigatória",
    "any.required": "A senha é obrigatória",
  }),
});

export default useSchema;
