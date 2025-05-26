import express from 'express'
const { LoginCurrentUser } = require('../controllers/LoginCurrentUser')
const router = express.Router();

router.post('/login', LoginCurrentUser)


module.exports = router

