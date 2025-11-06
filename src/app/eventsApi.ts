import { apiSlice } from './apiSlice';
import { TicketOption } from '../components/Ticket/TicketStep2';
import { Event } from "../types/home-type";
type EventsResponse = {
  results: Event[];
};
interface TicketsResponse {
  result: TicketOption[];
}
export const eventsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query<EventsResponse, void>({
      query: () => '/classes/Events',
      providesTags: ['Events'],
    }),
    getTicketsByEventId: builder.query<TicketsResponse, string>({
      query: (eventId) => ({
        url: '/functions/getTicketsByEventId',
        method: 'POST',
        body: { eventId },
      }),
      providesTags: ['EventTickets'],
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useGetEventsQuery, useGetTicketsByEventIdQuery } = eventsApi;
