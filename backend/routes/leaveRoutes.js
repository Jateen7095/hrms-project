const express = require('express');
const { applyLeave, getLeaves, updateLeaveStatus } = require('../controllers/leaveController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getLeaves)
  .post(applyLeave);

router.route('/:id/status')
  .put(authorize('Admin', 'HR'), updateLeaveStatus);

module.exports = router;
