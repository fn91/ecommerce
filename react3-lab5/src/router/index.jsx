import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Error from "../components/fail/Fail";
import MainContent from "../components/content/MainContent";
import ShoppingCart from "../components/shopcard/ShoppingCart";
import LoginForm from "../components/login/Login";
import ProtectedRoutes from "../components/protected/ProtectedRoutes";
import ProductDetails from "../components/details/ProductDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <MainContent />,
      },
      {
        path: "/product/:id",
        element: (
          <ProtectedRoutes>
            <ProductDetails />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoutes>
            <ShoppingCart />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);
