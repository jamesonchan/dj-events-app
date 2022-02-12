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

