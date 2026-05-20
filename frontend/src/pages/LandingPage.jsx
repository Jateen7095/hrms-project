import { Link } from 'react-router-dom';
import { ShieldCheck, Users, Clock, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b border-gray-100 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-extrabold text-blue-600">HRMS<span className="text-gray-900">Pro</span></span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium">Log in</Link>
              <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition">Sign up</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-6">
                Manage your workforce with <span className="text-blue-600">Confidence</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 mb-10">
                The all-in-one Human Resource Management System for modern teams. Streamline payroll, automate leave requests, and track attendance effortlessly.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Link to="/login" className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition flex items-center justify-center shadow-lg shadow-blue-500/30">
                  Get Started <ArrowRight className="ml-2" size={20} />
                </Link>
                <Link to="/dashboard" className="bg-white text-gray-700 border border-gray-300 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-50 transition flex items-center justify-center">
                  View Dashboard
                </Link>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-2xl shadow-2xl lg:max-w-md overflow-hidden">
                <img
                  className="w-full object-cover"
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
                  alt="Team working together"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent mix-blend-multiply"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Everything you need to manage your team</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition overflow-hidden group">
              <div className="h-48 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" alt="Employee Directory" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-8">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 -mt-14 relative z-10 border-4 border-white shadow-sm">
                  <Users size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Employee Directory</h3>
                <p className="text-gray-500">Centralized database for all your employee records, documents, and structural organization.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition overflow-hidden group">
              <div className="h-48 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" alt="Time & Attendance" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-8">
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6 -mt-14 relative z-10 border-4 border-white shadow-sm">
                  <Clock size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Time & Attendance</h3>
                <p className="text-gray-500">Track check-ins, working hours, and manage leave requests with automated approval workflows.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition overflow-hidden group">
              <div className="h-48 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1550565118-3a14e8d0386f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" alt="Role-Based Access" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-8">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6 -mt-14 relative z-10 border-4 border-white shadow-sm">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Role-Based Access</h3>
                <p className="text-gray-500">Secure access control ensuring Employees, HR, and Admins only see what they need to see.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
