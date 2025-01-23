import React from "react";
import EventSlider from "../components/Slider";
import CreatorSlider from "../components/CreatorSlider";
import clsx from "clsx";

import feature1 from "../assets/icons/icon-feature-1.svg";
import feature2 from "../assets/icons/icon-feature-2.svg";
import feature3 from "../assets/icons/icon-feature-3.svg";

import member from "../assets/images/img-w-text.webp";

import orange from "../assets/icons/icon-orange.svg";
import blue from "../assets/icons/icon-blue.svg";

import team1 from "../assets/images/team-1.jpg";
import team2 from "../assets/images/team-2.jpg";
import team3 from "../assets/images/team-3.jpg";

import qrApp from "../assets/images/qr_appstore.png";
import qrGoogle from "../assets/images/qr_googleplay.png";

import google from "../assets/images/googlePlay.png";
import apple from "../assets/images/appStore.png";

import DownloadHubnoxBanner from "../components/DownloadHubnox";

interface Props {
  handlePopupToggle: () => void;
  isPopupOpen: boolean;
}

const Home: React.FC<Props> = ({ handlePopupToggle, isPopupOpen }) => {
  return (
    <>
      <main>
        <section className="hero">
          <div className="flex flex-col justify-center items-center text-center max-w-3xl mx-auto justify">
            {" "}
            <h1 className="h1 mb-4 text-3xl md:text-4xl leading-tight">
              Events to inspire, disrupt, and impact
            </h1>
            <p className="mb-4 text-lg">
              Join Hubnox, community creating unique and unforgettable moments
            </p>
            <button
              type="button"
              className="custom-button popup-toggle w-[183px]"
              onClick={handlePopupToggle}
            >
              Join the hub
            </button>
          </div>
        </section>

        <section className="profiles profiles--events" id="events">
          <EventSlider />
        </section>

        <section className="features section-padding-md">
          <div className="custom-container">
            <h2 className="h2">
              We are the hub for high-quality <span>verified</span> events{" "}
            </h2>
            <p className="features__desc lg-text">
              We are a powerful community of people who love what they do,
              constantly pushing the boundaries of what is possible and
              inspiring others to do the same!
            </p>
            <div className="features__wrapper">
              <div className="features__card">
                <div className="features__icon">
                  <img src={feature1} alt="feature-icon" />
                </div>
                <h4 className="h4">Join the elite</h4>
                <p>
                  By becoming a member, you will become a part of an exclusive
                  community and will have an access to events of life-changing
                  power.
                </p>
              </div>
              <div className="features__card">
                <div className="features__icon">
                  <img src={feature2} alt="feature-icon" />
                </div>
                <h4 className="h4">Enjoy the variety</h4>
                <p>
                  From intimate workshops to grandiose exquisite events, our
                  community offers a wide range of event options, so you can
                  find the perfect fit for you and your brand.
                </p>
              </div>
              <div className="features__card">
                <div className="features__icon">
                  <img src={feature3} alt="feature-icon" />
                </div>
                <h4 className="h4">Network, learn and glow</h4>
                <p>
                  Access the community of industry leaders, educators, and
                  influencers. Learn new skills, grow your business, and earn
                  more.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="profiles section-padding-lg profiles--creator"
          id="creators"
        >
          <CreatorSlider handlePopupToggle={handlePopupToggle} />
        </section>

        <section className="img-w-text section-padding-md">
          <div className="custom-container became-member">
            <div className="img-w-text__img">
              <img src={member} alt="img-w-text" aria-hidden="true" />
            </div>
            <div className="img-w-text__text">
              <h2 className="h2 mb-4">
                Join <span>Hubnox</span> for events that will change your life!
              </h2>
              <p className="medium-text mb-8 text-[#D0D5DD]">
                By becoming a member, you become a part of an exclusive
                community of creators and will have an access to events of
                life-changing power.{" "}
              </p>
              <button
                type="button"
                className="custom-button popup-toggle"
                onClick={handlePopupToggle}
              >
                Become a member
              </button>
            </div>
          </div>
        </section>

        <section className="creator section-padding-md" id="create-event">
          <div className="custom-container">
            <div className="flex flex-col items-start justify-between lg:flex-row">
              <div className="section-header__content">
                <h2 className="h2">Create your event with Hubnox!</h2>
                <p>
                  This is the place where your audience is. Hungry to grow,
                  eager to learn.
                </p>
              </div>

              <button
                type="button"
                className="custom-button popup-toggle"
                onClick={handlePopupToggle}
              >
                Become a creator
              </button>
            </div>

            <div className="creator__wrapper">
              <div className="creator__feat creator__feat--large">
                <div className="creator__icon">
                  <img src={orange} alt="img" aria-hidden="true" />
                </div>
                <h3 className="h3">Join the elite</h3>
                <p>
                  Exclusive community and unique access to events and
                  experiences of life- changing power. Only members have access
                  to view all Hubnox events.
                </p>
              </div>

              <div className="creator__feat">
                <div className="creator__icon">
                  <img src={blue} alt="img" aria-hidden="true" />
                </div>
                <h3 className="h3">Like-minded people</h3>
                <p>
                  Community of creators, educators, and industry shapers who are
                  looking to deliver and experience unforgettable moments.
                </p>
              </div>
            </div>

            <div className="creator__wrapper">
              <div className="creator__feat">
                <div className="creator__icon">
                  <img src={blue} alt="img" aria-hidden="true" />
                </div>
                <h3 className="h3">Business growth</h3>
                <p>
                  Hopnox community is all about development and growth. Here is
                  your audience. Build and impact your community, make money,
                  and leave a legacy.
                </p>
              </div>

              <div className="creator__feat creator__feat--large">
                <div className="creator__icon">
                  <img src={orange} alt="img" aria-hidden="true" />
                </div>
                <h3 className="h3">It's easy</h3>
                <p>
                  Easy to use and navigate, making it simple for you to <br />{" "}
                  organize and manage your <br /> events.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="profiles section-padding-md" id="about-us">
          <div className="custom-container">
            <div className="section-header">
              <div className="section-header__content">
                <h2 className="h2">Who we are?</h2>
                <p>Meet the team behind Hubnox</p>
              </div>

              <button
                type="button"
                className="custom-button popup-toggle"
                onClick={handlePopupToggle}
              >
                Join the hub
              </button>
            </div>

            <div className="profiles__wrapper">
              <div className="profiles__card">
                <div className="profiles__img">
                  <img src={team1} alt="img" aria-hidden="true" />
                </div>

                <h3>Byrd</h3>
                <p>The creative mind.</p>
                <p
                  className="popup-toggle cursor-pointer"
                  onClick={handlePopupToggle}
                >
                  See profile
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12H19"
                      stroke="#EE46BC"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 5L19 12L12 19"
                      stroke="#EE46BC"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </p>
              </div>

              <div className="profiles__card">
                <div className="profiles__img">
                  <img src={team2} alt="img" aria-hidden="true" />
                </div>
                <h3>Margo</h3>
                <p>The producer.</p>
                <p
                  className="popup-toggle cursor-pointer"
                  onClick={handlePopupToggle}
                >
                  See profile
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12H19"
                      stroke="#EE46BC"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 5L19 12L12 19"
                      stroke="#EE46BC"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </p>
              </div>

              <div className="profiles__card">
                <div className="profiles__img">
                  <img src={team3} alt="img" aria-hidden="true" />
                </div>
                <h3>Wojtek</h3>
                <p>The man behind the tech.</p>
                <p
                  className="popup-toggle cursor-pointer"
                  onClick={handlePopupToggle}
                >
                  See profile
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12H19"
                      stroke="#EE46BC"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 5L19 12L12 19"
                      stroke="#EE46BC"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </p>
              </div>
            </div>
          </div>
        </section>

        <DownloadHubnoxBanner isHome={true} />
      </main>

      <div
        className={clsx("popup-wrapper", {
          active: isPopupOpen,
        })}
        onClick={(e) => {
          console.log("click");
          if (
            e.target instanceof HTMLElement &&
            e.target.classList.contains("popup-wrapper")
          ) {
            handlePopupToggle();
          }
        }}
      >
        <button className="popup__close" onClick={handlePopupToggle}>
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
                className="w-[134px] h-[46px] object-contain l:object-cover rounded-lg"
              />
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.hubnox">
              <img
                src={google}
                className="w-[134px] h-[46px] object-contain l:object-cover rounded-lg"
              />
            </a>
          </div>
          <p>Or scan the QR code using your phone's camera</p>
          <div className="hidden l:flex gap-[29px]">
            <img src={qrApp} alt="" />
            <img src={qrGoogle} alt="" />
          </div>

          <div className="flex l:hidden gap-[43px]">
            <div className="flex flex-col gap-[19px] items-center">
              <img src={qrApp} alt="" className="w-[96px] h-[96px]" />
            </div>
            <div className="flex flex-col gap-[19px] items-center">
              <img src={qrGoogle} alt="" className="w-[96px] h-[96px]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
