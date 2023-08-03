import { Routes, Route } from 'react-router-dom'
import './App.css'
import About from './pages/About'
import Account from './pages/Account'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Vans from './pages/Vans'
import { useUserContext } from './components/UserContext'
import { Navigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  // Use the user context to get the token (to check if user is authenticated)
  const { token } = useUserContext()

  // This component is used to protect routes from being accessed by unauthenticated users.
  // If there is no token (user is not authenticated), it redirects to the login page.
  const ProtectedElement = ({ children }) =>
    token ? children : <Navigate to="/login" replace={true} />

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
      <ToastContainer
        position="top-right"
        autoClose={4000}
        limit={2}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastStyle={{ backgroundColor: '#36413fe0', color: '#f8f8f8', border: '#f8f8f8' }}
      />
    </div>
  )
}

export default App
