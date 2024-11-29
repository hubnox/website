import { Link, useParams } from 'react-router-dom';
import { useGetEventsQuery } from '../app/eventsApi';
import { Event } from '../types/home-type';

const CreatorEventsPage = () => {
  const { creatorId } = useParams<{ creatorId: string }>();
  const { data, error, isLoading } = useGetEventsQuery();

  const creatorEvents: Event[] = data?.results.filter(
    (event: Event) => event.creatorId === creatorId || event.otherCreators.includes(creatorId!)
  ) || [];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching events!</div>;

  return (
    <div>
      <Link to='/'>Back</Link>
      <h1>Events by Creator</h1>
      {creatorEvents.length > 0 ? (
        <ul>
          {creatorEvents.map((event) => (
            <li key={event.objectId}>
              <h3>{event.name}</h3>
              <p>{event.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No events found for this creator.</p>
      )}
    </div>
  );
};

export default CreatorEventsPage;
