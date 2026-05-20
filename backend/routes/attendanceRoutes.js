const express = require('express');
const { clockIn } = require('../controllers/attendanceController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/clock-in', protect, clockIn);

module.exports = router;
