const mongoose = require('mongoose');

const PayrollSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  month: {
    type: String, // e.g., 'January 2026'
    required: true
  },
  basicSalary: {
    type: Number,
    required: true
  },
  allowances: {
    houseRent: { type: Number, default: 0 },
    medical: { type: Number, default: 0 },
    transport: { type: Number, default: 0 },
    other: { type: Number, default: 0 }
  },
  deductions: {
    tax: { type: Number, default: 0 },
    providentFund: { type: Number, default: 0 },
    unpaidLeave: { type: Number, default: 0 },
    other: { type: Number, default: 0 }
  },
  netSalary: {
    type: Number,
    required: true
  },
  paymentDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['Pending', 'Processed', 'Paid'],
    default: 'Pending'
  }
}, {
  timestamps: true
});

// Calculate net salary before saving
PayrollSchema.pre('save', function(next) {
  const totalAllowances = this.allowances.houseRent + this.allowances.medical + this.allowances.transport + this.allowances.other;
  const totalDeductions = this.deductions.tax + this.deductions.providentFund + this.deductions.unpaidLeave + this.deductions.other;
  
  this.netSalary = this.basicSalary + totalAllowances - totalDeductions;
  next();
});

module.exports = mongoose.model('Payroll', PayrollSchema);
