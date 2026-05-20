const Leave = require('../models/Leave');
const asyncHandler = require('express-async-handler');

// @desc      Apply for leave
// @route     POST /api/v1/leaves
// @access    Private (Employee)
exports.applyLeave = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.employee = req.user.id;

  const leave = await Leave.create(req.body);

  res.status(201).json({
    success: true,
    data: leave
  });
});

// @desc      Get all leaves
// @route     GET /api/v1/leaves
// @access    Private
exports.getLeaves = asyncHandler(async (req, res, next) => {
  let query;

  // If Admin/HR, see all leaves. If employee, see only theirs
  if (req.user.role === 'Admin' || req.user.role === 'HR') {
    query = Leave.find().populate({
      path: 'employee',
      select: 'name email designation'
    });
  } else {
    query = Leave.find({ employee: req.user.id });
  }

  const leaves = await query;

  res.status(200).json({
    success: true,
    count: leaves.length,
    data: leaves
  });
});

// @desc      Update leave status
// @route     PUT /api/v1/leaves/:id/status
// @access    Private (Admin/HR)
exports.updateLeaveStatus = asyncHandler(async (req, res, next) => {
  const { status, managerRemarks } = req.body;

  let leave = await Leave.findById(req.params.id);

  if (!leave) {
    return res.status(404).json({ success: false, error: 'Leave request not found' });
  }

  leave = await Leave.findByIdAndUpdate(req.params.id, { 
    status, 
    managerRemarks, 
    approvedBy: req.user.id 
  }, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: leave
  });
});
