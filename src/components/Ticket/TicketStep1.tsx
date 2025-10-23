import React, { useState } from "react";

interface TicketStep1Props {
  email: string;
  onEmailChange: (email: string) => void;
  onNext: () => void;
}

const TicketStep1: React.FC<TicketStep1Props> = ({ email, onEmailChange, onNext }) => {
  const [isTouched, setIsTouched] = useState(false);
  const isValid = /\S+@\S+\.\S+/.test(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTouched(true);
    if (isValid) onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[64px] w-[556px] h-[440px]">
      <div className="flex flex-col gap-4">
        <div className="relative">
          <label className="font-inter font-medium text-[14px] text-white p-0 mb-2">
            Email
          </label>
          <div className="absolute left-4 top-1/2 w-5 h-5 mt-0.5">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 8L12 13L21 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="3" y="6" width="18" height="12" rx="2" stroke="white" strokeWidth="2" />
            </svg>
          </div>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            onBlur={() => setIsTouched(true)}
            className="w-full h-11 rounded-lg bg-[#39405A] pl-12 pr-4 text-white placeholder-[#D0D5DD]"
          />
        </div>
        {!isValid && isTouched && (
          <p className="text-[#EE46BC] text-sm">Please enter a valid email address</p>
        )}
        <p className="text-[16px] leading-[24px] text-[#D0D5DD]">
          To purchase a ticket, please enter the email registered in the app. The purchased ticket will appear in your app profile.
        </p>
      </div>

      <div className="flex flex-col gap-[22px]">
        <p className="text-[14px] leading-[22px] text-[#D0D5DD]">
          Don’t have an account?{" "}
          <span className="font-bold underline text-[#EE46BC] cursor-pointer">
            First Download the App
          </span>{" "}
          and register. Then use the same email here to buy tickets.
        </p>
        <button
          type="submit"
          disabled={!isValid}
          className={`w-[556px] h-[52px] rounded-lg ${
            isValid ? "bg-[#3C5BFF]" : "bg-[#3C5BFF] opacity-60"
          } shadow-[0_1px_2px_0_#1018280D] font-bold text-white`}
        >
          Continue
        </button>
      </div>
    </form>
  );
};

export default TicketStep1;
