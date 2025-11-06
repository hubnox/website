import { apiSlice } from './apiSlice';

type CheckOrCreateUserResponse = {
  success: boolean;
  userId: string;
  existing: boolean;
  message?: string;
};

type CheckOrCreateUserRequest = {
  email: string;
};

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    checkOrCreateUserByEmail: builder.mutation<
      CheckOrCreateUserResponse,
      CheckOrCreateUserRequest
    >({
      query: (body) => ({
        url: '/functions/checkOrCreateUserByEmail',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Creators'], 
    }),
  }),
});

export const { useCheckOrCreateUserByEmailMutation } = userApi;
