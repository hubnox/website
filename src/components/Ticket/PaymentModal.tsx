import { useState, useEffect } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import SpinnerIcon from "../../assets/icons/tickets/Spinner.svg";
import { useCreatePaymentIntentMutation, useSaveUserTicketAfterPaymentMutation } from "../../app/paymentApi";
import { useApplyDiscountUsageMutation } from "../../app/apiSlice";

interface PaymentModalProps {
  onClose: () => void;
  onResult: (status: "success" | "error" | "unavailable" | "failed") => void;
  amount: number;
  email?: string;
  eventId?: string;
  ticketTypeId?: string;
  quantity: number;
  discountId?: string | null;
  ticketsDiscounted: number;
  ticketPrice: number;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  amount,
  onResult,
  onClose,
  email,
  eventId,
  ticketTypeId,
  quantity,
  discountId,
  ticketsDiscounted,
  ticketPrice
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const [saveUserTicketAfterPayment] = useSaveUserTicketAfterPaymentMutation();
  const [applyDiscountUsage] = useApplyDiscountUsageMutation();

  useEffect(() => {
    if (ticketPrice === 0) {
      const saveFreeTicket = async () => {
        setIsProcessing(true);
        try {
          await saveUserTicketAfterPayment({
            email,
            eventId,
            ticketTypeId,
            ticketPrice,
            transactionId: "FREE_TICKET",
            quantity,
          }).unwrap();

          if (discountId && ticketsDiscounted > 0) {
            await applyDiscountUsage({
              discountId,
              usedTickets: ticketsDiscounted,
            }).unwrap();
          }

          onResult("success");
        } catch (err) {
          console.error("Error saving free ticket:", err);
          onResult("error");
        } finally {
          setIsProcessing(false);
        }
      };

      saveFreeTicket();
    }
  }, [ticketPrice]);

  const handlePay = async () => {
    if (!stripe || !elements) return;

    setIsProcessing(true);

    try {
      const res = await createPaymentIntent({ amount: Math.round(amount * 100) }).unwrap();
      const clientSecret = res.result?.clientSecret;

      if (!clientSecret) throw new Error("No client secret returned");

      const cardNumberElement = elements.getElement(CardNumberElement);
      if (!cardNumberElement) return;

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardNumberElement },
      });

      if (error) {
        onResult("failed");
      } else if (paymentIntent?.status === "succeeded") {
        try {
          await saveUserTicketAfterPayment({
            email: email,
            eventId: eventId,
            ticketTypeId: ticketTypeId,
            ticketPrice: ticketPrice,
            transactionId: paymentIntent.id,
            quantity,
          }).unwrap();

          if (discountId && ticketsDiscounted > 0) {
            await applyDiscountUsage({
              discountId,
              usedTickets: ticketsDiscounted,
            }).unwrap();
          }

          onResult("success");
        } catch (err) {
          console.error("Error saving ticket:", err);
          onResult("error");
        }
      }
    } catch (err) {
      console.error(err);
      onResult("failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const elementStyle = {
    style: {
      base: {
        color: "#fff",
        fontSize: "16px",
        "::placeholder": { color: "#D0D5DD" },
      },
      invalid: { color: "#F97066" },
    },
  };

  if (ticketPrice === 0 && isProcessing) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <img src={SpinnerIcon} alt="Loading" className="w-10 h-10 animate-spin" />
      </div>
    );
  }
  
  if (ticketPrice === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-[395px] rounded-[8px] bg-[#39405A] p-5 flex flex-col gap-4">
        {isProcessing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-50">
            <img src={SpinnerIcon} alt="Loading" className="w-10 h-10 animate-spin" />
          </div>
        )}

        <h2 className="text-white font-bold text-lg text-center">Enter your card details</h2>

        <div className="flex flex-col gap-2">
          <label className="text-[#D0D5DD] text-sm font-medium">Card Number</label>
          <div className="p-3 bg-[#2B2F45] rounded-lg">
            <CardNumberElement options={elementStyle} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[#D0D5DD] text-sm font-medium">Expiration Date</label>
          <div className="p-3 bg-[#2B2F45] rounded-lg">
            <CardExpiryElement options={elementStyle} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[#D0D5DD] text-sm font-medium">CVC</label>
          <div className="p-3 bg-[#2B2F45] rounded-lg">
            <CardCvcElement options={elementStyle} />
          </div>
        </div>

        <div className="flex gap-[8px] w-full mt-2">
          <button
            onClick={onClose}
            className="flex-1 h-[52px] rounded-[8px] border border-[#3C5BFF] text-white font-bold hover:bg-[#3C5BFF20] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handlePay}
            disabled={isProcessing}
            className="flex-1 h-[52px] rounded-[8px] bg-[#3C5BFF] text-white font-bold hover:bg-[#2F46D1] transition-colors"
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
