import express from 'express'
const { CreateCurrentUser } = require('../controllers/CreateCurrentUser')

const router = express.Router();

router.post('/signup', CreateCurrentUser)


module.exports = router

