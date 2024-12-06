// import { Link, useParams } from 'react-router-dom';
// import { Event } from '../types/home-type';
// import { useGetEventsQuery } from '../app/eventsApi';
// import Loader from '../components/Loader';

// const EventDetailsPage = () => {
//   const { eventId } = useParams<{ eventId: string }>();
//   const { data, error, isLoading } = useGetEventsQuery();

//   if (isLoading) return <Loader />;
//   if (error) return <p className="text-center text-red-500">Error loading events.</p>;

//   const events = data?.results || [];
//   const event = events.find((event: Event) => event.objectId === eventId);

//   if (!event) {
//     return <div className="text-center text-lg text-gray-600">Event not found!</div>;
//   }

//   return (
//     <div className="min-h-screen 100 p-6">
//       <div className="max-w-3xl mx-auto shadow-md rounded-lg overflow-hidden">
//         <div className="p-6">
//           <Link
//             to="/"
//             className="hover:underline text-sm mb-4 inline-block"
//           >
//             ← Back
//           </Link>
//           <h1 className="text-3xl font-bold mb-4">{event.name}</h1>
//           <img
//             src={event.thumbnail.url}
//             alt={event.name}
//             className="w-full h-64 object-cover rounded-lg mb-6"
//           />
//           <p >{event.description}</p>
//           <p>
//             <strong>Location:</strong> {event.location}
//           </p>
//           <p >
//             <strong>Start:</strong> {new Date(event.startDateAndTime.iso).toLocaleString()}
//           </p>
//           <p >
//             <strong>End:</strong> {new Date(event.endDateAndTime.iso).toLocaleString()}
//           </p>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {event.additionalImage1 && (
//               <img
//                 src={event.additionalImage1.url}
//                 alt="Additional"
//                 className="rounded-lg shadow-sm"
//               />
//             )}
//             {event.additionalImage2 && (
//               <img
//                 src={event.additionalImage2.url}
//                 alt="Additional"
//                 className="rounded-lg shadow-sm"
//               />
//             )}
//             {event.additionalImage3 && (
//               <img
//                 src={event.additionalImage3.url}
//                 alt="Additional"
//                 className="rounded-lg shadow-sm"
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventDetailsPage;


import { Link, useParams } from 'react-router-dom';
import { Event } from '../types/home-type';
import { useGetEventsQuery } from '../app/eventsApi';
import Loader from '../components/Loader';
import { Swiper, SwiperSlide } from 'swiper/react';
import '/node_modules/swiper/swiper-bundle.min.css';
import { Navigation, Pagination } from 'swiper/modules';
import { useEffect } from 'react';

const EventDetailsPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { data, error, isLoading } = useGetEventsQuery();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) return <Loader />;
  if (error) return <p className="text-center text-red-500">Error loading events.</p>;

  const events = data?.results || [];
  const event = events.find((event: Event) => event.objectId === eventId);

  if (!event) {
    return <div className="text-center text-lg text-gray-600">Event not found!</div>;
  }

  // Check how many additional images there are
  const additionalImages = [
    event.additionalImage1,
    event.additionalImage2,
    event.additionalImage3
  ].filter(Boolean);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto shadow-md rounded-lg overflow-hidden">
        <div className="flex flex-col sm:flex-row p-6 gap-6">
          {/* Left Section: Title, Description */}
          <div className="flex-1">
            <Link
              to="/"
              className="hover:underline text-sm mb-4 inline-block"
            >
              ← Back
            </Link>
            <h1 className="text-3xl font-bold mb-4">{event.name}</h1>
            <p>{event.description}</p>
            <p>
              <strong>Location:</strong> {event.location}
            </p>
            <p>
              <strong>Start:</strong> {new Date(event.startDateAndTime.iso).toLocaleString()}
            </p>
            <p>
              <strong>End:</strong> {new Date(event.endDateAndTime.iso).toLocaleString()}
            </p>
          </div>

          {/* Right Section: Main Image */}
          <div className="flex-1 flex justify-center">
            <img
              src={event.thumbnail.url}
              alt={event.name}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
          </div>
        </div>

        {/* Slider Section: Additional Images */}
        <div className="p-6">
          {/* Use Swiper if more than one image */}
          <div className="section-header section-header--controls mb-6">
            {additionalImages.length >= 1 && (
              <div className="section-header__content">
              <h2 className="h2 text-2xl font-bold mb-2">
                {additionalImages.length > 1
                ? 'Additional Images'
                : 'Additional Image'}
              </h2>
            </div>
            )}
            {additionalImages.length > 1 && (
              <div className="slider-controls flex items-center gap-4">
              <button className="slide-btn slider-prev-btn-event">
                {/* Previous Button Icon */}
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                  <path d="M21.3337 16H10.667" stroke="#98A2B3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="swiper-pagination coming-events-pagination"></div>
              <button className="slide-btn slider-next-btn-event">
                {/* Next Button Icon */}
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                  <path d="M10.6663 16L21.333 16" stroke="#EE46BC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
                    src={image.url}
                    alt={`Additional ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : <SwiperSlide>
            <img
              src={additionalImages[0].url}
              alt={'Additional image'}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </SwiperSlide>}
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
