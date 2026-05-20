import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const LeaveApplication = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token, user } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    leaveType: 'Casual Leave',
    startDate: '',
    endDate: '',
    totalDays: 1,
    reason: ''
  });

  const todayDate = new Date().toISOString().split('T')[0];

  const calculateDays = (startStr, endStr) => {
    if (!startStr || !endStr) return 1;
    const start = new Date(startStr);
    const end = new Date(endStr);
    if (end < start) return 0;
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/v1/leaves', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLeaves(res.data.data);
    } catch (error) {
      toast.error('Failed to fetch leaves');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/v1/leaves', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Leave applied successfully');
      setFormData({ leaveType: 'Casual Leave', startDate: '', endDate: '', totalDays: 1, reason: '' });
      fetchLeaves();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to apply leave');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Leave Management</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Apply Leave Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:col-span-1">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Apply for Leave</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
              <select 
                value={formData.leaveType}
                onChange={e => setFormData({...formData, leaveType: e.target.value})}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option>Casual Leave</option>
                <option>Sick Leave</option>
                <option>Earned Leave</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input type="date" required min={todayDate} value={formData.startDate} onChange={e => {
                  const newStart = e.target.value;
                  const newDays = calculateDays(newStart, formData.endDate);
                  setFormData({...formData, startDate: newStart, totalDays: newDays});
                }} className="w-full border border-gray-300 rounded-lg p-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input type="date" required min={formData.startDate || todayDate} value={formData.endDate} onChange={e => {
                  const newEnd = e.target.value;
                  const newDays = calculateDays(formData.startDate, newEnd);
                  setFormData({...formData, endDate: newEnd, totalDays: newDays});
                }} className="w-full border border-gray-300 rounded-lg p-2 text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Days (Auto-calculated)</label>
              <input type="number" readOnly value={formData.totalDays} className="w-full border border-gray-200 bg-gray-50 rounded-lg p-2 text-sm text-gray-500 cursor-not-allowed" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
              <textarea required value={formData.reason} onChange={e => setFormData({...formData, reason: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2 text-sm h-24"></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition">Submit Application</button>
          </form>
        </div>

        {/* Leave History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-800 mb-4">{user?.role === 'Admin' ? 'All Leave Requests' : 'My Leave History'}</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-500">
                  {user?.role === 'Admin' && <th className="p-3">Employee</th>}
                  <th className="p-3">Type</th>
                  <th className="p-3">Duration</th>
                  <th className="p-3">Days</th>
                  <th className="p-3">Status</th>
                  {user?.role === 'Admin' && <th className="p-3">Action</th>}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="6" className="p-4 text-center text-gray-500">Loading...</td></tr>
                ) : leaves.length === 0 ? (
                  <tr><td colSpan="6" className="p-4 text-center text-gray-500">No leaves found.</td></tr>
                ) : (
                  leaves.map((leave) => (
                    <tr key={leave._id} className="border-b border-gray-50 text-sm">
                      {user?.role === 'Admin' && <td className="p-3 font-medium">{leave.employee?.name}</td>}
                      <td className="p-3">{leave.leaveType}</td>
                      <td className="p-3 text-gray-500">{new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}</td>
                      <td className="p-3">{leave.totalDays}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${leave.status === 'Approved' ? 'bg-green-100 text-green-700' : leave.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                          {leave.status}
                        </span>
                      </td>
                      {user?.role === 'Admin' && leave.status === 'Pending' && (
                        <td className="p-3 space-x-2">
                          <button onClick={() => {
                            axios.put(`http://localhost:5000/api/v1/leaves/${leave._id}/status`, { status: 'Approved' }, { headers: { Authorization: `Bearer ${token}` } }).then(() => { toast.success('Approved'); fetchLeaves(); });
                          }} className="text-green-600 hover:underline">Approve</button>
                          <button onClick={() => {
                            axios.put(`http://localhost:5000/api/v1/leaves/${leave._id}/status`, { status: 'Rejected' }, { headers: { Authorization: `Bearer ${token}` } }).then(() => { toast.error('Rejected'); fetchLeaves(); });
                          }} className="text-red-600 hover:underline">Reject</button>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveApplication;
