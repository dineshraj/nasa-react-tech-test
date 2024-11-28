export interface SearchResults {
  collection: {
    href: string;
    items: Item[];
    links: PageLink[]
    metadata:  {
      total_hits: number;
    }
  }
}

export interface Item {
  data: Data[];
  href: string;
  links: Link[];
}

interface Data {
  center: string;
  date_created: string;
  description: string;
  description_508: string; 
  keywords: string[]; 
  media_type: string;
  nasa_id: string;
  secondary_creator: string;
  title: string; 
}

interface Link {
  href: string;
  rel: string;
  render: string;
}

export interface PageLink {
  href: string;
  prompt: string;
  rel: string;
}