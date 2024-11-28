import { CSSProperties, FormEvent, useEffect, useState } from 'react';
import { MoonLoader } from 'react-spinners';
import { useLocation } from 'react-router-dom';

import Logo from './components/Logo';
import Search from './components/Search';
import ImageResults from './components/ImageResults';
import Pagination from './components/Pagination';
import ErrorMessage from './components/ErrorMessage';

import { SearchResults } from './types';

const LOGO_URL =
  'https://images.squarespace-cdn.com/content/v1/5046b167e4b0b2bcc3a91ee3/1518305402717-OE1WM7MOSG4QG1YTWIUO/NASA_Worm_logo.svg.png';

const loaderOverride: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  marginTop: '30px',
};

const buildSearchURL = (currentSearch: string, currentPage: string = '1') => {
  return `https://images-api.nasa.gov/search?q=${currentSearch}&media_type=image&page=${currentPage}`;
};

/* 
  Page number over 10 with slice??

*/

const App = () => {
  const location = useLocation();

  const [currentSearch, setCurrentSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResults | null>(
    null
  );

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const currentPage = params.get('page') || '';

    if (currentSearch !== '') {
      fetchMethod(buildSearchURL(currentSearch, currentPage));
    } 
  }, [location.search]);

  const updateSearchTerm = ({ target }: { target: HTMLInputElement }) => {
    setCurrentSearch(target.value.toLowerCase());
  };

  const fetchMethod = async (url: string) => {
    // set error to false if there was one previously 6
    setError(false);

    // clear search results whilst loading new results
    setSearchResults(null);
    // loading results
    setLoading(true);
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Error');
      }

      const json = await response.json();
      setLoading(false);
      setSearchResults(json);
    } catch (e: any) {
      setLoading(false);
      setError(true);
      console.log(e.message);
    }
  };

  const fetchNextPage = async (url: string) => {
    fetchMethod(url);
  };

  const fetchSearchTerm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (currentSearch === '') return;

    fetchMethod(buildSearchURL(currentSearch));
  };

  const showPagination = () => {
    return (
      searchResults?.collection?.links && (
        <Pagination
          links={searchResults.collection.links}
        />
      )
    );
  };

  return (
    <>
      <Logo url={LOGO_URL} alt="NASA Logo" />
      <Search
        handleOnChange={updateSearchTerm}
        handleSubmit={fetchSearchTerm}
        currentSearch={currentSearch}
      />
      <MoonLoader
        color="#000"
        loading={loading}
        cssOverride={loaderOverride}
        data-testid="loader"
      />
      {error && <ErrorMessage />}
      {searchResults && <ImageResults searchResults={searchResults} />}
      {showPagination()}
    </>
  );
};

export default App;
