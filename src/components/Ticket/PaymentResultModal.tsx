import React from "react";
import PhotosEmptyIcon from "../../assets/icons/tickets/Photos_empty.svg";
import WarningIcon from "../../assets/icons/tickets/Warning.svg";
import TicketsSuccessIcon from "../../assets/icons/tickets/TicketsSuccess.svg";

interface ButtonConfig {
  label: string;
  action?: () => void;
  primary?: boolean;
  fullWidth?: boolean;
}

interface PaymentResultModalProps {
  status: "success" | "error" | "failed" | "unavailable";
  onBack?: () => void;
  onTryAgain?: () => void;
  onClose?: () => void;
  onBackToEvents?: () => void;
}
interface PaymentTextStyle {
  weight: "500" | "700";
  size: "16" | "18";
}

interface PaymentResultContent {
  icon: string;
  title: string;
  titleStyle: PaymentTextStyle;
  subtitle?: string;
  subtitleStyle?: PaymentTextStyle;
  buttons: ButtonConfig[];
  taller: boolean;
}

const PaymentResultModal: React.FC<PaymentResultModalProps> = ({
  status,
  onBack,
  onTryAgain,
  onClose,
  onBackToEvents,
}) => {
  const getContent = (): PaymentResultContent | null => {
    switch (status) {
      case "failed":
        return {
          icon: PhotosEmptyIcon,
          title: "Payment was not completed.\nPlease try again.",
          titleStyle: { weight: "700", size: "18" },
          buttons: [
            { label: "Back", action: onBack },
            { label: "Try again", action: onTryAgain, primary: true },
          ],
          taller: false,
        };

      case "error":
        return {
          icon: PhotosEmptyIcon,
          title:
            "Your payment could not be processed. Please try another method.",
          titleStyle: { weight: "500", size: "18" },
          buttons: [
            { label: "Back", action: onBack },
            { label: "Try again", action: onTryAgain, primary: true },
          ],
          taller: false,
        };

      case "unavailable":
        return {
          icon: WarningIcon,
          title: "Sorry, this ticket type is no longer available.",
          titleStyle: { weight: "500", size: "18" },
          buttons: [
            { label: "Close", action: onClose },
            { label: "Back to events", action: onBackToEvents, primary: true },
          ],
          taller: false,
        };

      case "success":
        return {
          icon: TicketsSuccessIcon,
          title: "Payment Successful!",
          titleStyle: { weight: "500", size: "18" },
          subtitle:
            "Your ticket is available in the Hubnox app. If you use the same email here as in the app, the ticket will be automatically added to your account.",
          subtitleStyle: { weight: "500", size: "16" },
          buttons: [
            { label: "Got it!", action: onClose, primary: true, fullWidth: true },
          ],
          taller: true,
        };

      default:
        return null;
    }
  };

  const content = getContent();
  if (!content) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        className={`w-[395px] ${content.taller ? "h-[484px]" : "h-[384px]"
          } rounded-[8px] bg-[#39405A] p-4 flex flex-col gap-[8px]`}
      >
        <div className="w-[363px] mx-auto flex flex-col items-center justify-between gap-[44px]">
          <img srcSet={content.icon} alt="status" />

          <div
            className={`flex flex-col whitespace-pre-line ${content.subtitle ? "gap-[22px]" : "gap-[0]"
              } w-[363px] text-center`}
          >
            <p
              className={`
              font-epilogue
              text-white
              leading-[26px]
              font-${content.titleStyle.weight === "700" ? "bold" : "medium"}
              text-[${content.titleStyle.size}px]
            `}
            >
              {content.title}
            </p>

            {content.subtitle && (
              <p
                className={`
                  font-epilogue
                  text-white opacity-90
                  leading-[26px]
                  font-${content.subtitleStyle?.weight === "700" ? "bold" : "medium"}
                  text-[${content.subtitleStyle?.size}px]
                `}
              >
                {content.subtitle}
              </p>
            )}

          </div>

          <div
            className={`flex ${content.buttons.length === 1 ? "w-[363px]" : "gap-[8px] w-[363px]"
              }`}
          >
            {content.buttons.map((btn, i) => (
              <button
                key={i}
                onClick={btn.action}
                className={`${content.buttons.length === 1 || btn.fullWidth
                  ? "w-full"
                  : "w-[177.5px]"
                  } h-[52px] rounded-[8px] font-dmSans font-bold text-[16px] leading-[20px] shadow-[0px_1px_2px_0px_#1018280D] transition-colors ${btn.primary
                    ? "bg-[#3C5BFF] text-white hover:bg-[#2F46D1]"
                    : "border border-[#3C5BFF] text-white hover:bg-[#3C5BFF20]"
                  }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentResultModal;
