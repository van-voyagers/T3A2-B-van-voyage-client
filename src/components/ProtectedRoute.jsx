import { Navigate, Route } from "react-router-dom";
import { useUserContext } from "./UserContext";

function ProtectedRoute(props) {
  // Extract token and loading state from the user context
  const { token, loading } = useUserContext(); 

  // When the loading state is true, render nothing (null) while the user data is being loaded
  if (loading) return null;

  // Render the component intended for this route if the user is authenticated (token exists),
  // If not authenticated, redirect the user to the login page.
  return (
    <Route
      {...props}
      element={token ? props.element : <Navigate to="/login" replace={true} />}
    />
  );
}

export default ProtectedRoute;

