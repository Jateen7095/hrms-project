const express = require('express');
const { getEmployees, createEmployee, deleteEmployee } = require('../controllers/employeeController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Apply protection to all routes below
router.use(protect);

router.route('/')
  .get(authorize('Admin', 'HR'), getEmployees)
  .post(authorize('Admin', 'HR'), createEmployee);

router.route('/:id')
  .delete(authorize('Admin'), deleteEmployee);

module.exports = router;
