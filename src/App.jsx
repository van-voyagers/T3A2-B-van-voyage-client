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
  const { token } = useUserContext();

  const ProtectedElement = ({ children }) =>
    token ? children : <Navigate to="/login" replace={true} />;

  return (
    <div className="bg-voyage-grey min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/account"
          element={
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
