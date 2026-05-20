import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Trash2, UserPlus, Mail, Briefcase } from 'lucide-react';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useSelector(state => state.auth);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/v1/employees', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEmployees(res.data.data);
    } catch (error) {
      toast.error('Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`http://localhost:5000/api/v1/employees/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Employee deleted successfully');
        fetchEmployees();
      } catch (error) {
        toast.error('Failed to delete employee');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Employee Directory</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition flex items-center">
          <UserPlus size={18} className="mr-2" /> Add Employee
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-500">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Designation</th>
              <th className="p-4">Salary</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="p-4 text-center text-gray-500">Loading...</td></tr>
            ) : employees.length === 0 ? (
              <tr><td colSpan="5" className="p-4 text-center text-gray-500">No employees found.</td></tr>
            ) : (
              employees.map((emp) => (
                <tr key={emp._id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                  <td className="p-4 font-medium text-gray-900">{emp.name}</td>
                  <td className="p-4 text-gray-500">
                    <div className="flex items-center"><Mail size={16} className="mr-2 text-gray-400" />{emp.email}</div>
                  </td>
                  <td className="p-4 text-gray-500">
                    <div className="flex items-center"><Briefcase size={16} className="mr-2 text-gray-400" />{emp.designation || 'N/A'}</div>
                  </td>
                  <td className="p-4 text-gray-900">${emp.salary || 0}</td>
                  <td className="p-4">
                    <button onClick={() => deleteEmployee(emp._id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
