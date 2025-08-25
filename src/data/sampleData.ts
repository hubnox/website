// Import actual assets to use in sample data
import event1 from '../assets/images/event-1.webp';
import event2 from '../assets/images/event-2.webp'; 
import event3 from '../assets/images/event-3.webp';

// Sample data for when API is unavailable
export const sampleEvents = [
  {
    objectId: "sample1",
    name: "Digital Marketing Masterclass",
    description: "Learn the latest digital marketing strategies from industry experts. This comprehensive workshop covers SEO, social media marketing, content creation, and analytics.",
    thumbnail: { url: event1 },
    startDateAndTime: { iso: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() }, // 7 days from now
    endDateAndTime: { iso: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString() }, // 2 hours later
    creatorId: "creator1",
    creator: { objectId: "creator1" }
  },
  {
    objectId: "sample2", 
    name: "Entrepreneurship Workshop",
    description: "Discover how to turn your ideas into successful businesses. Topics include business planning, funding, market research, and scaling strategies.",
    thumbnail: { url: event2 },
    startDateAndTime: { iso: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString() }, // 14 days from now
    endDateAndTime: { iso: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000).toISOString() }, // 3 hours later
    creatorId: "creator2",
    creator: { objectId: "creator2" }
  },
  {
    objectId: "sample3",
    name: "Creative Design Bootcamp",
    description: "Master the fundamentals of graphic design, UI/UX principles, and creative thinking. Perfect for beginners and those looking to enhance their design skills.",
    thumbnail: { url: event3 },
    startDateAndTime: { iso: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString() }, // 21 days from now
    endDateAndTime: { iso: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000).toISOString() }, // 4 hours later
    creatorId: "creator3",
    creator: { objectId: "creator3" }
  }
];

// Import actual creator assets
import creator1 from '../assets/images/creator-1.png';
import creator2 from '../assets/images/creator-2.png';
import creator3 from '../assets/images/creator-3.png';

export const sampleCreators = [
  {
    objectId: "creator1",
    isShowOnWeb: true,
    firstName: "Sarah",
    lastName: "Johnson",
    username: "sarah_marketing",
    profilePhoto: { url: creator1 },
    bio: "Digital marketing expert with 10+ years of experience helping businesses grow online."
  },
  {
    objectId: "creator2", 
    isShowOnWeb: true,
    firstName: "Michael",
    lastName: "Chen",
    username: "mike_entrepreneur",
    profilePhoto: { url: creator2 },
    bio: "Serial entrepreneur and business mentor. Founded 3 successful startups."
  },
  {
    objectId: "creator3",
    isShowOnWeb: true,
    firstName: "Emma",
    lastName: "Rodriguez",
    username: "emma_design", 
    profilePhoto: { url: creator3 },
    bio: "Creative director and design educator. Specializes in user experience and visual design."
  }
];