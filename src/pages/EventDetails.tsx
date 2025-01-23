import { Link, useParams } from "react-router-dom";
import { Event } from "../types/home-type";
import { useGetEventsQuery } from "../app/eventsApi";
import Loader from "../components/Loader";
import { Swiper, SwiperSlide } from "swiper/react";
import "/node_modules/swiper/swiper-bundle.min.css";
import { Navigation, Pagination } from "swiper/modules";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

import DownloadHubnoxBanner from "../components/DownloadHubnox";
import DownloadPopup from "../components/DownloadPopup";

interface Props {
  handlePopupToggle: () => void;
  isPopupOpen: boolean;
}

const EventDetailsPage: React.FC<Props> = ({
  handlePopupToggle,
  isPopupOpen,
}) => {
  const { eventId } = useParams<{ eventId: string }>();
  const { data, error, isLoading } = useGetEventsQuery();

  const DEFAULT_OG_IMAGE = "/favicon.ico";

  useEffect(() => {
    if (!data || !eventId) return;

    const event = data.results.find((e: Event) => e.objectId === eventId);
    if (!event) return;

    const originalMeta = Array.from(document.getElementsByTagName("meta"))
      .filter((tag) => tag.getAttribute("property")?.startsWith("og:"))
      .map((tag) => ({
        property: tag.getAttribute("property"),
        content: tag.getAttribute("content"),
      }));

    const head = document.querySelector("head")!;
    const metaTags = [
      { property: "og:title", content: event.name },
      { property: "og:description", content: event.description },
      { property: "og:image", content: event.thumbnail?.url },
      { property: "og:url", content: `https://hubnox.com/#/event/${eventId}` },
    ];

    metaTags.forEach((tag) => {
      let element = document.querySelector(`meta[property="${tag.property}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("property", tag.property);
        head.appendChild(element);
      }
      element.setAttribute("content", tag.content);
    });

    return () => {
      originalMeta.forEach((tag) => {
        const element = document.querySelector(
          `meta[property="${tag.property}"]`
        );
        if (element && tag.content) {
          element.setAttribute("content", tag.content);
        }
      });
    };
  }, [data, eventId]);

  if (isLoading) return <Loader />;
  if (error)
    return <p className="text-center text-red-500">Error loading events.</p>;

  const events = data?.results || [];
  const event = events.find((event: Event) => event.objectId === eventId);

  if (!event) {
    return (
      <div className="text-center text-lg text-gray-600">Event not found!</div>
    );
  }

  const ogImageUrl =
    event.thumbnail?.url || `https://hubnox.com${DEFAULT_OG_IMAGE}`;

  // Check how many additional images there are
  const additionalImages = [
    event.additionalImage1,
    event.additionalImage2,
    event.additionalImage3,
  ].filter(Boolean);

  return (
    <>
      <Helmet>
        <title>{event.name} | Hubnox</title>
        <meta name="description" content={event.description} />

        <meta property="og:title" content={event.name} />
        <meta property="og:description" content={event.description} />
        <meta property="og:image" content={ogImageUrl} />
        <meta
          property="og:url"
          content={`https://hubnox.com/#/event/${eventId}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Hubnox" />

        <meta name="image" content={ogImageUrl} />
        <link rel="image_src" href={ogImageUrl} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={event.name} />
        <meta name="twitter:description" content={event.description} />
        <meta name="twitter:image" content={ogImageUrl} />
        <meta name="twitter:image:alt" content={event.name} />
      </Helmet>
      <div className="min-h-screen p-6">
        <div className="max-w-3xl mx-auto rounded-lg overflow-hidden">
          <div className="flex flex-col items-center justify-center sm:flex-row p-6 gap-6">
            <div className="flex w-[80%]  justify-center items-center flex-col gap-6">
              <Link
                to="/"
                className="hover:underline text-sm mb-4   w-full  flex items-start mx-auto "
              >
                ← Back
              </Link>
              <div className="flex flex-col items-center justify-between gap-4 ">
                <h1 className="text-3xl font-bold mb-4 w-full text-start ">
                  {event.name.toUpperCase()}
                </h1>
                <div className="relative w-full profiles__img ">
                  <img
                    src={event.thumbnail.url}
                    alt={event.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105 min-h-[300px]"
                  />
                </div>
                <p className="w-full text-lg overflow-hidden text-ellipsis whitespace-pre-wrap break-words">
                  {event.description.trim().replace(/\n{2,}/g, "\n\n")}
                </p>

                <div className="w-full space-y-2">
                  <p className="text-lg">
                    <strong>Location:</strong> {event.location}
                  </p>
                  <p className="text-lg">
                    <strong>Start:</strong>{" "}
                    {new Date(event.startDateAndTime.iso).toLocaleString()}
                  </p>
                  <p className="text-lg">
                    <strong>End:</strong>{" "}
                    {new Date(event.endDateAndTime.iso).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Section: Main Image */}
          </div>

          {/* Slider Section: Additional Images */}
          {additionalImages.length >= 1 && (
            <div className=" p-[20px] w-[80%] mx-auto mb-6">
              {/* Use Swiper if more than one image */}
              <div className="section-header section-header--controls mb-2">
                {additionalImages.length >= 1 && (
                  <div className="section-header__content">
                    <h2 className=" text-2xl font-bold mb-2 ">
                      {additionalImages.length > 1
                        ? "Additional Images"
                        : "Additional Image"}
                    </h2>
                  </div>
                )}
                {additionalImages.length > 1 && (
                  <div className="slider-controls flex items-center gap-4">
                    <button className="slide-btn slider-prev-btn-event">
                      {/* Previous Button Icon */}
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.0003 29.3334C23.3641 29.3334 29.3337 23.3639 29.3337 16.0001C29.3337 8.63628 23.3641 2.66675 16.0003 2.66675C8.63653 2.66675 2.66699 8.63628 2.66699 16.0001C2.66699 23.3639 8.63653 29.3334 16.0003 29.3334Z"
                          stroke="#98A2B3"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16.0003 10.6667L10.667 16.0001L16.0003 21.3334"
                          stroke="#98A2B3"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M21.3337 16H10.667"
                          stroke="#98A2B3"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <div className="swiper-pagination coming-events-pagination"></div>
                    <button className="slide-btn slider-next-btn-event">
                      {/* Next Button Icon */}
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.9997 2.66658C8.63588 2.66658 2.66634 8.63612 2.66634 15.9999C2.66634 23.3637 8.63588 29.3333 15.9997 29.3333C23.3635 29.3333 29.333 23.3637 29.333 15.9999C29.333 8.63612 23.3635 2.66658 15.9997 2.66658Z"
                          stroke="#EE46BC"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15.9997 21.3333L21.333 15.9999L15.9997 10.6666"
                          stroke="#EE46BC"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10.6663 16L21.333 16"
                          stroke="#EE46BC"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>

              {/* Swiper */}
              {additionalImages.length > 1 ? (
                <Swiper
                  modules={[Navigation, Pagination]}
                  spaceBetween={24}
                  slidesPerView={1}
                  breakpoints={{
                    750: {
                      slidesPerView: 2,
                      spaceBetween: 24,
                    },
                    1240: {
                      slidesPerView: 3,
                      spaceBetween: 36,
                    },
                  }}
                  navigation={{
                    nextEl: ".slider-next-btn-event",
                    prevEl: ".slider-prev-btn-event",
                  }}
                  pagination={{
                    el: ".coming-events-pagination",
                    clickable: true,
                    type: "fraction",
                  }}
                  className="mySwiper"
                >
                  {additionalImages.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={image?.url}
                        alt={`Additional ${index + 1}`}
                        className="w-full h-52 object-cover rounded-lg shadow-md"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                additionalImages[0] && (
                  <SwiperSlide>
                    <div className="w-full h-64 overflow-hidden rounded-lg relative">
                      <img
                        src={additionalImages[0]?.url}
                        alt={"Additional image"}
                        className="object-fill w-full h-full shadow-md"
                      />
                    </div>
                  </SwiperSlide>
                )
              )}
            </div>
          )}
          {/* Join the hub button */}
          <div className="flex justify-center mb-6">
            <button
              type="button"
              className="custom-button popup-toggle w-[183px]"
              onClick={handlePopupToggle}
            >
              Join the hub
            </button>
          </div>
          <DownloadPopup isOpen={isPopupOpen} onClose={handlePopupToggle} />
        </div>
      </div>
      <DownloadHubnoxBanner isHome={false} />
    </>
  );
};

export default EventDetailsPage;
