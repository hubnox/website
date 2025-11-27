import React, { useState, useMemo, useEffect } from "react";
import CheckIcon from "../../assets/icons/tickets/check.svg";
import SpinnerIcon from "../../assets/icons/tickets/Spinner.svg";
import PaymentResultModal from "./PaymentResultModal";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import PaymentModal from "./PaymentModal";
import { useGetDiscountByCodeMutation } from "../../app/apiSlice";

interface TicketStep3Props {
  subtotal?: number;
  ticketName?: string;
  onClose?: () => void;
  setStep?: (step: number) => void;
  totalTickets?: number;
  email?: string;
  eventId?: string;
  ticketTypeId?: string;
}

const TicketStep3: React.FC<TicketStep3Props> = ({
  subtotal = 25,
  ticketName = "Early Bird",
  onClose,
  setStep,
  totalTickets = 1,
  email,
  eventId,
  ticketTypeId,
}) => {
  const [count, setCount] = useState(1);
  const [discountCode, setDiscountCode] = useState("");
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"success" | "error" | "failed" | "unavailable" | null>(null);
  const [amountType, setAmountType] = useState<"percent" | "fixed">("fixed");

  const stripe = useStripe();
  const elements = useElements();
  const handleMinus = () => count > 1 && setCount((prev) => prev - 1);
  const handlePlus = () => count < totalTickets && setCount((prev) => prev + 1);

  const [appliedDiscountAmount, setAppliedDiscountAmount] = useState(0);
  const [getDiscountByCode, { isLoading: isDiscountLoading }] =
    useGetDiscountByCodeMutation();

  const [ticketsDiscounted, setTicketsDiscounted] = useState(0);
  const [discountId, setDiscountId] = useState<string | null>(null);
  const [discountPerTicket, setDiscountPerTicket] = useState(0);

  const handleApplyDiscount = async () => {
    setIsChecking(true);
    setErrorMsg("");
    try {
      const result = await getDiscountByCode({
        discountCode,
        eventId,
        ticketQuantity: count,
      }).unwrap();
      if (!result?.discount) {
        setIsValid(false);
        setIsDiscountApplied(false);
        setErrorMsg("This discount code is not valid.");
        return;
      }

      setIsDiscountApplied(true);
      setIsValid(true);
      setDiscountId(result.discount.objectId);
      setAmountType(result.amountType);

      let totalDiscount = 0;

      if (result.amountType === "percent") {
        totalDiscount = (subtotal * count * result.discountPerTicket) / 100;
      } else {
        totalDiscount = result.discountPerTicket * result.ticketsApplicable;
      }

      setAppliedDiscountAmount(totalDiscount);
      setTicketsDiscounted(result.ticketsApplicable || 0);
      setDiscountPerTicket(result.discountPerTicket || 0);

    } catch (err) {
      setIsValid(false);
      setErrorMsg("This discount code has expired.");
    } finally {
      setIsChecking(false);
    }
  };

  const handleBuyClick = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);

    try {
      setShowPaymentModal(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    setIsValid(null);
    setIsDiscountApplied(false);
    setErrorMsg("");
  }, [discountCode]);

  const isApplyDisabled =
    !discountCode.trim() || isChecking || (isValid !== null && !isChecking);

  const isBuyDisabled =
    (discountCode.trim() && isValid === null) || isChecking;

  const totalBeforeDiscount = useMemo(() => subtotal * count, [subtotal, count]);

  const subtotalBeforeDiscount = useMemo(() => subtotal * count, [subtotal, count]);

  const platformFeeAmount = useMemo(() => {
    return subtotalBeforeDiscount * 0.04;
  }, [subtotalBeforeDiscount]);

  const paymentFeeAmount = useMemo(() => {
    return (subtotalBeforeDiscount + platformFeeAmount) * 0.029 + 0.3;
  }, [subtotalBeforeDiscount, platformFeeAmount]);

  const discountAmount = useMemo(() => {
    if (!isDiscountApplied || !appliedDiscountAmount) return 0;
    return appliedDiscountAmount;
  }, [isDiscountApplied, appliedDiscountAmount]);

  const total = useMemo(() => {
    const discountedSubtotal = subtotalBeforeDiscount - discountAmount;
    const safeSubtotal = Math.max(discountedSubtotal, 0);
    if(subtotal === 0){
      return 0;
    }
    return safeSubtotal + paymentFeeAmount;
  }, [subtotalBeforeDiscount, discountAmount, paymentFeeAmount]);

  const formatPrice = (priceStr: string) => {
    const numeric = priceStr.replace(/[^\d.]/g, "");
    if (!numeric) return "$0.00";

    const number = parseFloat(numeric);
    return `$${number.toFixed(2)}`;
  };

  useEffect(() => {
    if (!isDiscountApplied) return;

    let totalDiscount = 0;

    if (amountType === "percent") {
      totalDiscount = (subtotal * count * discountPerTicket) / 100;
    } else {
      totalDiscount = discountPerTicket * count;
    }

    setAppliedDiscountAmount(totalDiscount);
  }, [count, discountPerTicket, isDiscountApplied, subtotal, amountType]);

  return (
    <div className="flex flex-col gap-[64px] text-white">
      {(isProcessing || isDiscountLoading) && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <img
            src={SpinnerIcon}
            alt="spinner"
            className="w-10 h-10 animate-spin"
          />
        </div>
      )}
      {showPaymentModal && (
        <PaymentModal
          amount={total}
          onClose={() => setShowPaymentModal(false)}
          onResult={(status) => {
            setShowPaymentModal(false);
            setPaymentStatus(status);
            setShowResultModal(true);
          }}
          email={email}
          eventId={eventId}
          ticketTypeId={ticketTypeId}
          quantity={count}
          discountId={discountId}
          ticketsDiscounted={ticketsDiscounted}
          ticketPrice={subtotal}
        />
      )}
      {showResultModal && paymentStatus && (
        <PaymentResultModal
          status={paymentStatus}
          onBack={() => setShowResultModal(false)}
          onTryAgain={() => {
            setShowResultModal(false);
            setShowPaymentModal(true);
          }}
          onClose={onClose}
          onBackToEvents={() => {
            setStep?.(2);
            setShowResultModal(false);
            setShowPaymentModal(false);
          }}
        />
      )}

      <div className="w-[556px] flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[12px]">
          <span className="font-dmSans font-bold text-[16px] leading-[20px] text-white">
            Please, select number of tickets
          </span>

          <div className="w-[556px] h-[56px] rounded-lg p-2 bg-[#39405A] flex items-center justify-between">
            <div className="flex items-center gap-[4px] whitespace-nowrap">
              <span className="font-dmSans font-normal text-[16px] leading-[20px] text-[#D0D5DD]">
                Ticket type:
              </span>
              <span className="font-dmSans font-bold text-[16px] leading-[20px] text-white">
                {ticketName}
              </span>
              <span className="font-dmSans font-semibold text-[16px] leading-[20px] text-white">
                ({formatPrice(subtotal.toString())} + Fees)
              </span>
            </div>

            <div className="flex items-center gap-[11px] w-[114px] h-[40px] justify-between">
              <button
                onClick={handleMinus}
                disabled={count === 1}
                className="w-[40px] h-[40px] rounded-[4px] p-[4px] flex items-center justify-center bg-[#1B2334]"
              >
                <span
                  className={`text-[20px] leading-[20px] font-bold select-none ${count === 1 ? "text-[#98A2B3]" : "text-white"
                    }`}
                >
                  –
                </span>
              </button>

              <span className="text-[16px] font-dmSans font-bold text-white">
                {count}
              </span>

              <button
                onClick={handlePlus}
                disabled={count === totalTickets}
                className="w-[40px] h-[40px] rounded-[4px] p-[4px] flex items-center justify-center bg-[#1B2334]"
              >
                <span
                  className={`text-[20px] leading-[20px] font-bold select-none ${count === totalTickets ? "text-[#98A2B3]" : "text-white"
                    }`}
                >
                  +
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[12px]">
          <div className="bg-[#39405A] rounded-[8px] p-[8px] flex flex-col gap-[4px]">
            <div className="w-[540px] flex flex-col gap-[8px]">

              <div className="flex justify-between items-center w-full h-[28px] pb-[4px] border-b border-[#475069]">
                <span className="font-dmSans text-[16px] text-[#D0D5DD]">Subtotal:</span>
                <span className="font-dmSans text-[16px] font-bold text-white">${totalBeforeDiscount.toFixed(2)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between items-center w-full h-[28px] pb-[4px] border-b border-[#475069]">
                  <span className="font-dmSans text-[16px] text-[#D0D5DD]">Discount:</span>
                  <span className="font-dmSans text-[16px] font-bold text-[#EE46BC]">-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between items-center w-full h-[28px] pb-[4px] border-b border-[#475069]">
                <span className="font-dmSans text-[16px] text-[#D0D5DD]">Payment fee:</span>
                <span className="font-dmSans text-[16px] font-bold text-white">${paymentFeeAmount.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center w-full h-[28px] pb-[4px] border-b border-[#475069]">
                <span className="font-dmSans text-[16px] text-[#D0D5DD]">Platform fee:</span>
                <span className="font-dmSans text-[16px] font-bold text-white">${platformFeeAmount.toFixed(2)}</span>
              </div>

            </div>

            <div className="w-full h-[20px] flex justify-between items-center mt-[8px]">
              <span className="font-dmSans text-[16px] text-[#D0D5DD]">Total:</span>
              <span className="font-dmSans font-bold text-[16px] text-white">${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex flex-col gap-[6px] relative">
            <span className="font-dmSans text-[14px] text-white">Discount</span>

            <div className="flex items-end justify-between gap-[8px] relative">
              <div
                className={`flex flex-col w-full relative transition-all duration-300 ${isDiscountApplied ? "" : "max-w-[468px]"
                  }`}
              >
                <input
                  type="text"
                  placeholder="Enter code"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className={`w-full h-[44px] rounded-[8px] px-[14px] py-[10px] bg-[#39405A] text-white placeholder-[#D0D5DD] outline-none pr-[36px] ${isValid === true ? "border border-[#12B76A]" : ""
                    } transition-all duration-300`}
                />
                {!isChecking && isValid && (
                  <img
                    src={CheckIcon}
                    alt="valid"
                    className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2"
                  />
                )}
              </div>

              {!isDiscountApplied && (
                <button
                  onClick={handleApplyDiscount}
                  disabled={isApplyDisabled}
                  className={`w-[80px] h-[44px] rounded-[8px] px-[14px] py-[6px] font-dmSans text-[14px] font-medium transition-all duration-200
                    ${isApplyDisabled ? "bg-[#EE46BC80] text-[#8d919a]" : "bg-[#EE46BC] text-white"}
                  `}
                >
                  Apply
                </button>
              )}
            </div>

            <div className="absolute -bottom-[24px] left-0 w-full">
              {errorMsg && (
                <div className="mt-[8px] text-[#F97066] rounded-[4px] font-inter text-[14px] leading-[20px]">
                  {errorMsg}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-[556px] h-[124px] rounded-lg p-4 bg-[#39405A] flex flex-col gap-[8px]">
        <div className="w-[524px] h-[92px] flex flex-col gap-[8px] justify-between">
          <div className="flex items-center whitespace-nowrap leading-none">
            <span className="font-epilogue font-bold text-[20px] leading-[32px] text-white">
              ${total.toFixed(2)}
            </span>
            <span className="font-dmSans font-normal text-[16px] leading-[20px] text-[#D0D5DD]">
              /Fees included
            </span>
          </div>

          <button
            onClick={handleBuyClick}
            disabled={isBuyDisabled}
            className={`w-[524px] h-[52px] rounded-lg px-[18px] py-[16px] font-dmSans font-bold text-[16px] text-white shadow-[0px_1px_2px_0px_#1018280D] ${isBuyDisabled ? "bg-[#3C5BFF80] text-[#8d919a]" : "bg-[#3C5BFF] text-white"
              }`}
          >
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketStep3;
