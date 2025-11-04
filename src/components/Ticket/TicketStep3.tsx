import React, { useState, useMemo, useEffect } from "react";
import CheckIcon from "../../assets/icons/tickets/check.svg";
import SpinnerIcon from "../../assets/icons/tickets/Spinner.svg";
import PaymentResultModal from "./PaymentResultModal";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import PaymentModal from "./PaymentModal";
interface TicketStep3Props {
  subtotal?: number;
  ticketName?: string;
  ticketPriceLabel?: string;
  onClose?: () => void;
  setStep?: (step: number) => void;
  totalTickets?: number;
}

const TicketStep3: React.FC<TicketStep3Props> = ({
  subtotal = 25,
  ticketName = "Early Bird",
  ticketPriceLabel = "$25.00 + Fees",
  onClose,
  setStep,
  totalTickets = 0,
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

  const stripe = useStripe();
  const elements = useElements();
  const handleMinus = () => count > 1 && setCount((prev) => prev - 1);
  const handlePlus = () => count < totalTickets && setCount((prev) => prev + 1);

  const handleApplyDiscount = () => {
    setIsChecking(true);
    setErrorMsg("");

    setTimeout(() => {
      setIsChecking(false);

      if (discountCode.trim().toLowerCase() === "test123") {
        setIsValid(true);
        setIsDiscountApplied(true);
        setErrorMsg("");
      } else {
        setIsValid(false);
        setIsDiscountApplied(false);
        setErrorMsg("This discount code has expired.");
      }
    }, 800);
  };

  const handleBuyClick = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);

    try {
      setShowPaymentModal(true);
    } catch (err) {
      console.error(err);
      alert("Payment failed");
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
  const platformFeeAmount = useMemo(() => {
    return subtotal > 0 ? subtotal * count * 0.04 : 0;
  }, [subtotal, count]);

  const paymentFeeAmount = useMemo(() => {
    const basePlusPlatform = subtotal * count + platformFeeAmount;
    return subtotal > 0 ? basePlusPlatform * 0.029 + 0.3 : 0;
  }, [subtotal, count, platformFeeAmount]);

  const total = useMemo(() => {
    return subtotal * count + platformFeeAmount + paymentFeeAmount;
  }, [subtotal, count, platformFeeAmount, paymentFeeAmount]);

  return (
    <div className="flex flex-col gap-[64px] text-white">
      {isProcessing && (
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

      <div className="w-[556px] h-[350px] flex flex-col gap-[24px]">
        <div className="w-[556px] h-[88px] flex flex-col gap-[12px]">
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
                ({ticketPriceLabel})
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

        <div className="w-[556px] h-[238px] flex flex-col justify-between">
          <div className="w-[556px] h-[152px] bg-[#39405A] rounded-[8px] p-[8px] flex flex-col gap-[4px]">
            <div className="w-[540px] flex flex-col gap-[8px]">
              {[
                { label: "Subtotal:", value: subtotal * count },
                ...(platformFeeAmount > 0 ? [{ label: "Platform fee:", value: platformFeeAmount }] : []),
                ...(paymentFeeAmount > 0 ? [{ label: "Payment fee:", value: paymentFeeAmount }] : []),
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex justify-between items-center w-[540px] h-[28px] pb-[4px] border-b border-[#475069]"
                >
                  <span className="font-dmSans text-[16px] text-[#D0D5DD]">{label}</span>
                  <span className="font-dmSans text-[16px] font-bold text-white">${value.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="w-[540px] h-[20px] flex justify-between items-center mt-[8px]">
              <span className="font-dmSans text-[16px] text-[#D0D5DD]">
                Total:
              </span>
              <span className="font-dmSans font-bold text-[16px] text-white">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-[6px] relative">
            <span className="font-dmSans text-[14px] text-white">
              Discount
            </span>

            <div className="flex items-end justify-between gap-[8px] relative">
              <div
                className={`flex flex-col w-full relative transition-all duration-300 ${isDiscountApplied ? "" : "max-w-[468px]"
                  }`}
              >
                <input
                  type="text"
                  placeholder="Enter discount code"
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
                  className={`w-[80px] h-[44px] rounded-[8px] px-[14px] py-[6px] font-dmSans text-[14px] font-medium text-white transition-all duration-200 ${isApplyDisabled ? "bg-[#EE46BC80]" : "bg-[#EE46BC]"
                    }`}
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
            className={`w-[524px] h-[52px] rounded-lg px-[18px] py-[16px] font-dmSans font-bold text-[16px] text-white shadow-[0px_1px_2px_0px_#1018280D] ${isBuyDisabled ? "bg-[#3C5BFF80]" : "bg-[#3C5BFF]"
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
