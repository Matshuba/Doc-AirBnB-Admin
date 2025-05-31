import React from "react";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ user, loading, children }) => {
  if (loading) {
    return <div>Loading...</div>; // Or use a spinner component here
  }

  if (!user) {
    console.log("RequireAuth: No user found, redirecting to /login");
    return <Navigate to="/login" replace />;
  }

  console.log("RequireAuth: User found, rendering children");
  return children;
};

export default RequireAuth;
