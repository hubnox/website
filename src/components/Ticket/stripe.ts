
import { loadStripe } from "@stripe/stripe-js";
const VITE_STRIPE_PUBLISHABLE_KEY = "pk_test_51Q6ELFIbapYzGEkCui2t5NyVJG6LkaZW3wZW9y2YBs1uewMXut1X8m1aGueZjAiY0XgMSwIQ2qndKmTHHl15UTqQ00tmqGPnBh";
export const stripePromise = loadStripe(VITE_STRIPE_PUBLISHABLE_KEY);
