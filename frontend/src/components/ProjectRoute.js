// frontend/src/components/ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Usage:
// <ProtectedRoute> → requires any logged-in user
// <ProtectedRoute role='admin'> → requires admin role
const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check role if specified
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  // Allow access
  return children;
};

export default ProtectedRoute;