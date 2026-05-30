import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import PageLoader from '../common/PageLoader';
import { isValidPhoneNumber } from '../../utils/phoneValidation';

/**
 * ProtectedRoute — requires the user to be logged in (token exists + /profile/me succeeds).
 * While loading: shows PageLoader (never redirects prematurely).
 * Not logged in: redirects to /login.
 */
export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <PageLoader message="Checking your session..." />;
  if (!user)   return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
}



/**
 * ProfileGuard — requires login AND profileComplete === true.
 * While loading: shows PageLoader.
 * Not logged in: → /login
 * Logged in but profile incomplete: → /complete-profile
 */
export function ProfileGuard({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <PageLoader message="Checking your session..." />;
  if (!user) return <Navigate to="/login" replace />;

  // CoBrother can only access /cobrother
  if (user.role === 'COBROTHER') return <Navigate to="/cobrother" replace />;

  if (!user.profileComplete || !isValidPhoneNumber(user.phoneNumber || user.phone || '')) {
    return <Navigate to="/complete-profile" replace />;
  }
  return children;
}


export function AdminGuard({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <PageLoader message="Checking your session..." />;
  if (!user) return <Navigate to="/login" replace />;
  const roleUpper = (user.role ?? '').toString().toUpperCase();
  if (roleUpper !== 'ADMIN' && roleUpper !== 'ROLE_ADMIN') {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

export function CoBrotherGuard({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <PageLoader message="Checking your session..." />;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'COBROTHER') return <Navigate to="/dashboard" replace />;
  return children;
}