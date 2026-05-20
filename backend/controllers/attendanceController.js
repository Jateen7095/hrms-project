const Attendance = require('../models/Attendance');
const asyncHandler = require('express-async-handler');

// @desc      Clock in
// @route     POST /api/v1/attendance/clock-in
// @access    Private
exports.clockIn = asyncHandler(async (req, res, next) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Check if already clocked in today
  let attendance = await Attendance.findOne({
    employee: req.user.id,
    date: { $gte: today }
  });

  if (attendance) {
    return res.status(400).json({ success: false, error: 'You have already clocked in today' });
  }

  attendance = await Attendance.create({
    employee: req.user.id,
    checkIn: new Date(),
    status: 'Present'
  });

  res.status(200).json({
    success: true,
    data: attendance
  });
});
