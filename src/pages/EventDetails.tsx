import { Link, useParams } from 'react-router-dom';
import { Event } from '../types/home-type';
import { useGetEventsQuery } from '../app/eventsApi';
import Loader from '../components/Loader';

const EventDetailsPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { data, error, isLoading } = useGetEventsQuery();

  if (isLoading) return <Loader />;
  if (error) return <p className="text-center text-red-500">Error loading events.</p>;

  const events = data?.results || [];
  const event = events.find((event: Event) => event.objectId === eventId);

  if (!event) {
    return <div className="text-center text-lg text-gray-600">Event not found!</div>;
  }

  return (
    <div className="min-h-screen 100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <Link
            to="/"
            className="text-blue-500 hover:underline text-sm mb-4 inline-block"
          >
            ← Back
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{event.name}</h1>
          <img
            src={event.thumbnail.url}
            alt={event.name}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <p className="text-gray-700 mb-4">{event.description}</p>
          <p className="text-gray-600 mb-2">
            <strong>Location:</strong> {event.location}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Start:</strong> {new Date(event.startDateAndTime.iso).toLocaleString()}
          </p>
          <p className="text-gray-600 mb-4">
            <strong>End:</strong> {new Date(event.endDateAndTime.iso).toLocaleString()}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {event.additionalImage1 && (
              <img
                src={event.additionalImage1.url}
                alt="Additional"
                className="rounded-lg shadow-sm"
              />
            )}
            {event.additionalImage2 && (
              <img
                src={event.additionalImage2.url}
                alt="Additional"
                className="rounded-lg shadow-sm"
              />
            )}
            {event.additionalImage3 && (
              <img
                src={event.additionalImage3.url}
                alt="Additional"
                className="rounded-lg shadow-sm"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
