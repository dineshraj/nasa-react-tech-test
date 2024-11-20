import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

const fetchMock = (value: any) => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue(value)
  } as unknown as Response)
}


describe('App', () => {
  it('renders the App', async () => {
    const view = render(<App />);
    expect(view.container).not.toBeEmptyDOMElement();
  });

  it('renders the correct initial components', async () => {
    render(<App />);

    const logoElement = await screen.findByTestId('logo');
    const searchElement = await screen.findByTestId('search');

    expect(logoElement).toBeTruthy();
    expect(searchElement).toBeTruthy();
  });

  describe('Search', () => {

    afterEach(() => {
      jest.restoreAllMocks();
    });


    it('makes a fetch request with the correct url', async () => {
      fetchMock('');

      render(<App />);

      const searchElement = await screen.findByTestId('search');
      const expectedApiCall = 'https://images-api.nasa.gov/search?q=moon&media_type=image';

      fireEvent.change(searchElement, { target: { value: 'moon' } })
      fireEvent.submit(searchElement)

      expect(global.fetch).toHaveBeenCalledWith(expectedApiCall)
    });

    it('does not fetch if no search term is entered', async () => {
      fetchMock('');

      render(<App />);

      const searchElement = await screen.findByTestId('search');

      fireEvent.submit(searchElement)

      expect(global.fetch).not.toHaveBeenCalled()
    });
  });

  it.skip('errors gracefully when the fetch fails', () => {
    // jest.spyOn(global, 'fetch').mockResolvedValue({
    //   ok: true,
    //   json: jest.fn().mockResolvedValue('test')
    // } as unknown as Response)
  }) // use Error Boundary


  it.skip('renders the correct images when the user searches', () => {

  });
})
