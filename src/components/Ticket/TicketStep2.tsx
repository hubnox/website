import React, { useState } from "react";
import AlertIcon from "../../assets/icons/tickets/alert-circle";
export interface TicketOption {
  id?: string;
  title: string;
  description: string;
  price: string;
  soldOut?: boolean;
  amount?: number;
}

interface TicketStep2Props {
  tickets: TicketOption[];
  onNext: (selectedTicket: TicketOption) => void;
}

const TicketStep2: React.FC<TicketStep2Props> = ({ tickets, onNext }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (id?: string, soldOut?: boolean) => {
    if (!id || soldOut) return;
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const handleNext = () => {
    const selectedTicket = tickets.find((t) => t.id === selectedId);
    if (selectedTicket) {
      onNext(selectedTicket);
    }
  };

  const formatPrice = (priceStr: string) => {
    const numeric = priceStr.replace(/[^\d.]/g, "");
    if (!numeric) return "$0.00";

    const number = parseFloat(numeric);
    return `$${number.toFixed(2)}`;
  };

  return (
    <div className="flex flex-col gap-[64px] w-[556px]">
      <div className="flex flex-col gap-3 w-[556px] h-[456px]">
        <h2 className="font-dm-sans font-bold text-[16px] leading-[20px] text-white">
          Please, choose a ticket type.
        </h2>

        <div
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          className="flex flex-col gap-2 w-[556px] h-[424px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#3C5BFF40] scrollbar-track-transparent"
        >
          {tickets.map((ticket, index) => {
            const ticketId = ticket.id || `temp-${index}`;
            const isSelected = ticketId === selectedId;
            const isSoldOut = ticket.soldOut;

            return (
              <div
                key={ticketId}
                onClick={() => handleSelect(ticket.id, isSoldOut)}
                className={`relative flex items-center gap-[10px] w-[556px] h-[100px] p-2 rounded-lg cursor-pointer transition-all duration-150
                  ${isSoldOut
                    ? "bg-[#212C42] cursor-not-allowed"
                    : "bg-[#39405A]"
                  }
                  ${isSelected ? "border border-[#3C5BFF]" : "border border-transparent"}`}
              >
                {isSoldOut && (
                  <div className="absolute top-0 right-0 flex items-center gap-1 bg-[#EE46BC] rounded px-1.5 py-1 h-[28px] w-[82px]">
                    <div className="h-[16px] w-[16px] flex items-center justify-center">
                      <AlertIcon size={16} />
                    </div>

                    <span className="text-white font-dm-sans font-semibold text-[12px] leading-[20px] whitespace-nowrap">
                      Sold Out
                    </span>
                  </div>
                )}

                {!isSoldOut ? (
                  <div className="flex flex-col justify-start h-full">
                    <div
                      className={`
                        w-[20px] h-[20px] rounded-full m-[2px] flex items-center justify-center
                        ${isSelected ? "border-[1.5px] border-[#3C5BFF]" : "border-[1.5px] border-[#8CB3ED]"}
                      `}
                    >
                      {isSelected && (
                        <div className="w-[10px] h-[10px] bg-[#3C5BFF] rounded-full"></div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className={`w-[20px] h-[20px] m-[2px] flex items-center justify-center rounded-full`} />
                )}


                <div className="flex flex-col justify-between gap-1 w-[506px] h-[84px]">
                  <span className="font-dm-sans font-bold text-[16px] leading-[22px] text-white">
                    {ticket.title}
                  </span>
                  <p className="font-dm-sans font-normal text-[11px] leading-[14px] text-[#D0D5DD]">
                    {ticket.description}
                  </p>
                  <p className="font-inter text-white text-[14px] leading-[20px]">
                    <span className="font-bold">from {formatPrice(ticket.price)} </span>{" "}
                    <span className="font-medium">+ Fees</span>
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
          ${selectedId !== null ? "bg-[#3C5BFF]" : "bg-[#3C5BFF] opacity-60"}
        `}
      >
        Next
      </button>
    </div>
  );
};

export default TicketStep2;
