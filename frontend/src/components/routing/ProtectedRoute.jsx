import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Skeleton from "../ui/Skeleton";

const ProtectedRoute = ({ children }) => {
  const { checkingSession, isAuthenticated } = useAuth();
  const location = useLocation();

  if (checkingSession) {
    return <div className="min-h-screen bg-slate-50 p-6 dark:bg-ink"><Skeleton rows={5} /></div>;
  }

  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location }} />;
  return children;
};

export default ProtectedRoute;
