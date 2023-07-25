import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoutes = () => {
  const user = useAuth();
  if (user?.role !== "admin") return <Navigate to="/" />;
  return <Outlet />;
};

export default PrivateRoutes;
