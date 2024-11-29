import React from 'react';
import { Link } from 'react-router-dom';

interface CreatorSlideProps {
  objectId: string;
  firstName: string;
  lastName: string;
  image: { url: string };
  tagLine: string;
}

const CreatorSlide: React.FC<CreatorSlideProps> = ({
  objectId,
  firstName,
  lastName,
  image,
  tagLine,
}) => {
  const fullName = `${firstName} ${lastName}`.trim();
  const maxLength = 45;

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  const description = truncateText(tagLine || 'No description available', maxLength);

  return (
    <div className="flex flex-col bg-slate-900 text-white rounded-lg shadow-lg overflow-hidden h-full profiles__item min-h-[430px]">
      <div className="relative h-64 w-full profiles__img">
        <Link to={`/creator/${objectId}`}>
          <img
            src={image.url}
            alt={`${fullName}'s profile`}
            className="w-full h-full object-cover object-[0%_30%] transition-transform hover:scale-105"
          />
        </Link>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-bold mb-2">{fullName}</h2>
        <p className="text-gray-300 text-sm flex-grow">{description}</p>

        <Link
          to={`/creator/${objectId}`}
          className="font-semibold hover:underline popup-toggle flex items-center mt-4"
        >
          See creator's events
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
  );
};

export default CreatorSlide;
