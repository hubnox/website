import { AboutUs } from '../types/home-type';
import { apiSlice } from './apiSlice';

export const aboutUsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAboutUs: builder.query<AboutUs[], void>({
      query: () => '/classes/About-us',
      providesTags: ['AboutUs'],
    }),
  }),
});

export const { useGetAboutUsQuery } = aboutUsApi;
