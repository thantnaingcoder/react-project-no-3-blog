import { Navigate } from "react-router-dom";

// This component checks for a valid token before rendering the child component
const ProtectedRoute = ({ token, children }: { token: string; children: JSX.Element }) => {
  if (!token) {
    // If the token is not present, redirect to the login page (or any other route)
    return <Navigate to="/"   />;
  }

  // If token is valid, render the children
  return children;
};

export default ProtectedRoute;
