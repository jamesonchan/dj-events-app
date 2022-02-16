export interface LayoutProps {
  title?: string;
  description?: string;
  keywords?: string;
}

export interface Images {
  data: {
    attributes: {
      formats: {
        large: {
          url: string;
        };
        medium: {
          url: string;
        };
        small: {
          url: string;
        };
        thumbnail: {
          url: string;
        };
      };
    };
  };
}

export interface Events {
  id: string;
  attributes: {
    name: string;
    slug: string;
    venue: string;
    address: string;
    performers: string;
    date: string;
    time: string;
    description: string;
    publishedAt: string;
    updatedAt: string;
    image: Images;
  };
}

export interface UserImages {
  formats: {
    large: {
      url: string;
    };
    medium: {
      url: string;
    };
    small: {
      url: string;
    };
    thumbnail: {
      url: string;
    };
  };
}

export interface User {
  id: number;
  email: string;
  username: string;
}

export interface UserEvents {
  id: number;
  name: string;
  slug: string;
  venue: string;
  address: string;
  performers: string;
  date: string;
  time: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  image: UserImages;
  user: User;
}

export interface AddEventsState {
  name: string;
  address: string;
  performers: string;
  date: string;
  time: string;
  venue: string;
  description: string;
}

export interface ModalProps {
  show: boolean;
  onClose: () => void;
  title: string;
}

export interface ImageUploadProps {
  evtId: string;
  imageUploaded: () => void;
}

interface RegisterUser {
  username: string;
  email: string;
  password: string;
}

interface LoginUser {
  email: string;
  password: string;
}
