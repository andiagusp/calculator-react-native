const bcrypt = require('bcrypt')
const { user } = require('../../models')
const InvariantError = require('../exceptions/InvariantError')
const NotFoundError = require('../exceptions/NotFoundError')


class UserModel {
	async addUser(data) {
		const { username, password, fullname } = data
		await this.cekUsername(username)
		const hashedPassword = await bcrypt.hash(password, 10)
    const result = await user.create({
      username, password: hashedPassword, fullname
    })

    return result
	}

	async loginUser(data) {
		const { username, password } = data
		const result = await user.findOne({
			where: {
				username: username
			}
		})
		const compare = await bcrypt.compare(password, result.password)
		console.log(compare)
		if (!result) {
			throw new NotFoundError('username or password not incorrect')
		} else if (!compare) {
			throw new NotFoundError('username or password not incorrect')
		}
		return result
	}

	async cekUsername(username) {
    const result = await user.findOne({
      where: {
        username: username
      }
    })
    if (result) {
      throw new InvariantError('Username already exist')
    }
  }
}

module.exports = UserModel
