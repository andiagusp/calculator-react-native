const ClientError = require('../exceptions/ClientError')

class PostController {
  constructor(service, validator) {
    this._service = service
    this._validator = validator
    this.addPostHandler = this.addPostHandler.bind(this)
    this.editPostHandler = this.editPostHandler.bind(this)
    this.deletePostHandler = this.deletePostHandler.bind(this)
    this.getAllPostHandler = this.getAllPostHandler.bind(this)
    this.getDetailPostHandler = this.getDetailPostHandler.bind(this)
  }

  async getAllPostHandler(req, res) {
    try {
      const result = await this._service.getAllPost()

      res.status(200).send({
        status: 'success',
        data: {
          posts: result
        }
      })
    } catch (error) {
      if (error instanceof ClientError) {
        return res.status(error.statusCode).send({
          status: 'failed',
          message: error.message
        })
      }
      res.status(500).send({
        status: 'failed',
        message: error.message
      })
    }
  }

  async getDetailPostHandler(req, res) {
    try {
      const { id } = req.params
      const result = await this._service.getDetailPost(id)

      res.status(200).send({
        status: 'success',
        data: {
          post: result
        }
      })
    } catch (error) {
      if (error instanceof ClientError) {
        return res.status(error.statusCode).send({
          status: 'failed',
          message: error.message
        })
      }
      res.status(500).send({
        status: 'failed',
        message: error.message
      })
    }
  }

  async addPostHandler(req, res) {
    try {
      this._validator.postValidate({ title: req.body.title, post: req.body.post })
      const result = await this._service.addPost(req.body)
      
      res.status(201).send({
        status: 'success',
        data: {
          post: {
            id: result.id,
            title: result.title,
            post: result.post
          }
        }
      })
    } catch (error) {
      if (error instanceof ClientError) {
        return res.status(error.statusCode).send({
          status: 'failed',
          message: error.message
        })
      }
      res.status(500).send({
        status: 'failed',
        message: error.message
      })
    }
  }

  async editPostHandler(req, res) {
    try {
      const { id } = req.params
      this._validator.postValidate(req.body)
      await this._service.editPost(id, req.body)

      res.status(200).send({
        status: 'success',
        data: {
          post: {
            id: id
          }
        }
      })
    } catch (error) {
      if (error instanceof ClientError) {
        return res.status(error.statusCode).send({
          status: 'failed',
          message: error.message
        })
      }
      res.status(500).send({
        status: 'failed',
        message: error.message
      })
    }
  }

  async deletePostHandler(req, res) {
    try {
      const { id } = req.params
      await this._service.deletePost(id)

      res.status(200).send({
        status: 'success',
        data: {
          post: { id }
        }
      })
    } catch (error) {
      if (error instanceof ClientError) {
        return res.status(error.statusCode).send({
          status: 'failed',
          message: error.message
        })
      }
      res.status(500).send({
        status: 'failed',
        message: error.message
      })
    }
  }
}

module.exports = PostController
