
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Login from '../components/auth/Login';
import Layout from '../components/common/Layout';
import Dashboard from '../components/views/Dashboard';
import CurrentRealityTreeView from '../components/views/CurrentRealityTreeView';
import ConflictCloudView from '../components/views/ConflictCloudView';
import PrerequisiteTreeView from '../components/views/PrerequisiteTreeView';
import UserManagementView from '../components/views/UserManagementView';
import ModuleManagementView from '../components/views/ModuleManagementView';
import { UserRole } from '../types';


const ProtectedRoute: React.FC<{ children: React.ReactNode; adminOnly?: boolean }> = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (adminOnly && user?.role !== UserRole.ADMIN) {
     return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};


const AppRouter = () => {
    const { isAuthenticated } = useAuth();
    
    return (
        <HashRouter>
            <Routes>
                <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
                <Route
                    path="/*"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Routes>
                                    <Route path="/" element={<Dashboard />} />
                                    <Route path="/reality-tree" element={<CurrentRealityTreeView />} />
                                    <Route path="/conflict-cloud" element={<ConflictCloudView />} />
                                    <Route path="/prerequisite-tree" element={<PrerequisiteTreeView />} />
                                    <Route path="/admin/users" element={
                                        <ProtectedRoute adminOnly={true}>
                                            <UserManagementView />
                                        </ProtectedRoute>
                                    } />
                                    <Route path="/admin/modules" element={
                                        <ProtectedRoute adminOnly={true}>
                                            <ModuleManagementView />
                                        </ProtectedRoute>
                                    } />
                                    <Route path="*" element={<Navigate to="/" />} />
                                </Routes>
                            </Layout>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </HashRouter>
    );
};

export default AppRouter;
