export interface Creator {
  objectId: string;
  firstName: string;
  lastName: string;
  aboutMe: string;
  address: string;
  tagLine: string;
  isShowOnWeb: boolean;
  instagramLink: string;
  image: {
    url: string;
  };
};

export interface Event {
  objectId: string;
  name: string;
  description: string;
  thumbnail: {
    __type: string;
    name: string;
    url: string;
  };
  startDateAndTime: {
    __type: string;
    iso: string;
  };
  endDateAndTime: {
    __type: string;
    iso: string;
  };
  location: string;
  displayExactTimeBeforeEvent: boolean;
  isFeaturedEvent: boolean;
  creatorId: string;
  otherCreators: string[];
  interestedMembers: unknown[];
  isCancelled: boolean;
  tagsIds: string[];
  eventTypeId: string;
  creator: {
    __type: string;
    className: string;
    objectId: string;
  };
  additionalImage1: {
    __type: string;
    name: string;
    url: string;
  };
  additionalImage2: {
    __type: string;
    name: string;
    url: string;
  };
  additionalImage3: {
    __type: string;
    name: string;
    url: string;
  };
  createdAt: string;
  updatedAt: string;
  eventTags: {
    __type: string;
    className: string;
  };
  eventTickets: {
    __type: string;
    className: string;
  };
};

export interface AboutUs {
  imageSrc: string;
  altText: string;
  name: string;
  description: string;
  profileLink: string;
}

export interface HomeProps {
  onJoinHub: () => void;
}
