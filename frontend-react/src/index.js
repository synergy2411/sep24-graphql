import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import RootLayoutPage from "./Pages/RootLayoutPage/RootLayoutPage";
import PostsPage from "./Pages/Posts/Posts";
import client from "./Apollo/client";
import AuthPage from "./Pages/Auth/AuthPage";

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
        element: <PostsPage />,
      },
      {
        path: "/auth",
        element: <AuthPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <RouterProvider router={router}></RouterProvider>
  </ApolloProvider>
);
