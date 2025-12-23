import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import TicketStep1 from "./TicketStep1";
import TicketStep2, { TicketOption } from "./TicketStep2";
import TicketStep3 from "./TicketStep3";
import DownloadPopup from "../DownloadPopup";
import { useGetTicketsByEventIdQuery } from "../../app/eventsApi";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "./stripe";

interface TicketModalProps {
  onClose: () => void;
  image: string;
  title: string;
  date: string;
  location?: string;
  eventId?: string;
}

const TicketModal: React.FC<TicketModalProps> = ({
  onClose,
  image,
  title,
  date,
  location,
  eventId,
}) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<TicketOption | null>(null);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  const { data: tickets, isLoading, error } = useGetTicketsByEventIdQuery(eventId!, {
    refetchOnMountOrArgChange: true,
    skip: !eventId,
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => Math.max(1, prev - 1));
  const handleNext = (ticket: TicketOption) => {
    setSelectedTicket(ticket);
    nextStep();
  };
  const parsePrice = (priceStr: string) => {
    const numeric = priceStr.replace(/[^\d.]/g, "");
    const value = parseFloat(numeric);
    return isNaN(value) ? 0 : value;
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isDownloadOpen) onClose();
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "#FFFFFF1A",
          backdropFilter: "blur(10px)",
        }}
      />

      {!isDownloadOpen && (
        <div className="relative z-50 w-full max-w-[596px] bg-[#1B2334] rounded-2xl p-5 flex flex-col gap-[30px]">
          <div className="relative w-full h-[44px] flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={prevStep}
                className="w-11 h-11 rounded-lg bg-[#39405A] p-3 flex items-center justify-center"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M16.668 10.2285C16.668 10.5449 16.4328 10.8064 16.1278 10.8478L16.043 10.8535L3.54297 10.8535C3.19779 10.8535 2.91797 10.5737 2.91797 10.2285C2.91797 9.9121 3.1531 9.65061 3.45816 9.60922L3.54297 9.60352L16.043 9.60352C16.3881 9.60352 16.668 9.88334 16.668 10.2285Z" fill="white" />
                  <path d="M9.02693 14.806C9.27153 15.0495 9.27238 15.4452 9.02883 15.6898C8.80742 15.9122 8.46024 15.9331 8.21518 15.7521L8.14495 15.6917L3.10328 10.6717C2.88025 10.4497 2.85996 10.1012 3.04242 9.85617L3.10325 9.78599L8.14491 4.76515C8.38949 4.52158 8.78522 4.5224 9.02879 4.76698C9.25022 4.98933 9.26967 5.33659 9.08762 5.58089L9.02696 5.65087L4.43027 10.2291L9.02693 14.806Z" fill="white" />
                </svg>
              </button>
            ) : (
              <div className="w-11 h-11" />
            )}

            <h2 className="absolute left-1/2 -translate-x-1/2 font-bold text-[20px] text-white whitespace-nowrap">
              Get tickets{" "}
              <span className="text-white">{step}</span>
              /
              <span
                className={
                  step === 3 ? "text-[#FCFCFD]" : "text-[#FCFCFD80]"
                }
              >
                3
              </span>
            </h2>

            <button
              onClick={onClose}
              className="w-11 h-11 rounded-lg bg-[#39405A] p-3 flex items-center justify-center backdrop-blur-[12px]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M6 18L18 6" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col gap-11">
            <div className="flex gap-4">
              <img src={image} alt={title} className="w-20 h-20 rounded-lg" />
              <div className="flex flex-col justify-between w-[468px] h-20 gap-2">
                <div className="flex flex-col ">
                  <span
                    className="font-epilogue font-bold text-[20px] align-middle"
                    style={{
                      lineHeight: "32px",
                      letterSpacing: "0%",
                    }}
                  >
                    {title}
                  </span>

                  <span className="text-[16px] text-gray-300"
                    style={{
                      lineHeight: "20px",
                      letterSpacing: "0%",
                    }}>{date}</span>
                </div>
                <span className="text-[14px] text-[#D0D5DD]" style={{
                  lineHeight: "20px",
                  letterSpacing: "0%",
                }}>{location}</span>
              </div>
            </div>

            {step === 1 && (
              <TicketStep1
                email={email}
                onEmailChange={setEmail}
                onNext={nextStep}
                onDownload={() => setIsDownloadOpen(true)}
              />
            )}
            {step === 2 && (
              <div className="flex flex-col gap-2">
                {isLoading && <div className="text-white">Loading tickets...</div>}
                {error && <div className="text-red-500">Failed to load tickets</div>}
                {tickets && tickets.result && tickets.result.length > 0 ? (
                  <TicketStep2 tickets={tickets.result} onNext={handleNext} />
                ) : (
                  !isLoading && <div className="text-white">No tickets available</div>
                )}
              </div>
            )}
            {step === 3 && selectedTicket && (
              <Elements stripe={stripePromise}>
                <TicketStep3
                  ticketName={selectedTicket.title}
                  onClose={onClose}
                  setStep={setStep}
                  totalTickets={selectedTicket.amount || 1}
                  subtotal={parsePrice(selectedTicket.price)}
                  email={email}
                  eventId={eventId}
                  ticketTypeId={selectedTicket.id?.toString()}
                  currencyType={selectedTicket?.currencyType || "$"}
                />
              </Elements>
            )}
          </div>
        </div>
      )}

      <DownloadPopup
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
      />
    </div>,
    document.body
  );
};

export default TicketModal;
