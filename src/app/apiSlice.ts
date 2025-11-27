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
  tagTypes: ['Creators', 'Events', 'AboutUs', 'EventTickets'],
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

    getDiscountByCode: builder.mutation({
      queryFn: async ({ discountCode, eventId, ticketQuantity }) => {
        try {
          const SERVER = import.meta.env.VITE_PARSE_SERVER_URL;
          const APP_ID = import.meta.env.VITE_PARSE_APP_ID;
          const JS_KEY = import.meta.env.VITE_PARSE_JS_KEY || "";

          if (!SERVER || !APP_ID) return { data: null };

          const where = encodeURIComponent(JSON.stringify({ discountCode, eventId }));
          const response = await fetch(`${SERVER}/classes/Discounts?where=${where}`, {
            headers: {
              "X-Parse-Application-Id": APP_ID,
              "X-Parse-JavaScript-Key": JS_KEY,
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) throw new Error("Discount API request failed");

          const { results } = await response.json();
          const discount = results[0];

          if (!discount) {
            return { error: { status: 404, data: "Discount code not found" } };
          }

          const now = new Date();
          const finishDate = new Date(discount.finishDateAndTime);
          if (finishDate < now) {
            return { error: { status: 400, data: "Discount code expired" } };
          }

          const max = discount.maxNumberOfTickets ?? 0;
          const ticketsApplicable = Math.min(ticketQuantity, max);

          if (ticketsApplicable === 0) {
            return { error: { status: 400, data: "No discounted tickets left" } };
          }
          const discountPerTicket = discount.amount || 0;
          const amountType: "percent" | "fixed" = discount.amountType || "fixed"; 

          return {
            data: {
              discount,
              discountPerTicket,
              ticketsApplicable,
              amountType,
            },
          };
        } catch (error) {
          console.error("Discount code processing error:", error);
          return { error: { status: 500, data: "Discount processing failed" } };
        }
      },
    }),
    
    applyDiscountUsage: builder.mutation({
      queryFn: async ({ discountId, usedTickets }) => {
        try {
          const SERVER = import.meta.env.VITE_PARSE_SERVER_URL;
          const APP_ID = import.meta.env.VITE_PARSE_APP_ID;
          const JS_KEY = import.meta.env.VITE_PARSE_JS_KEY || "";

          if (!SERVER || !APP_ID) {
            return { error: { status: 500, data: "Parse config missing" } };
          }

          if (!discountId || !usedTickets) {
            return { error: { status: 400, data: "Missing required parameters" } };
          }

          const responseGet = await fetch(`${SERVER}/classes/Discounts/${discountId}`, {
            headers: {
              "X-Parse-Application-Id": APP_ID,
              "X-Parse-JavaScript-Key": JS_KEY,
            },
          });

          if (!responseGet.ok) throw new Error("Failed to fetch discount");

          const { maxNumberOfTickets, totalUsageCount, } = await responseGet.json();

          const updated = {
            maxNumberOfTickets: (maxNumberOfTickets || 0) - usedTickets,
            totalUsageCount: (totalUsageCount || 0) + usedTickets,
          };

          const responsePut = await fetch(`${SERVER}/classes/Discounts/${discountId}`, {
            method: "PUT",
            headers: {
              "X-Parse-Application-Id": APP_ID,
              "X-Parse-JavaScript-Key": JS_KEY,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updated),
          });

          if (!responsePut.ok) {
            const json = await responsePut.json();
            return { error: { status: responsePut.status, data: json.error || "Failed" } };
          }

          return { data: { success: true, updated } };
        } catch (error) {
          console.error("applyDiscountUsage error:", error);
          return { error: { status: 500, data: "applyDiscountUsage failed" } };
        }
      },
    }),

  }),
});
export const {
  useGetDiscountByCodeMutation,
  useApplyDiscountUsageMutation,
} = apiSlice;
