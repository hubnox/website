import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_PARSE_SERVER_URL,
    prepareHeaders: (headers) => {
      headers.set('X-Parse-Application-Id', import.meta.env.VITE_PARSE_APP_ID);
      headers.set('X-Parse-JavaScript-Key', import.meta.env.VITE_PARSE_JS_KEY);
      return headers;
    },
  }),
  tagTypes: ['Creators', 'Events', 'AboutUs'],
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => ({
        url: '/classes/Events',
        method: 'GET',
      }),
      providesTags: ['Events'],
    }),

    getCreators: builder.query({
      query: () => ({
        url: '/classes/_User',
        method: 'GET',
        params: {
          where: JSON.stringify({ isCreator: true, isShowOnWeb: true }),
        },
      }),
      providesTags: ['Creators'],
    }),
  }),
});

