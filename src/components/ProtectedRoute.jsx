import { Navigate, Route } from "react-router-dom";
import { useUserContext } from "./UserContext";

function ProtectedRoute(props) {
  const { token } = useUserContext();

  return (
    <Route 
      {...props} 
      element={ token ? props.element : <Navigate to="/login" replace={true} />}
    />
  );
}

export default ProtectedRoute;

