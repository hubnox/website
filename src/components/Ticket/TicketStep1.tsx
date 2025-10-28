import React, { useState, useEffect, useRef } from "react";
import CheckIcon from "../../assets/icons/tickets/check.svg";
import SpinnerIcon from "../../assets/icons/tickets/Spinner.svg";
import AlertIcon from "../../assets/icons/tickets/alert-circle";

interface TicketStep1Props {
  email: string;
  onEmailChange: (email: string) => void;
  onNext: () => void;
  onDownload: () => void;
}

const TicketStep1: React.FC<TicketStep1Props> = ({ email, onEmailChange, onNext, onDownload }) => {
  const [isTouched, setIsTouched] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [isChecking, setIsChecking] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (email.trim() === "") {
      setIsValid(null);
      setIsChecking(false);
      return;
    }

    setIsChecking(true);

    timeoutRef.current = setTimeout(() => {
      const valid = /\S+@\S+\.\S+/.test(email);
      setIsValid(valid);
      setIsChecking(false);
    }, 1000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [email]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) onNext();
    setIsTouched(true);
  };

  const getBorderClass = () => {
    if (isValid === false) {
      return "border border-[#F97066]";
    }
    if (isValid === true) {
      return "border border-[#6CE9A6]";
    }
    if (isFocused) {
      return "border border-[#3C5BFF] shadow-[0_0_0_4px_#5B76FA80]";
    }
    if (email.trim() !== "") {
      return "border border-[#3C5BFF]";
    }
    return "border border-transparent";
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[64px] w-[556px] min-h-[320px]">
      <div className="flex flex-col gap-4">
        <div className="relative">
          <label className="font-inter font-medium text-[14px] text-white p-0 mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsTouched(true);
              setIsFocused(false);
            }}
            className={`w-full h-11 rounded-lg pl-4 pr-12 text-white placeholder-[#D0D5DD] outline-none bg-[#39405A] ${getBorderClass()}`}
          />

          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center">
            {isChecking && (
              <img
                src={SpinnerIcon}
                alt="spinner"
                className="w-5 h-5 mt-5 animate-spin" 
              />
            )}
            {!isChecking && isValid && (
              <img
                src={CheckIcon}
                alt="valid"
                className="w-5 h-5 mt-5" 
              />
            )}
            {!isChecking && isValid === false && email.trim() !== "" && (
              <AlertIcon color="#F97066" size={16} /> 
            )}
          </div>

          {!isValid && isTouched && email.trim() !== "" && !isChecking && (
            <p className="text-[#F97066] mt-1.5 text-sm">
              Please enter a valid email address
            </p>
          )}
        </div>
        <p className="text-[16px] leading-[24px] text-[#D0D5DD]">
          To purchase a ticket, please enter the email registered in the app.
          The purchased ticket will appear in your app profile.
        </p>
      </div>

      <div className="flex flex-col gap-[22px]">
        <p className="text-[14px] leading-[22px] text-[#D0D5DD]">
          Don’t have an account?{" "}
          <span className="font-bold underline text-[#EE46BC] cursor-pointer" onClick={onDownload}>
            First Download the App
          </span>{" "}
          and register. Then use the same email here to buy tickets.
        </p>
        <button
          type="submit"
          disabled={!isValid || isChecking}
          className={`w-[556px] h-[52px] rounded-lg ${isValid ? "bg-[#3C5BFF]" : "bg-[#3C5BFF] opacity-60"} shadow-[0_1px_2px_0_#1018280D] font-bold text-white`}
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default TicketStep1;
