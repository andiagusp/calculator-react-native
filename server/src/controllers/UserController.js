const ClientError = require('../exceptions/ClientError')

class UserController {
  constructor(service, validator) {
    this._service = service
    this._validator = validator
    this.addUserHandler = this.addUserHandler.bind(this)
    this.loginUserHandler = this.loginUserHandler.bind(this)
  }

  async addUserHandler(req, res) {
    try {
      this._validator.userValidate(req.body)
      const { id, username, fullname } = await this._service.addUser(req.body)
      
      res.status(201).send({
        status: 'success',
        data: {
          user: { id, username, fullname }
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

  async loginUserHandler(req, res) {
    try {
      this._validator.loginValidate(req.body)
      const { id, username, fullname } = await this._service.loginUser(req.body)

      res.status(200).send({
        status: 'success',
        data: {
          user: {
            id, username, fullname
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
}

module.exports = UserController
