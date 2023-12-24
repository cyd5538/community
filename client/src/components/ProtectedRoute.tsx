import { Navigate, Outlet } from "react-router-dom";

interface Props {
  user: boolean;
  children: React.ReactNode;
  redirectTo?: string;
}

export const ProtectedRoute = ({
  user,
  children,
  redirectTo = "/login",
}: Props) => {
  if (!user) return <Navigate to={redirectTo} />;
  return children ? children : <Outlet />;
};