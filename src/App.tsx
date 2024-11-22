import { FormEvent, FormEventHandler, useEffect, useState } from 'react';
import Logo from './components/Logo';
import Search from './components/Search';
import ImageResults from './components/ImageResults';

import { SearchResults } from './types';

/* 
  - TDD!
  - Display the logo - make it responsive using media queries
  - Display a search bar (again responsive)
  - Make search bar a controlled component
  - When search is hit, it sets the search term and the useEffect responds
    useEffect(() => {}, [searchTerm]) etc
  - The use effect will set the results that will cause a re-render
  - Set loading spinner when the results are being retrieved
  - Render the images in the results (use flexbox)
  - Style search bar
*/

const LOGO_URL = 'https://images.squarespace-cdn.com/content/v1/5046b167e4b0b2bcc3a91ee3/1518305402717-OE1WM7MOSG4QG1YTWIUO/NASA_Worm_logo.svg.png';



const App = () => {
  console.log('RENDER')
  const [currentSearch, setCurrentSearch] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);

  const updateSearchTerm = ({ target }: { target: HTMLInputElement; }) => {
    setCurrentSearch(target.value.toLowerCase());
  }

  const fetchSearchTerm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (currentSearch === '') return;

    try {
      const response = await fetch(`https://images-api.nasa.gov/search?q=${currentSearch}&media_type=image`);

      if (!response.ok) { 
        throw new Error('Error'); // use Error Boundary in future
      }

      const json = await response.json();
      setSearchResults(json);

    } catch (e: any) {
      console.log(e.message);
    }
  }
  console.log('searchResults22', searchResults)

  return (
    <>
      <Logo url={LOGO_URL} alt="NASA Logo"/>
      <Search handleOnChange={updateSearchTerm} handleSubmit={fetchSearchTerm} currentSearch={currentSearch} />

      {//@ts-ignore
      searchResults && <ImageResults searchResults={searchResults}/>}
    </>
  );
}

export default App;
