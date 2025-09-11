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
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  );
}

export default App
