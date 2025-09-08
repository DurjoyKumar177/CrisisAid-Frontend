import './App.css'

import Home from "./pages/Home";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import "./index.css";



function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        {/* Add more routes here as needed */}
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  );
}

export default App
