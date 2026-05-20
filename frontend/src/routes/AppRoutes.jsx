import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from '../pages/auth/Login';
import DashboardLayout from '../components/layout/DashboardLayout';
import LandingPage from '../pages/LandingPage';

import AdminDashboard from '../pages/admin/AdminDashboard';
import EmployeeList from '../pages/admin/EmployeeList';
import EmployeeDashboard from '../pages/employee/EmployeeDashboard';
import LeaveApplication from '../pages/employee/LeaveApplication';

// Mock pages for now
const NotFound = () => <div className="p-4 flex flex-col items-center justify-center h-full"><h1 className="text-4xl font-bold text-gray-800">404</h1><p className="text-gray-500">Page not found</p></div>;

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<EmployeeDashboard />} />
          <Route path="/dashboard/leaves" element={<LeaveApplication />} />
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/employees" element={
            <ProtectedRoute allowedRoles={['Admin', 'HR']}>
              <EmployeeList />
            </ProtectedRoute>
          } />
          <Route path="/admin/leaves" element={
            <ProtectedRoute allowedRoles={['Admin', 'HR']}>
              <LeaveApplication />
            </ProtectedRoute>
          } />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
