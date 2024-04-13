/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Promotion from "../banner/Banner.jsx";
import Loader from "../loader/Loader";
import Error from "../fail/Fail.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getProductsLoading,
  getProductsError,
  getProductsThunk,
} from "../../redux/reducers/itemsReducer.js";

export default function Layout() {
  const dispatch = useDispatch();
  const loading = useSelector(getProductsLoading);
  const error = useSelector(getProductsError);

  useEffect(() => {
    dispatch(getProductsThunk());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Promotion />
      {error && <Error error={error} />}
      {loading ? <Loader /> : <Outlet />}
      <Footer />
    </>
  );
}
