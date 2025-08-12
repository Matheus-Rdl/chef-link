import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/page.jsx";
import Plates from "./pages/plates/page.jsx";
import Profile from "./pages/profile/page.jsx";
import Auth from "./pages/auth/page.jsx";
import Tables from "./pages/tables/page.jsx";
import Orders from "./pages/orders/page.jsx";

const pages = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/plates", element: <Plates /> },
      { path: "/profile", element: <Profile /> },
      { path: "/auth", element: <Auth /> },
      { path: "/tables", element: <Tables /> },
      { path: "/orders/:tableId", element: <Orders /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={pages}></RouterProvider>
  </StrictMode>
);
