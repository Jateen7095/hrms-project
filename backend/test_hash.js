const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/hrms').then(async () => {
  const user = await User.findOne({ email: 'admin@hrms.com' }).select('+password');
  console.log('Stored Password:', user.password);
  
  const bcrypt = require('bcryptjs');
  const isMatch = await bcrypt.compare('password123', user.password);
  console.log('Does password123 match?', isMatch);
  
  process.exit();
});
