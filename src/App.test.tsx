import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it.skip('renders the App', () => {
    render(<App />);
    const linkElement = screen.getByText("");
    expect(linkElement).toBeInTheDocument();
  });

})
