import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCreators } from './creatorsApi';
import { Event } from '../types/home-type';

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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const uniqueCreatorIds = Array.from(
            new Set(
              data.results.flatMap((event: Event) => 
                [event.creatorId, ...(event.otherCreators || [])]
              )
            )
          );

          const creators = await Promise.all(
            uniqueCreatorIds.map(async (id) => {
              const response = await fetch(
                `${import.meta.env.VITE_PARSE_SERVER_URL}/classes/_User/${id}`,
                {
                  headers: {
                    'X-Parse-Application-Id': import.meta.env.VITE_PARSE_APP_ID,
                    'X-Parse-JavaScript-Key': import.meta.env.VITE_PARSE_JS_KEY,
                  },
                }
              );
              return response.json();
            })
          );
          dispatch(setCreators(creators));
        } catch (error) {
          console.error('Failed to fetch creators:', error);
        }
      },
    }),
  }),
}); 
