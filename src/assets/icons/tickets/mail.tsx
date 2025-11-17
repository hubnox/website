import React from "react";

interface MailIconProps {
  color?: string;
  className?: string;
}

const MailIcon: React.FC<MailIconProps> = ({ color = "#667085", className }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M18.3346 4.99992C18.3346 4.08325 17.5846 3.33325 16.668 3.33325H3.33464C2.41797 3.33325 1.66797 4.08325 1.66797 4.99992M18.3346 4.99992V14.9999C18.3346 15.9166 17.5846 16.6666 16.668 16.6666H3.33464C2.41797 16.6666 1.66797 15.9166 1.66797 14.9999V4.99992M18.3346 4.99992L10.0013 10.8333L1.66797 4.99992"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MailIcon;
