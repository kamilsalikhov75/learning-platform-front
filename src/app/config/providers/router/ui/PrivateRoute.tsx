import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Role } from "entities/auth";
import { useAuth } from "entities/auth/model";

export interface PrivateRouteProps {
  children: React.ReactNode;
  role?: Role;
}

export const PrivateRoute = ({ children, role }: PrivateRouteProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("access_token");

    if (!token) {
      return navigate("/auth/login");
    }

    if (role && role !== user?.role) {
      return navigate("/");
    }
  }, [user, navigate, role]);

  return children;
};
