const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// @desc      Get all employees
// @route     GET /api/v1/employees
// @access    Private/Admin/HR
exports.getEmployees = asyncHandler(async (req, res, next) => {
  const employees = await User.find({ role: 'Employee' }).select('-password');
  
  res.status(200).json({
    success: true,
    count: employees.length,
    data: employees
  });
});

// @desc      Create employee
// @route     POST /api/v1/employees
// @access    Private/Admin/HR
exports.createEmployee = asyncHandler(async (req, res, next) => {
  // Ensure the role is Employee
  req.body.role = 'Employee';
  
  const employee = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: employee
  });
});

// @desc      Delete employee
// @route     DELETE /api/v1/employees/:id
// @access    Private/Admin
exports.deleteEmployee = asyncHandler(async (req, res, next) => {
  const employee = await User.findById(req.params.id);

  if (!employee) {
    return res.status(404).json({ success: false, error: 'Employee not found' });
  }

  await employee.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});
