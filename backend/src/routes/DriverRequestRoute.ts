import express from 'express';
const { DriverRequestController } = require('../controllers/DriverRequestController');
const router = express.Router();

router.post('/driver-request', DriverRequestController)

module.exports = router;