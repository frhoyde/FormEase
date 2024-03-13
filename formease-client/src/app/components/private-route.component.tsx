import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";

interface PrivateRouteComponentProps {
  role: string;
}

export const PrivateRouteComponent: React.FC<PrivateRouteComponentProps> = (
  props: PrivateRouteComponentProps
) => {

  const isAuthenticated = window.localStorage.getItem("jwt") !== null;

  if (isAuthenticated) {
    return <Outlet />;
  } else {
      toast("Error",{
        description: "Please login as a valid user",
        duration: 2000,
      });
    
    window.localStorage.clear();
    return <Navigate to="/login" />;
  }
};