import React from "react";
import clsx from "clsx";
import qrApp from "../assets/images/qr_appstore.png";
import qrGoogle from "../assets/images/qr_googleplay.png";
import google from "../assets/images/googlePlay.png";
import apple from "../assets/images/appStore.png";

interface DownloadPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const DownloadPopup: React.FC<DownloadPopupProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={clsx("popup-wrapper", {
        active: isOpen,
      })}
      onClick={(e) => {
        if (
          e.target instanceof HTMLElement &&
          e.target.classList.contains("popup-wrapper")
        ) {
          onClose();
        }
      }}
    >
      <button className="popup__close" onClick={onClose}>
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M30 10L10 30"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 10L30 30"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className="popup">
        <h2 className="popup__title">
          Get <span>Hubnox</span> App
        </h2>
        <p>Download the app from the Apple Store or Google Play.</p>
        <div className="flex justify-between gap-[20px]">
          <a href="https://apps.apple.com/us/app/hubnox/id6504521207">
            <img
              src={apple}
              alt="App Store"
              className="w-[134px] h-[46px] object-contain l:object-cover rounded-lg"
            />
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.hubnox">
            <img
              src={google}
              alt="Google Play"
              className="w-[134px] h-[46px] object-contain l:object-cover rounded-lg"
            />
          </a>
        </div>
        <p>Or scan the QR code using your phone's camera</p>
        <div className="hidden l:flex gap-[29px]">
          <img src={qrApp} alt="App Store QR" />
          <img src={qrGoogle} alt="Google Play QR" />
        </div>

        <div className="flex l:hidden gap-[43px]">
          <div className="flex flex-col gap-[19px] items-center">
            <img src={qrApp} alt="App Store QR" className="w-[96px] h-[96px]" />
          </div>
          <div className="flex flex-col gap-[19px] items-center">
            <img
              src={qrGoogle}
              alt="Google Play QR"
              className="w-[96px] h-[96px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadPopup;
