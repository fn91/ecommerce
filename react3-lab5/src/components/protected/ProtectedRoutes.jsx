/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../../contextos/UserContext";

export default function ProtectedRoutes({ children }) {
  const location = useLocation();
  const { user } = useContext(UserContext);
  return user.isLogged ? (
    children
  ) : (
    <Navigate
      to="/login"
      state={location}
    />
  );
}
