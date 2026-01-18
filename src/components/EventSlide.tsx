import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetCreatorsQuery } from "../app/creatorsApi";
import Loader from "./Loader";
import { Creator } from "../types";
import TicketModal from "./Ticket/TicketModal";

interface EventProps {
  objectId: string;
  name: string;
  description: string;
  thumbnail: { url: string };
  startDate: string;
  endDate: string;
  creatorId: string;
  location?: string;
}

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const EventSlide: React.FC<EventProps> = ({
  objectId,
  name,
  description,
  thumbnail,
  startDate,
  endDate,
  creatorId,
  location,
}) => {
  const { data, error, isLoading } = useGetCreatorsQuery();

  if (isLoading) return <Loader />;
  if (error) return <p>Error loading events.</p>;

  const creators = data?.results || [];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const creator = creators.find((c: Creator) => c.objectId === creatorId);

  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  return (
    <div className="flex flex-col p-4 bg-slate-900 text-white rounded-lg shadow-lg overflow-hidden h-full profiles__item l:min-h-[540px] ">
      {isModalOpen && (
        <TicketModal
          eventId={objectId} 
          onClose={() => setIsModalOpen(false)}
          image={thumbnail.url}
          title={name}
          date={`${formatDate(startDate)} - ${formatDate(endDate)}`}
          location={location || "Unknown location"}
        />
      )}
      <div className="relative w-full aspect-[2/1] overflow-hidden rounded-lg mb-4">
        <Link to={`/event/${objectId}`}>
          <img
            src={thumbnail.url}
            alt={name}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </Link>
      </div>

      <div className="flex flex-col flex-grow pt-0">
        <div className="data">
          <p className="text-lg">{`${formatDate(startDate)} - ${formatDate(
            endDate
          )}`}</p>
        </div>

        <h2 className="text-xl font-bold mb-2 text-[#D0D5DD]">
          {truncateText(name, 25)}
        </h2>
        <p className="text-gray-300 text-sm flex-grow line-clamp-3">
          {description}
        </p>
        
        <button
          onClick={() => setIsModalOpen(true)}
          className="
        w-full h-13 rounded-lg border 
        border-[#3C5BFF] bg-[#3C5BFF] text-white font-bold
         text-lg leading-[20px] text-center py-4 px-4 
         hover:bg-blue-600 transition-colors mt-[22px] mb-[42px]">
          Buy tickets
        </button>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {creator?.image?.url && (
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img
                  src={creator.image.url}
                  alt={`${creator.firstName} ${creator.lastName}`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <span className="ml-2 text-gray-300">
              {creator?.firstName} {creator?.lastName}
            </span>
          </div>

          <Link
            to={`/event/${objectId}`}
            className="font-semibold hover:underline popup-toggle flex items-center mt-[0]"
          >
            See event
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
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventSlide;
