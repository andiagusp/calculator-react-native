const { UserValidatorSchema, LoginValidatorSchema } = require('./schema')
const InvariantError = require('../../exceptions/InvariantError')

const UserValidator = {
	userValidate: payload => {
		const { error } = UserValidatorSchema.validate(payload)

		if (error) {
			throw new InvariantError(error.details[0].message)
		}
	},
	loginValidate: payload => {
		const { error } = LoginValidatorSchema.validate(payload)
		if (error) {
			throw new InvariantError(error.details[0].message)
		}
	}
}

module.exports = UserValidator
