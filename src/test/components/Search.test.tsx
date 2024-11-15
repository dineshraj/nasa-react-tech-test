import { render, screen } from "@testing-library/react";
import Search from "../../components/Search";

describe('Search', () => {
  it('renders the search input', async () => {
    render(<Search />);

    const logo = await screen.findByTestId('search');
    expect(logo).toBeTruthy();
  });
});