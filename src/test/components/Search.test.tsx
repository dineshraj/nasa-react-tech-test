import { render, screen } from "@testing-library/react";
import Search from "../../components/Search";

describe('Search', () => {
  it('renders the search input with correct search term', async () => {
    render(<Search currentSearch="current search" handleOnChange={() => {}} handleSubmit={() => {}}/>);

    const searchForm = await screen.findByTestId('search-form');
    const searchInput = screen.getByRole('textbox', { name: 'search' } );

    expect(searchForm).toBeTruthy();
    expect(searchInput).toHaveValue('current search');
  });
});