// src/routes/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, requiredRole }) {
  const { user } = useAuth();

  if (!user) {
    // Redirect based on role
    const loginPath = requiredRole === 'ROLE_ADMIN' ? '/adminlogin' : '/userlogin';
    return <Navigate to={loginPath} replace />;
  }

  // Role mismatch
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />; // Optional: create a 403 Unauthorized page
  }

  return children;
}
