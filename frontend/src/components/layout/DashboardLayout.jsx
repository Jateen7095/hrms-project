import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { LogOut, Menu, User, Home, Settings, Calendar } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
  };

  const navLinks = user?.role === 'Admin' ? [
    { name: 'Dashboard', path: '/admin', icon: <Home size={20} /> },
    { name: 'Employees', path: '/admin/employees', icon: <User size={20} /> },
    { name: 'Leave Requests', path: '/admin/leaves', icon: <Calendar size={20} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
  ] : [
    { name: 'Dashboard', path: '/dashboard', icon: <Home size={20} /> },
    { name: 'Leave Application', path: '/dashboard/leaves', icon: <Calendar size={20} /> },
    { name: 'Settings', path: '/dashboard/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-blue-900 text-white transition-all duration-300 flex flex-col`}>
        <div className="h-16 flex items-center justify-center border-b border-blue-800">
          <h1 className="text-xl font-bold">{sidebarOpen ? 'HRMS Portal' : 'HR'}</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navLinks.map((link, idx) => (
            <Link key={idx} to={link.path} className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${location.pathname === link.path ? 'bg-blue-800' : 'hover:bg-blue-800'}`}>
              {link.icon}
              {sidebarOpen && <span>{link.name}</span>}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-blue-800">
          <button onClick={handleLogout} className="flex items-center space-x-3 p-3 w-full rounded-lg hover:bg-red-600 transition-colors">
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-md hover:bg-gray-100">
            <Menu size={24} />
          </button>
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              U
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
