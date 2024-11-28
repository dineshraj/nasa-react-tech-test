import { render, screen } from '@testing-library/react';
import Search from '../../components/Search';

describe('Search', () => {
  it('renders the search input with correct search term', () => {
    render(
      <Search
        currentSearch="current search"
        handleOnChange={() => {}}
        handleSubmit={() => {}}
      />
    );

    const searchForm = screen.getByTestId('search-form');
    const searchInput = screen.getByRole('textbox', { name: 'search' });

    expect(searchForm).toBeVisible();
    expect(searchInput).toHaveValue('current search');
  });
});
