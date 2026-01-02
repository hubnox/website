import React, { useState, useEffect, useRef } from "react";
import CheckIcon from "../../assets/icons/tickets/check.svg";
import SpinnerIcon from "../../assets/icons/tickets/Spinner.svg";
import AlertIcon from "../../assets/icons/tickets/alert-circle";
import { useCheckOrCreateUserByEmailMutation } from "../../app/userApi";
import MailIcon from "../../assets/icons/tickets/mail";

interface TicketStep1Props {
  email: string;
  onEmailChange: (email: string) => void;
  onNext: () => void;
  onDownload: () => void;
}

const TicketStep1: React.FC<TicketStep1Props> = ({ email, onEmailChange, onNext, onDownload }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [checkOrCreateUser, { isLoading }] = useCheckOrCreateUserByEmailMutation();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid) return;

    try {
      setIsChecking(true);
      await checkOrCreateUser({ email }).unwrap();

      onNext();
    } catch (error) {
      console.error("Failed to check/create user:", error);

    } finally {
      setIsChecking(false);
    }
  };

  const getBorderClass = () => {
    if (isValid === false) return "border border-[#F97066]";
    if (isValid === true) return "border border-[#6CE9A6]";
    if (isFocused) return "border border-[#3C5BFF] shadow-[0_0_0_4px_#5B76FA80]";
    if (email.trim() !== "") return "border border-[#3C5BFF]";
    return "border border-transparent";
  };
  const getIconColor = () => {
    if (isValid === false) return "#F97066";
    if (isFocused || email.trim() !== "") return "#FCFCFD";
    return "#667085";
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[64px] max-w-[556px] min-h-[320px]">
      <div className="flex flex-col gap-4">
        <div className="relative">
          <label className="font-inter font-medium text-[14px] text-white p-0 mb-2">
            Email
          </label>
          <div className="relative w-full h-11">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5">
              <MailIcon color={getIconColor()} className="w-5 h-5" />
            </div>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={`w-full h-full rounded-lg pl-[43px] pr-12 text-white placeholder-[#D0D5DD] font-normal outline-none bg-[#39405A] ${getBorderClass()}  focus:placeholder-transparent`}
            />
          </div>

          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-5 h-5 mt-3">
            {(isChecking || isLoading) && (
              <img src={SpinnerIcon} alt="spinner" className=" animate-spin" />
            )}
            {!isChecking && !isLoading && isValid && (
              <img src={CheckIcon} alt="valid" />
            )}
            {!isChecking && !isLoading && isValid === false && email.trim() !== "" && (
              <div className=" mt-[-25px]">
                <AlertIcon color="#F97066" size={16} />
              </div>
            )}
          </div>

          {!isValid && email.trim() !== "" && !isChecking && !isLoading && (
            <p className="text-[#F97066] mt-1.5 text-sm">Please enter a valid email address</p>
          )}
        </div>
        <p className="text-[16px] leading-[24px] text-[#D0D5DD] font-normal">
          To purchase your ticket, simply enter the same email you used when registering on Hubnox.
          You can view your ticket in the app after the purchase.
        </p>
      </div>

      <div className="flex flex-col gap-[22px]">
        <p className="text-[14px] leading-[22px] text-[#D0D5DD] font-normal">
          Don’t have an account? {" "}
          <span className="font-bold underline text-[#EE46BC] cursor-pointer" onClick={onDownload}>
            Download the App
          </span>{" "}
          and sign up with the same email to access your ticket.
        </p>
        <button
          type="submit"
          disabled={!isValid || isChecking || isLoading}
          className={`max-w-[556px] h-[52px] rounded-lg ${isValid ? "bg-[#3C5BFF]" : "bg-[#3C5BFF] opacity-60"} shadow-[0_1px_2px_0_#1018280D] font-bold text-white`}
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default TicketStep1;
