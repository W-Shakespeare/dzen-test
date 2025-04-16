import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query";
import { RootState } from "../redux";
import { setRedirectToSignIn, updateToken } from "../redux/Auth";

enum Headers {
  Authorization = "authorization",
  Accept = "Accept",
}
// process.env.REACT_APP_API_URL_PRODUCTION
const baseQuery = fetchBaseQuery({
  baseUrl: `https://test-todo-be.onrender.com`,
  paramsSerializer: (params) => {
    const queryParams = new URLSearchParams();

    for (const param in params) {
      if (Array.isArray(params[param])) {
        params[param].forEach((value: any) => {
          queryParams.append(param, value.toString());
        });
      } else {
        queryParams.set(param, params[param].toString());
      }
    }

    return queryParams.toString();
  },

  prepareHeaders: (headers, { getState }) => {
    const localToken =
      localStorage.getItem("auth") || sessionStorage.getItem("auth");
    const token = (getState() as RootState).auth?.access_token || localToken;

    if (token) {
      headers.set(Headers.Authorization, `token ${token}`);
    }
    headers.set(Headers.Accept, "application/json");
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    localStorage.clear();
    sessionStorage.clear();
    api.dispatch(setRedirectToSignIn(true));
    api.dispatch(updateToken(null));
  }
  return result;
};

export { baseQueryWithReauth as baseQuery };
