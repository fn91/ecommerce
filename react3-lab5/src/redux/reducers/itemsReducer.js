import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as PRODUCT_API from "../../api/productsmiddle.js";

const initialData = {
  products: null,
  loading: true,
  error: "sasa",
};

export const getProductsThunk = createAsyncThunk(
  "products/getProducts",
  async () => {
    const response = await PRODUCT_API.getProductsMiddleware();
    return response;
  }
);

export const removeProductThunk = createAsyncThunk(
  "products/removeProduct",
  async (id) => {
    await PRODUCT_API.removeProductMiddleware(id);
    return id;
  }
);

export const addProductThunk = createAsyncThunk(
  "products/addProduct",
  async (newProduct) => {
    await PRODUCT_API.addProductMiddleware(newProduct);
    return newProduct;
  }
);
export const updateProductThunk = createAsyncThunk(
  "products/updateProduct",
  async (product) => {
    await PRODUCT_API.updateProductMiddleware(product);
    return product;
  }
);



const productsSlice = createSlice({
  name: "products",
  initialState: initialData,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(removeProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      })
      .addCase(addProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products = [...state.products, action.payload];
      })
      .addCase(updateProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        );
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
         
        }
      );
  },
});

export const { getProducts } = productsSlice.actions;

export const getAllProducts = (state) => state.products.products;
export const getProductsLoading = (state) => state.products.loading;
export const getProductsError = (state) => state.products.error;

export default productsSlice.reducer;
