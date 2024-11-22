import { SearchResults, Item } from "../types";

//@ts-ignore
const ImageResults = ({ searchResults: { collection } }: SearchResults) => {
  console.log("🚀 ~ ImageResults ~ images:", collection)
  return (
    <div data-testid="image-results">
      {
        collection.items.map((item: Item, i: number) => <img src={item.links[0].href} key={i} />)
      }
    </div>
  )
};

export default ImageResults;