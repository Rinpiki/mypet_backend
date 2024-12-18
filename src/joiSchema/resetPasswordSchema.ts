import Joi from "joi";

const resetPasswordSchema = Joi.object({
  token: Joi.string().required().messages({
    "string.base": "O token deve ser um texto",
    "string.empty": "O token é obrigatório",
    "any.required": "O token é obrigatório",
  }),
  newPassword: Joi.string().min(8).required().messages({
    "string.base": "A nova senha deve ser um texto",
    "string.empty": "A nova senha é obrigatória",
    "string.min": "A nova senha deve ter pelo menos 8 caracteres",
    "any.required": "A nova senha é obrigatória",
  }),
});

export default resetPasswordSchema;
