import { apiSlice } from './apiSlice';

import { Event } from "../types/home-type";
type EventsResponse = {
  results: Event[];
};

export const eventsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query<EventsResponse, void>({
      query: () => '/classes/Events',
      providesTags: ['Events'],
    }),
  }),
});

export const { useGetEventsQuery } = eventsApi;
