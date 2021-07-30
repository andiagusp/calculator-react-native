const Joi = require('joi')

const PostValidatorSchema = Joi.object({
	title: Joi.string().required(),
	post: Joi.string().required()
})

module.exports = { PostValidatorSchema }
