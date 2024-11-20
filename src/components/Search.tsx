import { ChangeEventHandler, FormEventHandler } from "react";

import '../styles/Search.css';
import SearchIcon from "./SearchIcon";

interface SearchProps {
  currentSearch: string;
  handleOnChange: ChangeEventHandler<HTMLInputElement>;
  handleSubmit: FormEventHandler<HTMLFormElement>;
}

const Search = ({currentSearch, handleOnChange, handleSubmit}: SearchProps) => {
  return (
    <form onSubmit={handleSubmit} data-testid="search-form" role="form" className="search-form">
      <label htmlFor="search" className="search-form__label visuallyhidden">Search</label>
      <SearchIcon />
      <input
        type="text"
        name="search"
        aria-label="search"
        className="search-form__input"
        data-testid="search"
        value={currentSearch}
        onChange={handleOnChange}
      />
    </form>
  );
};

export default Search;