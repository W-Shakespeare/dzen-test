import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../utils/baseQuery';
import * as I from '../models/IAuth';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  refetchOnFocus: true,
  tagTypes: ['Auth'],
  endpoints: builder => ({
    login: builder.mutation<any, I.ILogin>({
      query: ({ email, password }) => ({
        url: `/login/`,
        method: 'POST',
        body: { email, password },
      }),
    }),

    register: builder.mutation<any, I.IRegister>({
      query: ({ username, email, password }) => ({
        url: `/register/`,
        method: 'POST',
        body: { username, email, password },
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
