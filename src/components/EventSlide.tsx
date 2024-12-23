import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

interface EventProps {
  objectId: string;
  name: string;
  description: string;
  thumbnail: { url: string };
  startDate: string;
  endDate: string;
  creatorId: string;
}

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};

const EventSlide: React.FC<EventProps> = ({
  objectId,
  name,
  description,
  thumbnail,
  startDate,
  endDate,
  creatorId,
}) => {
  const creators = useSelector((state: RootState) => state.creators.creators);

  const creator = creators.find((c) => c.objectId === creatorId);

  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  return (
    <div className="flex flex-col bg-slate-900 text-white rounded-lg shadow-lg overflow-hidden h-full profiles__item l:min-h-[540px]">
      <div className="relative w-full profiles__img">
        <Link to={`/event/${objectId}`}>
          <img
            src={thumbnail.url}
            alt={name}
            className="w-full h-full object-cover transition-transform hover:scale-105 min-h-[300px]"
          />
        </Link>
      </div>

      <div className="p-4 flex flex-col flex-grow pt-0">
      <div className="data">
          <p className="text-lg">{`${formatDate(startDate)} - ${formatDate(
            endDate
          )}`}</p>
        </div>

        <h2 className="text-xl font-bold mb-2 text-[#D0D5DD]">{truncateText(name, 25)}</h2>
        <p className="text-gray-300 text-sm flex-grow">

          {truncateText(description, 35)}
        </p>

        <div className="mt-4 flex items-center justify-between">
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
