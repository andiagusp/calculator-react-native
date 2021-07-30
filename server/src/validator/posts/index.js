const { PostValidatorSchema } = require('./schema')
const InvariantError = require('../../exceptions/InvariantError')

const PostValidator = {
	postValidate: payload => {
		const { error } = PostValidatorSchema.validate(payload)
		if (error) {
			throw new InvariantError(error.details[0].message)
		}
	}
}

module.exports = PostValidator
