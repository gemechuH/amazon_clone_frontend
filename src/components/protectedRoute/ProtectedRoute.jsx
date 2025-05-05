import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProtectedRoute = ({
  children,
  msg = "Please login to continue",
  redirectTo = "/SignUp",
}) => {
  const user = useSelector((state) => state.auth?.user);
  const location = useLocation();

  if (!user) {
    // Show message to user
    toast.info(msg);

    // Pass the current location to redirect back after login
    return (
      <Navigate to={redirectTo} state={{ from: location.pathname }} replace />
    );
  }

  // If we have a stored path in location state, and we're authenticated,
  // return to the original protected route
  if (location.state?.returnTo) {
    return <Navigate to={location.state.returnTo} replace />;
  }

  return children;
};

export default ProtectedRoute;
