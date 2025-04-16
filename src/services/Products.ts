import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../utils/baseQuery";
import * as I from "../models/IProduct";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery,
  refetchOnFocus: true,
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query<I.IProduct[], string | void>({
      query: (type) => `/product?type=${type}`,
      providesTags: ["Products"],
    }),

    createProduct: builder.mutation<I.IProduct, FormData>({
      query: (formData) => ({
        url: "/product",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation<void, string>({
      // <--- вот это добавили
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),

    getProductTypes: builder.query<I.IProductType[], void>({
      query: () => "/product-types",
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductTypesQuery,
  useLazyGetProductsQuery,
} = productsApi;
