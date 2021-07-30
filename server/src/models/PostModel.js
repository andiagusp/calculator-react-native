const { user, post } = require('../../models')
const NotFoundError = require('../exceptions/NotFoundError')
const InvariantError = require('../exceptions/InvariantError')

class PostModel {
	async addPost(request) {
		const result = await post.create(request)
		return result
	}

	async getAllPost() {
		const result = await post.findAll({
			attributes: ['id', 'title', 'post'],
			include: {
				model: user,
				as: 'user',
				attributes: ['username', 'fullname']
			}
		})
		return result
	}

	async getDetailPost(id) {
		const result = await post.findOne({
			attributes: ['id', 'title', 'post'],
			where: { id: id },
			include: {
				model: user,
				as: 'user',
				attributes: ['username', 'fullname']
			}
		})

		if (!result) {
			throw new NotFoundError('post not found')
		}
		return result
	}

	async editPost(id, request) {
		const check = await post.findOne({ where: { id: id } })
		if (!check) {
			throw new NotFoundError('post not found')
		}
		await post.update(request, {
			where: { id: id }
		})
	}

	async deletePost(id) {
		const result = await post.destroy({ where: { id: id } })
		if (!result) {
			throw new NotFoundError('post failed to delete')
		}
	}
}

module.exports = PostModel
