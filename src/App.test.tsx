import { render, screen, waitFor, queryAllByAttribute } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the App', async () => {
    const view = render(<App />);
    expect(view.container).not.toBeEmptyDOMElement();
  });

  it.skip('errors gracefully when the fetch fails', () => {
    
  }) // use Error Boundary

  it.skip('renders the correct initial components', () => {

  });

  it.skip('renders the correct images when the user searches');
})
