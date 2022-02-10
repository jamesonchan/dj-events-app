export interface LayoutProps {
  title?: string;
  description?: string;
  keywords?: string;
}

export interface Events {
  id: string;
  name: string;
  slug: string;
  venue: string;
  address: string;
  performers: string;
  date: string;
  time: string;
  description: string;
  image: string;
}

export type Event={
  evt:Events
}
