import { Navigate, Route } from "react-router-dom";
import { useUserContext } from "./UserContext";

function ProtectedRoute(props) {
  const { token, loading } = useUserContext(); // Destructure loading

  // Render null while loading
  if (loading) return null;

  // Render the intended component when logged in, redirect otherwise
  return (
    <Route
      {...props}
      element={token ? props.element : <Navigate to="/login" replace={true} />}
    />
  );
}

export default ProtectedRoute;
