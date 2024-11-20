import { FormEvent, FormEventHandler, useState } from 'react';
import Logo from './components/Logo';
import Search from './components/Search';

import './styles/App.css';

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
  const [currentSearch, setCurrentSearch] = useState('')

  const updateSearchTerm = ({ target }: { target: HTMLInputElement; }) => {
    setCurrentSearch(target.value.toLowerCase());
  }

  const fetchSearchTerm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (currentSearch === '') return;

    const response = await fetch(`https://images-api.nasa.gov/search?q=${currentSearch}&media_type=image`);
  }

  return (
    <>
      <Logo url={LOGO_URL} alt="NASA Logo"/>
      <Search handleOnChange={updateSearchTerm} handleSubmit={fetchSearchTerm} currentSearch={currentSearch} />
    </>
  );
}

export default App;
