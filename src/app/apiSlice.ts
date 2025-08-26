import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { sampleEvents, sampleCreators } from '../data/sampleData';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_PARSE_SERVER_URL || 'https://parseapi.back4app.com',
    prepareHeaders: (headers) => {
      headers.set('X-Parse-Application-Id', import.meta.env.VITE_PARSE_APP_ID || '');
      headers.set('X-Parse-JavaScript-Key', import.meta.env.VITE_PARSE_JS_KEY || '');
      return headers;
    },
  }),
  tagTypes: ['Creators', 'Events', 'AboutUs'],
  endpoints: (builder) => ({
    getEvents: builder.query({
      queryFn: async () => {
        // Always try the real API first
        try {
          console.log('Attempting to fetch events from API:', import.meta.env.VITE_PARSE_SERVER_URL);
          
          if (!import.meta.env.VITE_PARSE_SERVER_URL || !import.meta.env.VITE_PARSE_APP_ID) {
            console.log('API credentials missing, using sample data');
            return { data: { results: sampleEvents } };
          }
          
          const response = await fetch(`${import.meta.env.VITE_PARSE_SERVER_URL}/classes/Events`, {
            headers: {
              'X-Parse-Application-Id': import.meta.env.VITE_PARSE_APP_ID,
              'X-Parse-JavaScript-Key': import.meta.env.VITE_PARSE_JS_KEY || '',
            },
          });
          
          if (!response.ok) {
            console.log('API response not ok:', response.status, response.statusText);
            throw new Error(`API request failed: ${response.status}`);
          }
          
          const data = await response.json();
          console.log('Successfully fetched events from API:', data.results?.length || 0, 'events');
          return { data };
        } catch (error) {
          console.log('API request failed, using sample data:', error);
          // Fallback to sample data if API fails
          return { data: { results: sampleEvents } };
        }
      },
      providesTags: ['Events'],
    }),

    getCreators: builder.query({
      queryFn: async () => {
        // Always try the real API first
        try {
          console.log('Attempting to fetch creators from API:', import.meta.env.VITE_PARSE_SERVER_URL);
          
          if (!import.meta.env.VITE_PARSE_SERVER_URL || !import.meta.env.VITE_PARSE_APP_ID) {
            console.log('API credentials missing, using sample data');
            return { data: { results: sampleCreators } };
          }
          
          const params = new URLSearchParams({
            where: JSON.stringify({ isCreator: true, isShowOnWeb: true })
          });
          
          const response = await fetch(`${import.meta.env.VITE_PARSE_SERVER_URL}/classes/_User?${params}`, {
            headers: {
              'X-Parse-Application-Id': import.meta.env.VITE_PARSE_APP_ID,
              'X-Parse-JavaScript-Key': import.meta.env.VITE_PARSE_JS_KEY || '',
            },
          });
          
          if (!response.ok) {
            console.log('API response not ok:', response.status, response.statusText);
            throw new Error(`API request failed: ${response.status}`);
          }
          
          const data = await response.json();
          console.log('Successfully fetched creators from API:', data.results?.length || 0, 'creators');
          return { data };
        } catch (error) {
          console.log('API request failed, using sample data:', error);
          // Fallback to sample data if API fails
          return { data: { results: sampleCreators } };
        }
      },
      providesTags: ['Creators'],
    }),
  }),
});

