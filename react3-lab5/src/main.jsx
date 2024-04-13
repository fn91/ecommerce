import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import UseProvider from "./contextos/UserContext.jsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index.jsx";
import { Provider } from "react-redux";
import store from "./redux/store/index.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <UseProvider>
        <RouterProvider router={router} />
      </UseProvider>
    </Provider>
  </React.StrictMode>
);
