import React from "react";

interface AlertIconProps {
    color?: string;
    size?: number;
}

const AlertIcon: React.FC<AlertIconProps> = ({ color = "white", size = 16 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g clip-path="url(#clip0_9703_445)">
            <path d="M7.9987 5.33337V8.00004M7.9987 10.6667H8.00536M14.6654 8.00004C14.6654 11.6819 11.6806 14.6667 7.9987 14.6667C4.3168 14.6667 1.33203 11.6819 1.33203 8.00004C1.33203 4.31814 4.3168 1.33337 7.9987 1.33337C11.6806 1.33337 14.6654 4.31814 14.6654 8.00004Z" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </g>
        <defs>
            <clipPath id="clip0_9703_445">
                <rect width="16" height="16" fill="white" />
            </clipPath>
        </defs>
    </svg>);
export default AlertIcon;