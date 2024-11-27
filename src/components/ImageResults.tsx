import { SearchResults, Item } from '../types';

import '../styles/ImageResults.css';

interface ImageResultsProps {
  searchResults: SearchResults;
}

const ImageResults = ({ searchResults: { collection } }: ImageResultsProps) => {
  return (
    <div className="image-results" data-testid="image-results">
      {collection.items.map((item: Item, i: number) => (
        <img src={item.links[0].href} key={i} />
      ))}
    </div>
  );
};

export default ImageResults;
