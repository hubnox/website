import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { sampleEvents, sampleCreators } from '../data/sampleData';

// Check if API environment variables are available
const hasApiConfig = import.meta.env.VITE_PARSE_SERVER_URL && 
                     import.meta.env.VITE_PARSE_APP_ID && 
                     import.meta.env.VITE_PARSE_JS_KEY;

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: hasApiConfig ? fetchBaseQuery({
    baseUrl: import.meta.env.VITE_PARSE_SERVER_URL,
    prepareHeaders: (headers) => {
      headers.set('X-Parse-Application-Id', import.meta.env.VITE_PARSE_APP_ID);
      headers.set('X-Parse-JavaScript-Key', import.meta.env.VITE_PARSE_JS_KEY);
      return headers;
    },
  }) : fetchBaseQuery({ baseUrl: '/' }), // Dummy baseQuery for fallback mode
  tagTypes: ['Creators', 'Events', 'AboutUs'],
  endpoints: (builder) => ({
    getEvents: builder.query({
      queryFn: async () => {
        if (!hasApiConfig) {
          // Return sample data when API is not configured
          return { data: { results: sampleEvents } };
        }
        
        // Use original API call when configured
        try {
          const response = await fetch(`${import.meta.env.VITE_PARSE_SERVER_URL}/classes/Events`, {
            headers: {
              'X-Parse-Application-Id': import.meta.env.VITE_PARSE_APP_ID,
              'X-Parse-JavaScript-Key': import.meta.env.VITE_PARSE_JS_KEY,
            },
          });
          
          if (!response.ok) {
            throw new Error('API request failed');
          }
          
          const data = await response.json();
          return { data };
        } catch (error) {
          // Fallback to sample data if API fails
          return { data: { results: sampleEvents } };
        }
      },
      providesTags: ['Events'],
    }),

    getCreators: builder.query({
      queryFn: async () => {
        if (!hasApiConfig) {
          // Return sample data when API is not configured
          return { data: { results: sampleCreators } };
        }
        
        // Use original API call when configured
        try {
          const params = new URLSearchParams({
            where: JSON.stringify({ isCreator: true, isShowOnWeb: true })
          });
          
          const response = await fetch(`${import.meta.env.VITE_PARSE_SERVER_URL}/classes/_User?${params}`, {
            headers: {
              'X-Parse-Application-Id': import.meta.env.VITE_PARSE_APP_ID,
              'X-Parse-JavaScript-Key': import.meta.env.VITE_PARSE_JS_KEY,
            },
          });
          
          if (!response.ok) {
            throw new Error('API request failed');
          }
          
          const data = await response.json();
          return { data };
        } catch (error) {
          // Fallback to sample data if API fails
          return { data: { results: sampleCreators } };
        }
      },
      providesTags: ['Creators'],
    }),
  }),
});

