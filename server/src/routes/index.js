const express = require('express')
const router = express.Router()

const UserModel = require('../models/UserModel')
const UserValidator = require('../validator/users')
const UserController = require('../controllers/UserController')

const PostModel = require('../models/PostModel')
const PostValidator = require('../validator/posts')
const PostController = require('../controllers/PostController')

const userModel = new UserModel()
const userController = new UserController(userModel, UserValidator)

const postModel =  new PostModel()
const postController = new PostController(postModel, PostValidator)

router.post('/post', postController.addPostHandler)
router.get('/posts', postController.getAllPostHandler)
router.put('/post/:id', postController.editPostHandler)
router.get('/post/:id', postController.getDetailPostHandler)
router.delete('/post/:id', postController.deletePostHandler)

router.post('/user', userController.addUserHandler)
router.post('/login', userController.loginUserHandler)

module.exports = router
