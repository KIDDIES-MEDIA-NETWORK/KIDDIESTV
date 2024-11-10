import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BackendURL = process.env.BACKEND_URL;
export const apiSetup = createApi({
  reducerPath: "apiSetup",
  baseQuery: fetchBaseQuery({
    baseUrl: BackendURL,
    credentials: "same-origin",
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      if (token && !headers.get("authorization")) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  
  endpoints(build) {
    return {};
  },
});
