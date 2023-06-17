import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const PrivateRoute = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const noTokenExist = token == null || token == undefined;

  const getAuthUser = async () => {
    try {
      if (noTokenExist) {
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
    }
  };

  useEffect(() => {
    getAuthUser();
  }, []);

  return <Outlet />;
};
