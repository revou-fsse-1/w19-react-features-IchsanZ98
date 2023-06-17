import { Navigate } from "react-router-dom";

export const AuthRoute = () => {
  const token = localStorage.getItem("token");
  const noTokenExist = token == null || token == undefined;
  const isAuthenticated = () => {
    if (noTokenExist) {
      return false;
    }

    return true;
  };

  return isAuthenticated() ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};
