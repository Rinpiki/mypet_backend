import Joi from "joi";

const petSchema = Joi.object({
  userId: Joi.string().required().messages({
    "string.base": "O ID do usuário deve ser um texto.",
    "string.empty": "O ID do usuário é obrigatório.",
    "any.required": "O ID do usuário é obrigatório.",
  }),
  name: Joi.string().required().messages({
    "string.base": "O nome deve ser um texto.",
    "string.empty": "O nome é obrigatório.",
    "any.required": "O nome é obrigatório.",
  }),
  age: Joi.number().required().messages({
    "number.base": "A idade deve ser um número.",
    "any.required": "A idade é obrigatória.",
  }),
  breed: Joi.string().required().messages({
    "string.base": "A raça deve ser um texto.",
    "string.empty": "A raça é obrigatória.",
    "any.required": "A raça é obrigatória.",
  }),
  sex: Joi.string().required().messages({
    "string.base": "O sexo deve ser um texto.",
    "string.empty": "O sexo é obrigatório.",
    "any.required": "O sexo é obrigatório.",
  }),
  tutor: Joi.string().required().messages({
    "string.base": "O nome do tutor deve ser um texto.",
    "string.empty": "O nome do tutor é obrigatório.",
    "any.required": "O nome do tutor é obrigatório.",
  }),
  location: Joi.string().required().messages({
    "string.base": "A localização deve ser um texto.",
    "string.empty": "A localização é obrigatória.",
    "any.required": "A localização é obrigatória.",
  }),
  description: Joi.string().required().messages({
    "string.base": "A descrição deve ser um texto.",
    "string.empty": "A descrição é obrigatória.",
    "any.required": "A descrição é obrigatória.",
  }),
  contact: Joi.array()
    .items(
      Joi.object({
        whatsapp: Joi.string().required().messages({
          "string.base": "O WhatsApp deve ser um texto.",
          "string.empty": "O WhatsApp é obrigatório.",
          "any.required": "O WhatsApp é obrigatório.",
        }),
        instagram: Joi.string().allow(null, "").messages({
          "string.base": "O Instagram deve ser um texto.",
        }),
        tiktok: Joi.string().allow(null, "").messages({
          "string.base": "O TikTok deve ser um texto.",
        }),
        facebook: Joi.string().allow(null, "").messages({
          "string.base": "O Facebook deve ser um texto.",
        }),
        x: Joi.string().allow(null, "").messages({
          "string.base": "O X deve ser um texto.",
        }),
      })
    )
    .required()
    .messages({
      "array.base": "O contato deve ser uma lista de objetos.",
      "any.required": "O contato é obrigatório.",
    }),
});

export default petSchema;
