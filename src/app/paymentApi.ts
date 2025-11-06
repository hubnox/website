import { apiSlice } from "./apiSlice";

type CreatePaymentIntentRequest = {
  amount: number;
};

type CreatePaymentIntentResponse = {
  result: {
    clientSecret: string;
  };
};


export const paymentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation<
      CreatePaymentIntentResponse,
      CreatePaymentIntentRequest
    >({
      query: (body) => ({
        url: "/functions/createPaymentIntent",
        method: "POST",
        body,
      }),
    }),

    saveUserTicketAfterPayment: builder.mutation({
      query: (body) => ({
        url: "/functions/saveUserTicketAfterPayment",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useCreatePaymentIntentMutation,
  useSaveUserTicketAfterPaymentMutation,
} = paymentApi;
