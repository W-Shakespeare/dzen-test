// services/ordersApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import * as I from "../models/IOrder";
import { baseQuery } from "../utils/baseQuery";

const transformResponseGetOrders = (response: I.IOrder[]) => {
  return response.map((order) => {
    const productCount = order.products.length;

    let totalUSD = 0;
    let totalOtherCurrency = 0;

    order.products.forEach((product) => {
      product.price.forEach((price) => {
        if (price.symbol === "USD") {
          totalUSD += price.value;
        } else {
          totalOtherCurrency += price.value;
        }
      });
    });

    return {
      ...order,
      productCount,
      totalUSD,
      totalOtherCurrency,
    };
  });
};

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery,
  refetchOnFocus: true,
  tagTypes: ["Orders", "OrderProductIds"],
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => "/order",
      transformResponse: transformResponseGetOrders,
      providesTags: ["Orders"],
    }),

    createOrder: builder.mutation<any, I.ICreateOrder>({
      query: (newOrder) => ({
        url: `/order`,
        method: "POST",
        body: newOrder,
      }),
      invalidatesTags: ["Orders"],
    }),

    updateOrder: builder.mutation<any, { id: string; order: I.IUpdateOrder }>({
      query: ({ id, order }) => ({
        url: `/order/${id}`,
        method: "PATCH",
        body: order,
      }),
      invalidatesTags: ["Orders"],
    }),

    getOrderProductIds: builder.query<string[], string>({
      query: (orderId) => `/order/${orderId}/products`,
      providesTags: ["OrderProductIds"],
    }),

    deleteProductFromOrder: builder.mutation<
      void,
      { orderId: string; productsToRemove: string[] }
    >({
      query: ({ orderId, productsToRemove }) => ({
        url: `/order/${orderId}/products`,
        method: "PATCH",
        body: { productsToRemove },
      }),
      invalidatesTags: ["Orders", "OrderProductIds"],
    }),

    addProductsToOrder: builder.mutation<
      void,
      { orderId: string; productsToAdd: string[] }
    >({
      query: ({ orderId, productsToAdd }) => ({
        url: `/order/${orderId}/products`,
        method: "PATCH",
        body: { productsToAdd },
      }),
      invalidatesTags: ["OrderProductIds", "Orders"],
    }),

    deleteOrder: builder.mutation<void, string>({
      query: (orderId) => ({
        url: `/order/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useDeleteProductFromOrderMutation,
  useAddProductsToOrderMutation,
  useDeleteOrderMutation,
  useGetOrderProductIdsQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
} = ordersApi;
