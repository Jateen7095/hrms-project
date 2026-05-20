import { Clock, Calendar, CheckCircle, FileText } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import { useState } from 'react';

const EmployeeDashboard = () => {
  const { user, token } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const [isClockedIn, setIsClockedIn] = useState(false);

  const handleClockIn = async () => {
    try {
      await axios.post('http://localhost:5000/api/v1/attendance/clock-in', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsClockedIn(true);
      toast.success('Successfully clocked in for today!');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to clock in');
    }
  };

  const downloadPayslip = () => {
    const doc = new jsPDF();
    
    // Add Company Header
    doc.setFontSize(22);
    doc.setTextColor(37, 99, 235); // Blue-600
    doc.text('HRMS Pro', 105, 20, null, null, 'center');
    
    // Add Payslip Title
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('Payslip for April 2026', 105, 30, null, null, 'center');
    
    // Add Employee Details
    doc.setFontSize(12);
    doc.text(`Employee Name: ${user.name}`, 20, 50);
    doc.text(`Email: ${user.email}`, 20, 60);
    doc.text(`Role: ${user.role}`, 20, 70);
    
    // Add Salary Table outline
    doc.line(20, 80, 190, 80);
    doc.text('Earnings', 20, 90);
    doc.text('Amount ($)', 160, 90);
    doc.line(20, 95, 190, 95);
    
    doc.text('Basic Salary', 20, 105);
    doc.text('4,000.00', 160, 105);
    
    doc.text('House Rent Allowance', 20, 115);
    doc.text('800.00', 160, 115);
    
    doc.text('Medical Allowance', 20, 125);
    doc.text('200.00', 160, 125);
    
    doc.line(20, 135, 190, 135);
    doc.setFont(undefined, 'bold');
    doc.text('Total Net Salary', 20, 145);
    doc.text('5,000.00', 160, 145);
    
    // Add Footer
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text('This is a computer-generated document. No signature is required.', 105, 280, null, null, 'center');

    doc.save(`Payslip_${user.name.replace(' ', '_')}_April2026.pdf`);
    toast.success('Payslip downloaded successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Banner Section */}
      <div className="relative bg-blue-600 rounded-2xl shadow-sm overflow-hidden text-white">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80" alt="Office Banner" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 p-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-6 mb-4 sm:mb-0">
            <img src={`https://ui-avatars.com/api/?name=${user?.name}&background=ffffff&color=2563eb&size=128&bold=true`} alt="Avatar" className="w-20 h-20 rounded-full border-4 border-white shadow-lg" />
            <div>
              <h2 className="text-3xl font-bold">Hello, {user?.name} 👋</h2>
              <p className="text-blue-100 mt-1 text-lg">{user?.designation || user?.role}</p>
            </div>
          </div>
          <button 
            onClick={handleClockIn}
            disabled={isClockedIn}
            className={`${isClockedIn ? 'bg-green-500' : 'bg-white text-blue-600 hover:bg-gray-50'} shadow-lg px-6 py-3 rounded-xl text-md font-bold transition flex items-center`}
          >
            {isClockedIn ? '✓ Clocked In' : 'Clock In Today'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Today's Hours</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">04:30</h3>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
              <Clock size={20} />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            <span className="text-green-500 font-medium">On track</span> to complete 8 hours
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Available Leaves</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">12</h3>
            </div>
            <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
              <Calendar size={20} />
            </div>
          </div>
          <div 
            onClick={() => navigate('/dashboard/leaves')}
            className="mt-4 text-sm text-blue-600 font-medium cursor-pointer hover:underline"
          >
            Apply for leave &rarr;
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Tasks</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">5</h3>
            </div>
            <div className="p-3 rounded-lg bg-orange-50 text-orange-600">
              <CheckCircle size={20} />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Latest Payslip</p>
              <h3 className="text-xl font-bold text-gray-900 mt-1">April 2026</h3>
            </div>
            <div className="p-3 rounded-lg bg-emerald-50 text-emerald-600">
              <FileText size={20} />
            </div>
          </div>
          <div 
            onClick={downloadPayslip}
            className="mt-4 text-sm text-emerald-600 font-medium cursor-pointer hover:underline"
          >
            Download PDF &darr;
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
