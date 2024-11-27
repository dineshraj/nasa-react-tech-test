import { CSSProperties, FormEvent, FormEventHandler, useEffect, useState } from 'react';
import Logo from './components/Logo';
import Search from './components/Search';
import ImageResults from './components/ImageResults';

import { MoonLoader } from 'react-spinners';

import { SearchResults } from './types';
import ErrorMessage from './components/ErrorMessage';

const LOGO_URL = 'https://images.squarespace-cdn.com/content/v1/5046b167e4b0b2bcc3a91ee3/1518305402717-OE1WM7MOSG4QG1YTWIUO/NASA_Worm_logo.svg.png';

const loaderOverride: CSSProperties = {
  display: "block",
  margin: "0 auto",
  marginTop: "30px",
};

/* 
  TODO

  Make the search icon a button that submits the form
*/

const App = () => {
  const [currentSearch, setCurrentSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);

  const updateSearchTerm = ({ target }: { target: HTMLInputElement; }) => {
    setCurrentSearch(target.value.toLowerCase());
  }

  const fetchSearchTerm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // set error to false if there was one previously
    setError(false);
    
    if (currentSearch === '') return;
    // clear search results whilst loading new results
    setSearchResults(null);
    // loading results
    setLoading(true);

    try {
      const response = await fetch(`https://images-api.nasa.gov/search?q=${currentSearch}&media_type=image`);

      if (!response.ok) { 
        throw new Error('Error'); // use Error Boundary in future
      }
      
      const json = await response.json();
      setLoading(false);
      setSearchResults(json);

    } catch (e: any) {
      setLoading(false);
      setError(true);
      console.log(e.message);
    }
  }

  return (
    <>
      <Logo url={LOGO_URL} alt="NASA Logo"/>
      <Search handleOnChange={updateSearchTerm} handleSubmit={fetchSearchTerm} currentSearch={currentSearch} />
      <MoonLoader color="#000" loading={loading} cssOverride={loaderOverride} data-testid="loader"/>
      {error && <ErrorMessage />}
      {searchResults && <ImageResults searchResults={searchResults}/>}
    </>
  );
}

export default App;
