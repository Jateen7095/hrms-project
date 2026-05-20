import { Users, Briefcase, Calendar, DollarSign } from 'lucide-react';
import { useSelector } from 'react-redux';

const AdminDashboard = () => {
  const { user } = useSelector(state => state.auth);

  const stats = [
    { title: 'Total Employees', value: '156', icon: <Users size={24} className="text-blue-500" />, bg: 'bg-blue-50' },
    { title: 'Departments', value: '12', icon: <Briefcase size={24} className="text-indigo-500" />, bg: 'bg-indigo-50' },
    { title: 'On Leave Today', value: '8', icon: <Calendar size={24} className="text-orange-500" />, bg: 'bg-orange-50' },
    { title: 'Monthly Payroll', value: '$245K', icon: <DollarSign size={24} className="text-emerald-500" />, bg: 'bg-emerald-50' },
  ];

  return (
    <div className="space-y-6">
      {/* Banner Section */}
      <div className="relative bg-indigo-900 rounded-2xl shadow-sm overflow-hidden text-white mb-6">
        <div className="absolute inset-0 z-0 opacity-30">
          <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80" alt="Admin Banner" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 p-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-6">
            <img src={`https://ui-avatars.com/api/?name=${user?.name}&background=ffffff&color=4338ca&size=128&bold=true`} alt="Avatar" className="w-20 h-20 rounded-full border-4 border-white shadow-lg" />
            <div>
              <h2 className="text-3xl font-bold">Welcome back, {user?.name}</h2>
              <p className="text-indigo-200 mt-1 text-lg">System Administration Overview</p>
            </div>
          </div>
          <div className="mt-4 sm:mt-0 text-sm font-medium bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center space-x-4">
            <div className={`p-4 rounded-full ${stat.bg}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 col-span-2">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Employee Growth Analytics</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-200">
             {/* Chart placeholder */}
             <p className="text-gray-400">Chart will be rendered here via Recharts</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1,2,3,4].map((i) => (
              <div key={i} className="flex items-start space-x-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                <div>
                  <p className="text-sm text-gray-800 font-medium">New employee onboarded</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
