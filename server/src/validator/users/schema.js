const Joi = require('joi')

const UserValidatorSchema = Joi.object({
	username: Joi.string().required().min(4),
	password: Joi.string().required().min(4),
	fullname: Joi.string().required()
})

const LoginValidatorSchema = Joi.object({
	username: Joi.string().required().min(4),
	password: Joi.string().required().min(4)
})

module.exports = { UserValidatorSchema, LoginValidatorSchema }
