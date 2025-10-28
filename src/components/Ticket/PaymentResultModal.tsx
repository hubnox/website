import React from "react";
import PhotosEmptyIcon from "../../assets/icons/tickets/Photos_empty.svg";
interface PaymentResultModalProps {
  message?: string;
  onBack: () => void;
  onTryAgain: () => void;
}

const PaymentResultModal: React.FC<PaymentResultModalProps> = ({
  message = "Your payment could not be processed. Please try another method.",
  onBack,
  onTryAgain,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-[395px] h-[384px] rounded-[8px] bg-[#39405A] p-4 flex flex-col gap-[8px]">
        <div className="w-[363px] h-[352px] mx-auto flex flex-col items-center justify-between gap-[44px]">
          <img srcSet={PhotosEmptyIcon} />

          <p className="font-epilogue font-medium text-[18px] leading-[26px] text-center text-white">
            {message}
          </p>

          <div className="flex gap-[8px] w-[363px] h-[52px]">
            <button
              onClick={onBack}
              className="w-[177.5px] h-[52px] rounded-[8px] border border-[#3C5BFF] text-white font-dmSans font-bold text-[16px] leading-[20px] shadow-[0px_1px_2px_0px_#1018280D] transition-colors hover:bg-[#3C5BFF20]"
            >
              Back
            </button>
            <button
              onClick={onTryAgain}
              className="w-[177.5px] h-[52px] rounded-[8px] bg-[#3C5BFF] text-white font-dmSans font-bold text-[16px] leading-[20px] shadow-[0px_1px_2px_0px_#1018280D] transition-colors hover:bg-[#2F46D1]"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentResultModal;
