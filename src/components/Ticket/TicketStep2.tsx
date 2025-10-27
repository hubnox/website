import React, { useState } from "react";
import AlertIcon from "../../assets/icons/tickets/alert-circle";
export interface TicketOption {
  id: number;
  title: string;
  description: string;
  price: string;
  soldOut?: boolean;
}

interface TicketStep2Props {
  tickets: TicketOption[];
  onNext: (selectedTicket: TicketOption) => void;
}

const TicketStep2: React.FC<TicketStep2Props> = ({ tickets, onNext }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelect = (id: number, soldOut?: boolean) => {
    if (soldOut) return;
    setSelectedId(id);
  };

  const handleNext = () => {
    const selectedTicket = tickets.find((t) => t.id === selectedId);
    if (selectedTicket) {
      onNext(selectedTicket);
    }
  };

  return (
    <div className="flex flex-col gap-[24px] w-[556px]">
      <div className="flex flex-col gap-3 w-[556px] h-[456px]">
        <h2 className="font-dm-sans font-bold text-[16px] leading-[20px] text-white">
          Please, choose a ticket type.
        </h2>

        <div
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          className="flex flex-col gap-2 w-[556px] h-[424px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#3C5BFF40] scrollbar-track-transparent"
        >
          {tickets.map((ticket) => {
            const isSelected = ticket.id === selectedId;
            const isSoldOut = ticket.soldOut;

            return (
              <div
                key={ticket.id}
                onClick={() => handleSelect(ticket.id, isSoldOut)}
                className={`relative flex items-center gap-[10px] w-[556px] h-[100px] p-2 rounded-lg cursor-pointer transition-all duration-150
                  ${isSoldOut
                    ? "bg-[#212C42] cursor-not-allowed"
                    : "bg-[#39405A]"
                  }`}
              >
                {isSoldOut && (
                  <div className="absolute top-0 right-0 flex items-center gap-1 bg-[#EE46BC] rounded-sm px-2 py-1 w-[82px] h-[28px]">
                    <AlertIcon />
                    <span className="text-white font-dm-sans font-semibold text-[12px] leading-[20px] whitespace-nowrap">
                      Sold Out
                    </span>
                  </div>
                )}
                <div
                  className={`w-6 h-6 flex items-center justify-center rounded-full border-2
                    ${isSoldOut
                      ? "border-[#6B7280]"
                      : isSelected
                        ? "border-[#3C5BFF]"
                        : "border-[#D0D5DD]"
                    }
                  `}
                >
                  {isSelected && !isSoldOut && (
                    <div className="w-3 h-3 bg-[#3C5BFF] rounded-full"></div>
                  )}
                </div>

                <div className="flex flex-col justify-between gap-1 w-[506px] h-[84px]">
                  <span className="font-dm-sans font-bold text-[16px] leading-[22px] text-white">
                    {ticket.title}
                  </span>
                  <p className="font-dm-sans font-normal text-[11px] leading-[14px] text-[#D0D5DD]">
                    {ticket.description}
                  </p>
                  <p className="font-inter font-bold text-[14px] leading-[20px] text-white">
                    {ticket.price}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        disabled={selectedId === null}
        onClick={handleNext}
        className={`w-[556px] h-[52px] rounded-lg font-bold text-white shadow-[0_1px_2px_0_#1018280D]
          ${selectedId ? "bg-[#3C5BFF]" : "bg-[#3C5BFF] opacity-60"}
        `}
      >
        Next
      </button>
    </div>
  );
};

export default TicketStep2;
