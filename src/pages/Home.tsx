import React, { useState } from "react";
import EventSlider from "../components/Slider";
import CreatorSlider from "../components/CreatorSlider";
import clsx from "clsx";

const Home: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopupToggle = () => {
    setIsPopupOpen((prev) => !prev);
  };

  return (
    <>
      <main>
        <section className="hero">
          <div className="flex flex-col justify-center items-center text-center max-w-3xl mx-auto justify">
            {" "}
            <h1 className="h1 mb-4 text-3xl md:text-4xl leading-tight">
              Events to inspire, disrupt, and impact
            </h1>
            <p className="mb-8 text-lg">
              Join Hubnox, community creating unique and unforgettable moments
            </p>
            <button
              type="button"
              className="custom-button popup-toggle w-[183px]"
            >
              Join the hub
            </button>
          </div>
        </section>

        <section className="profiles profiles--events" id="events">
          <div>
            <div className="">
              <EventSlider />
            </div>
          </div>
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
                  <img
                    src="./assets/icons/icon-feature-1.svg"
                    alt="feature-icon"
                  />
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
                  <img
                    src="./assets/icons/icon-feature-2.svg"
                    alt="feature-icon"
                  />
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
                  <img
                    src="./assets/icons/icon-feature-3.svg"
                    alt="feature-icon"
                  />
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
          <div>
            <div className="section-header section-header--controls w-full max-w-[1266px] mx-auto pr-[25px] pl-[25px]">
              <div className="section-header__content">
                <h2 className="h2">Creators that create events with us</h2>
                <p>
                  Hubnox is a community of creators, educators, and industry
                  shapers who deliver unforgettable moments.
                </p>
              </div>
            </div>

            <CreatorSlider handlePopupToggle={handlePopupToggle}/>
          </div>
        </section>

        <section className="img-w-text section-padding-md">
          <div className="custom-container flex flex-col-reverse md:flex-row gap-[64px]">
            <div className="img-w-text__img w-full md:w-1/2">
              <img
                src="./assets/images/img-w-text.webp"
                alt="img-w-text"
                aria-hidden="true"
              />
            </div>
            <div className="w-full md:w-1/2 img-w-text__text">
              <h2 className="h2 mb-4">
                Join <span>Hubnox</span> for events that will change your life!
              </h2>
              <p className="medium-text mb-8">
                By becoming a member, you become a part of an exclusive
                community of creators and will have an access to events of
                life-changing power.{" "}
              </p>
              <button type="button" className="custom-button popup-toggle">
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
                  This is the place where your audience is. Hungry to grow, eager to learn.
                </p>
              </div>

              <button type="button" className="custom-button popup-toggle">
                Become a creator
              </button>
            </div>

            <div className="creator__wrapper">
              <div className="creator__feat creator__feat--large">
                <div className="creator__icon">
                  <img
                    src="./assets/icons/icon-orange.svg"
                    alt="img"
                    aria-hidden="true"
                  />
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
                  <img
                    src="./assets/icons/icon-blue.svg"
                    alt="img"
                    aria-hidden="true"
                  />
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
                  <img
                    src="./assets/icons/icon-blue.svg"
                    alt="img"
                    aria-hidden="true"
                  />
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
                  <img
                    src="./assets/icons/icon-orange.svg"
                    alt="img"
                    aria-hidden="true"
                  />
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

              <button type="button" className="custom-button popup-toggle">
                Join the hub
              </button>
            </div>

            <div className="profiles__wrapper">
              <div className="profiles__card">
                <div className="profiles__img">
                  <img
                    src="./assets/images/team-1.jpg"
                    alt="img"
                    aria-hidden="true"
                  />
                </div>

                <h3>Byrd</h3>
                <p>The creative mind.</p>
                <a href="#" className="popup-toggle">
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
                </a>
              </div>

              <div className="profiles__card">
                <div className="profiles__img">
                  <img
                    src="./assets/images/team-2.jpg"
                    alt="img"
                    aria-hidden="true"
                  />
                </div>
                <h3>Margo</h3>
                <p>The producer.</p>
                <a href="#" className="popup-toggle">
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
                </a>
              </div>

              <div className="profiles__card">
                <div className="profiles__img">
                  <img
                    src="./assets/images/team-3.jpg"
                    alt="img"
                    aria-hidden="true"
                  />
                </div>
                <h3>Wojtek</h3>
                <p>The man behind the tech.</p>
                <a href="#" className="popup-toggle">
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
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="app" id="become-a-member">
          <div className="custom-container flex flex-col-reverse justify-between items-start max-w-[1226] gap-[87px] md:flex-row md:items-center pt-[36px]">
            <div className="app__img md:w-1/2">
              <img
                src="./assets/images/mobile.png"
                alt="img"
                aria-hidden="true"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="h2 text-2xl mb-[16px] font-semibold">
                Download <span>Hubnox </span> app, create, and join best
                industry events
              </h2>
              <p>
                Scan the QR code to join our community of early adopters or {' '}
                <a
                  className="ea-link"
                  target="_blank"
                  href="https://tally.so/r/mOLDA7"
                >
                  click here
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <div
        className={clsx("popup-wrapper", {
          active: isPopupOpen,
        })}
        onClick={(e) => {
          if (e.target instanceof HTMLElement && e.target.classList.contains("popup-wrapper")) {
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
          <p>
            Scan the QR code to join our community of early adopters or
            <a
              className="ea-link-popup"
              target="_blank"
              href="https://tally.so/r/mOLDA7"
            >
              click here
            </a>
          </p>
          <img src="./assets/images/qr-code.png" alt="" />
        </div>
      </div>
    </>
  );
};

export default Home;
