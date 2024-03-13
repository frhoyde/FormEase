import { Navigate, Outlet } from "react-router-dom";

interface AuthRouteComponentProps {}

export const AuthRouteComponent: React.FC<AuthRouteComponentProps> = (
  props: AuthRouteComponentProps
) => {
  const isAuthenticated = window.localStorage.getItem("jwt") !== null;

  if (isAuthenticated) {
    return <Navigate to={`/location/select`} />;
  } else {
    return <Outlet />;
  }
};