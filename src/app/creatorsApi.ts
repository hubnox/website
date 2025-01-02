import { apiSlice } from './apiSlice';
import { Creator } from '../types';

type CreatorsResponse = {
  results: Creator[];
};

export const creatorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCreators: builder.query<CreatorsResponse, void>({
      query: () => '/classes/_User',
      providesTags: ['Creators'],
    }),
  }),
});

export const { useGetCreatorsQuery } = creatorApi;

