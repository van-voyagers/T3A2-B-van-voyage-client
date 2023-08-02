import { Routes, Route } from "react-router-dom";
import "./App.css";
import About from "./pages/About";
import Account from "./pages/Account";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Vans from "./pages/Vans";
import { useUserContext } from "./components/UserContext";
import { Navigate } from "react-router-dom";

function App() {
  // Use the user context to get the token (to check if user is authenticated)
  const { token } = useUserContext();

  // This component is used to protect routes from being accessed by unauthenticated users.
  // If there is no token (user is not authenticated), it redirects to the login page.
  const ProtectedElement = ({ children }) =>
    token ? children : <Navigate to="/login" replace={true} />;

  return (
    // This div is the container for the whole application.
    <div className="bg-voyage-grey min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/account"
          element={
            // Wrap the Account component with ProtectedElement to prevent unauthenticated access
            <ProtectedElement>
              <Account />
            </ProtectedElement>
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/vans" element={<Vans />} />
      </Routes>
    </div>
  );
}

export default App;
