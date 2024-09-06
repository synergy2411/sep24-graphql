import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import RootLayoutPage from "./Pages/RootLayoutPage/RootLayoutPage";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayoutPage />,
    children: [
      {
        path: "",
        element: <h1>Home Page</h1>,
      },
      {
        path: "/posts",
        element: <h1>Posts coming soon</h1>,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router}></RouterProvider>);
