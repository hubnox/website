import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import '/node_modules/swiper/modules/navigation.min.css';
import '/node_modules/swiper/modules/pagination.min.css';
import '/node_modules/swiper/swiper.min.css'
import '/node_modules/swiper/swiper-bundle.min.css'
import '../styles/Slider.css';

import CreatorSlide from "./CreatorSlide";
import { useGetCreatorsQuery } from "../app/creatorsApi";
import Loader from "./Loader";
import { Creator } from "../types";

interface Props {
  handlePopupToggle: () => void;
}

const CreatorSlider: React.FC<Props> = ({handlePopupToggle}) => {
  const { data, error, isLoading } = useGetCreatorsQuery();

  if (isLoading) return <Loader />;
  if (error) return <p>Error loading events.</p>;

  const creators = data?.results || [];

  if (creators.length === 0) return (
  <section className="section-padding-lg">
    <div className="w-full max-w-[1266px] mx-auto px-[25px]">
      <p className="section-padding-lg">No creators available.</p>
    </div>
  </section>
  );

  console.log('creators', creators);

  return (
    <section>
      <div className="w-full max-w-[1266px] mx-auto px-[25px]">
        <div className="section-header section-header--controls">
        <div className="section-header__content">
                <h2 className="h2">Creators that create events with us</h2>
                <p>
                  Hubnox is a community of creators, educators, and industry
                  shapers who deliver unforgettable moments.
                </p>
              </div>
          <div className="slider-controls">
            <button className="slide-btn slider-prev-btn">
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

            <div className="swiper-pagination coming-events-creator-pagination"></div>

            <button className="slide-btn slider-next-btn">
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
        </div>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            650: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1124: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          navigation={{
            nextEl: ".slider-next-btn",
            prevEl: ".slider-prev-btn",
          }}
          pagination={{
            el: ".coming-events-creator-pagination",
            clickable: true,
            type: "fraction",
          }}
        >
          {creators &&
            creators.map((creator: Creator) => {
              if (!creator || !creator.firstName || !creator.lastName || !creator.image?.url) {
                return null;
              }

              return (
                <SwiperSlide key={creator.objectId}>
                  <CreatorSlide
                    objectId={creator.objectId}
                    firstName={creator.firstName}
                    lastName={creator.lastName}
                    image={creator.image}
                    tagLine={creator.tagLine}
                    handlePopupToggle={handlePopupToggle}
                  />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </section>
  );
};

export default CreatorSlider;
