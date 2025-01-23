import mobile from "../assets/images/mobile.png";
import qrApp from "../assets/images/qr_appstore.png";
import qrGoogle from "../assets/images/qr_googleplay.png";
import google from "../assets/images/googlePlay.png";
import apple from "../assets/images/appStore.png";
import downloadNow from "../assets/images/download-now.png";
export default function DownloadHubnoxBanner({ isHome }: { isHome: boolean }) {
  return (
    <section
      className={`${isHome ? "app" : " bg-[#111622] min-w-[100%]"}`}
      id={`${isHome && "become-a-member"}`}
    >
      <div className="custom-container  flex flex-col-reverse items-start max-w-[1226] gap-[87px] blg:flex-row md:items-center pt-[36px]">
        <div className="app__img max-w-[393px] w-full">
          <img src={mobile} alt="img" aria-hidden="true" />
        </div>
        <div className="w-full">
          <div className="max-w-[573px]">
            <h2 className="h2 text-2xl mb-[16px] font-semibold">
              Download <span>Hubnox </span> app and explore a diverse range of
              beauty events!
            </h2>
            <p>
              Scan the QR code using your phone's camera or download the app
              from the Apple Store or Google Play.
            </p>
          </div>
          <div className="flex flex-col justify-between gap-8 items-start w-full mt-[50px] md:flex-row md:items-center md:gap-0">
            <img
              src={downloadNow}
              alt="download now"
              className="w-[303px] h-[111px] object-cover"
            />
            <div className="flex gap-[43px]">
              <div className="flex flex-col gap-[19px] items-center">
                <a href="https://apps.apple.com/us/app/hubnox/id6504521207">
                  <img
                    src={apple}
                    className="w-[134px] h-[46px] object-contain"
                  />
                </a>
                <img src={qrApp} alt="" className="w-[96px] h-[96px]" />
              </div>
              <div className="flex flex-col gap-[19px] items-center">
                <a href="https://play.google.com/store/apps/details?id=com.hubnox">
                  <img
                    src={google}
                    className="w-[134px] h-[46px] object-contain"
                  />
                </a>
                <img src={qrGoogle} alt="" className="w-[96px] h-[96px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
