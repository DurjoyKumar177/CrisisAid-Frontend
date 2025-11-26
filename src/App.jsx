import './App.css'
import Home from "./pages/Home";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import "./index.css";
import Login from './pages/Login';
import Signup from './pages/Signup';
import VerifyEmail from './pages/VerifyEmail';
import Profile from './pages/Profile';
import Pending from './pages/Pending';
import AuthCallback from './pages/AuthCallback';
import CrisisListing from './pages/CrisisListing';
import CrisisDetail from './pages/CrisisDetail';
import DonatePage from './pages/DonatePage';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        
        {/* Auth routes */}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="verify-email/:key" element={<VerifyEmail />} />
        <Route path="pending" element={<Pending />} />
        <Route path="profile" element={<Profile />} />
        
        {/* Crisis routes */}
        <Route path="crisis" element={<CrisisListing />} />
        <Route path="crisis/:id" element={<CrisisDetail />} />
        <Route path="donate" element={<DonatePage />} />
        
        {/* OAuth callback route */}
        <Route path="auth/callback" element={<AuthCallback />} />
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  );
}

export default App