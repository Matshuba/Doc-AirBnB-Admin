import React, { useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { auth } from './firebaseConfig';

import './App.css';
import './Components/Global/Sidebar.css';
import './Components/Global/Topbar.css';
import './Components/Loginform/LoginForm.css';
import './Components/Pages/Dashboard.css';
import './Components/Pages/Report.css';

import RequireAuth from './Components/Pages/Auth';
import Manage from './Components/Pages/Manage';
import Sidebar from './Components/Global/Sidebar';
import DocDetails from "./Components/Pages/DocDetails";
import LoginForm from './Components/Loginform/LoginForm';
import DashboardPage from './Components/Pages/MainDashboard';
const AddDoctor = lazy(() => import('./Components/Pages/AddDoctor'));
const DoctorDetails = lazy(() => import('./Components/Pages/DoctorDetails'));

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("Auth State Changed. User:", user);
      setCurrentUser(user);
      setLoadingAuth(false);
    });
    return () => {
      console.log("Unsubscribing from auth state changes.");
      unsubscribe();
    };
  }, []);

  // Shared layout for protected pages
  const ProtectedLayout = () => (
    <RequireAuth user={currentUser} loading={loadingAuth}>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <main className="p-4 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </RequireAuth>
  );

  return (
    <Router>
      <Suspense fallback={<div>Loading Page...</div>}>
        <Routes>
          {/* Protected Routes */}
          <Route element={<ProtectedLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/add" element={<AddDoctor />} />
           
            <Route path="/dashboard/manage" element={<Manage />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Route>

          {/* Public Route */}
          <Route path="/login" element={<LoginForm />} />

          {/* Fallback */}
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
