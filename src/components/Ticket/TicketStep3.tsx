import React, { useState, useMemo } from "react";

interface TicketStep3Props {
  onBuy: () => void;
  subtotal?: number;
  paymentFee?: number;
  platformFee?: number;
  ticketName?: string;
  ticketPriceLabel?: string; 
}

const TicketStep3: React.FC<TicketStep3Props> = ({
  onBuy,
  subtotal = 25,
  paymentFee = 5,
  platformFee = 5,
  ticketName = "Early Bird",
  ticketPriceLabel = "$25.00 + Fees",
}) => {
  const [count, setCount] = useState(1);
  const [discountCode, setDiscountCode] = useState("");
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const maxCount = 5;

  const handleMinus = () => count > 1 && setCount((prev) => prev - 1);
  const handlePlus = () => count < maxCount && setCount((prev) => prev + 1);

  const total = useMemo(() => {
    const base = subtotal * count;
    const totalFees = (paymentFee + platformFee) * count;
    const discount = isDiscountApplied ? base * 0.1 : 0; 
    return base + totalFees - discount;
  }, [subtotal, paymentFee, platformFee, count, isDiscountApplied]);

  const handleApplyDiscount = () => {
    if (discountCode.trim().toLowerCase() === "promo10") {
      setIsDiscountApplied(true);
    } else {
      setIsDiscountApplied(false);
    }
  };

  return (
    <div className="flex flex-col gap-[64px] text-white">
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
                  className={`text-[20px] leading-[20px] font-bold select-none ${
                    count === 1 ? "text-[#98A2B3]" : "text-white"
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
                disabled={count === maxCount}
                className="w-[40px] h-[40px] rounded-[4px] p-[4px] flex items-center justify-center bg-[#1B2334]"
              >
                <span
                  className={`text-[20px] leading-[20px] font-bold select-none ${
                    count === maxCount ? "text-[#98A2B3]" : "text-white"
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
                { label: "Subtotal:", value: subtotal },
                { label: "Payment fee:", value: paymentFee },
                { label: "Platform fee:", value: platformFee },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex justify-between items-center w-[540px] h-[28px] pb-[4px] border-b border-[#475069]"
                >
                  <span className="font-dmSans text-[16px] text-[#D0D5DD]">
                    {label}
                  </span>
                  <span className="font-dmSans text-[16px] font-bold text-white">
                    ${(value * count).toFixed(2)}
                  </span>
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

          <div className="w-[556px] h-[70px] flex items-end justify-between gap-[8px]">
            <div className="flex flex-col w-[468px] h-[70px] gap-[6px]">
              <span className="font-dmSans font-normal text-[14px] leading-[20px] text-white">
                Discount
              </span>

              <input
                type="text"
                placeholder="Enter discount code"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className="w-[468px] h-[44px] rounded-[8px] px-[14px] py-[10px] bg-[#39405A] shadow-[0px_1px_2px_0px_#1018280D] text-white placeholder-[#D0D5DD] outline-none"
              />
            </div>

            <button
              onClick={handleApplyDiscount}
              className={`w-[80px] h-[44px] rounded-[8px] px-[14px] py-[6px] font-dmSans text-[14px] leading-[20px] font-medium text-white shadow-[0px_1px_2px_0px_#1018280D] ${
                discountCode.trim()
                  ? "bg-[#EE46BC]"
                  : "bg-[#EE46BC80]"
              }`}
              disabled={!discountCode.trim()}
            >
              Apply
            </button>
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
            onClick={onBuy}
            className="w-[524px] h-[52px] rounded-lg bg-[#3C5BFF] shadow-[0px_1px_2px_0px_#1018280D] px-[18px] py-[16px] font-dmSans font-bold text-[16px] leading-[20px] text-white"
          >
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketStep3;
