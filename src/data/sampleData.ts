// Sample data for when API is unavailable
export const sampleEvents = [
  {
    objectId: "sample1",
    name: "Digital Marketing Masterclass",
    description: "Learn the latest digital marketing strategies from industry experts. This comprehensive workshop covers SEO, social media marketing, content creation, and analytics.",
    thumbnail: { url: "https://via.placeholder.com/400x300/39405a/ffffff?text=Event+1" },
    startDateAndTime: { iso: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() }, // 7 days from now
    endDateAndTime: { iso: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString() }, // 2 hours later
    creatorId: "creator1",
    creator: { objectId: "creator1" }
  },
  {
    objectId: "sample2", 
    name: "Entrepreneurship Workshop",
    description: "Discover how to turn your ideas into successful businesses. Topics include business planning, funding, market research, and scaling strategies.",
    thumbnail: { url: "https://via.placeholder.com/400x300/EE46BC/ffffff?text=Event+2" },
    startDateAndTime: { iso: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString() }, // 14 days from now
    endDateAndTime: { iso: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000).toISOString() }, // 3 hours later
    creatorId: "creator2",
    creator: { objectId: "creator2" }
  },
  {
    objectId: "sample3",
    name: "Creative Design Bootcamp",
    description: "Master the fundamentals of graphic design, UI/UX principles, and creative thinking. Perfect for beginners and those looking to enhance their design skills.",
    thumbnail: { url: "https://via.placeholder.com/400x300/3C5BFF/ffffff?text=Event+3" },
    startDateAndTime: { iso: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString() }, // 21 days from now
    endDateAndTime: { iso: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000).toISOString() }, // 4 hours later
    creatorId: "creator3",
    creator: { objectId: "creator3" }
  }
];

export const sampleCreators = [
  {
    objectId: "creator1",
    isShowOnWeb: true,
    firstName: "Sarah",
    lastName: "Johnson",
    username: "sarah_marketing",
    profilePhoto: { url: "https://via.placeholder.com/200x200/39405a/ffffff?text=SJ" },
    bio: "Digital marketing expert with 10+ years of experience helping businesses grow online."
  },
  {
    objectId: "creator2", 
    isShowOnWeb: true,
    firstName: "Michael",
    lastName: "Chen",
    username: "mike_entrepreneur",
    profilePhoto: { url: "https://via.placeholder.com/200x200/EE46BC/ffffff?text=MC" },
    bio: "Serial entrepreneur and business mentor. Founded 3 successful startups."
  },
  {
    objectId: "creator3",
    isShowOnWeb: true,
    firstName: "Emma",
    lastName: "Rodriguez",
    username: "emma_design", 
    profilePhoto: { url: "https://via.placeholder.com/200x200/3C5BFF/ffffff?text=ER" },
    bio: "Creative director and design educator. Specializes in user experience and visual design."
  }
];