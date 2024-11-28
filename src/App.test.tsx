import {
  fireEvent,
  within,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

const fetchMock = (value: any) => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue(value),
  } as unknown as Response);
};

const mockResponse = {
  collection: {
    version: '',
    href: '',
    items: [
      {
        href: 'https://images-assets.nasa.gov/image/PIA12235/collection.json',
        data: [
          {
            center: 'JPL',
            title: 'Nearside of the Moon',
            nasa_id: 'PIA12235',
            date_created: '2009-09-24T18:00:22Z',
            keywords: ['Moon', 'Chandrayaan-1'],
            media_type: 'image',
            description_508: 'Nearside of the Moon',
            secondary_creator: 'ISRO/NASA/JPL-Caltech/Brown Univ.',
            description: 'Nearside of the Moon',
          },
        ],
        links: [
          {
            href: 'https://images-assets.nasa.gov/image/PIA12235/PIA12235~thumb.jpg',
            rel: 'preview',
            render: 'image',
          },
        ],
      },
      {
        href: 'https://images-assets.nasa.gov/image/PIA13517/collection.json',
        data: [
          {
            center: 'JPL',
            title: 'Color of the Moon',
            nasa_id: 'PIA13517',
            date_created: '2010-09-10T22:24:40Z',
            keywords: ['Moon', 'Lunar Reconnaissance Orbiter LRO'],
            media_type: 'image',
            description_508: 'Color of the Moon',
            secondary_creator: 'NASA/GSFC/Arizona State University',
            description: 'Color of the Moon',
          },
        ],
        links: [
          {
            href: 'https://images-assets.nasa.gov/image/PIA13517/PIA13517~thumb.jpg',
            rel: 'preview',
            render: 'image',
          },
        ],
      },
    ],
    links: [{ rel: 'next', prompt: 'next', href: 'next page' }],
  },
};

const renderApp = () => {
  return render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
};

describe('App', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders the App', async () => {
    fetchMock('');
    const view = renderApp();

    await waitFor(() => {
      expect(view.container).not.toBeEmptyDOMElement();
    });
  });

  it('renders the correct initial components', async () => {
    fetchMock('');
    renderApp();

    const logoElement = await screen.findByTestId('logo');
    const searchElement = await screen.findByTestId('search');
    await waitFor(() => {
      expect(logoElement).toBeTruthy();
      expect(searchElement).toBeTruthy();
    });
  });

  describe('Search', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('makes a fetch request with the correct url', async () => {
      fetchMock('');

      renderApp();

      const searchElement = await screen.findByTestId('search');
      const expectedApiCall =
        'https://images-api.nasa.gov/search?q=moon&media_type=image';

      fireEvent.change(searchElement, { target: { value: 'moon' } });
      fireEvent.submit(searchElement);

      await waitFor(() =>
        expect(global.fetch).toHaveBeenCalledWith(expectedApiCall)
      );
    });

    it('it makes a fetch request correctly to the next page', async () => {
      fetchMock(mockResponse);

      renderApp();

      const searchElement = await screen.findByTestId('search');

      fireEvent.change(searchElement, { target: { value: 'moon' } });
      fireEvent.submit(searchElement);

      const nextLink = await screen.findByTestId('next');
      fireEvent.click(nextLink);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          'https://images-api.nasa.gov/search?q=moon&media_type=image&page=e'
        );
      });
    });

    it('does not fetch if no search term is entered', async () => {
      fetchMock('');

      renderApp();

      const searchElement = await screen.findByTestId('search');

      fireEvent.submit(searchElement);

      await waitFor(() => {
        expect(global.fetch).not.toHaveBeenCalled();
      });
    });
  });

  it('displays a console log message when the fetch fails', async () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
    } as unknown as Response);

    renderApp();

    const searchElement = await screen.findByTestId('search');
    fireEvent.change(searchElement, { target: { value: 'moon' } });
    fireEvent.submit(searchElement);

    await waitFor(() => {
      expect(consoleLogSpy).toHaveBeenCalledWith('Error');
    });
  });

  it('displays a graceful error message whenthe fetch fails', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
    } as unknown as Response);

    renderApp();

    const searchElement = await screen.findByTestId('search');
    fireEvent.change(searchElement, { target: { value: 'moon' } });
    fireEvent.submit(searchElement);

    await waitFor(() => {
      const errorElement = screen.queryByTestId('error');
      expect(errorElement).toBeInTheDocument();
    });
  });

  it('removes the error message if the fetch fails initially and then works afterwards', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        ok: false,
      } as unknown as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      } as unknown as Response);

    renderApp();

    let searchElement = await screen.findByTestId('search');
    fireEvent.change(searchElement, { target: { value: 'moon' } });
    fireEvent.submit(searchElement);

    await waitFor(() => {
      const errorElement = screen.queryByTestId('error');
      expect(errorElement).toBeInTheDocument();
    });

    fireEvent.change(searchElement, { target: { value: 'moon' } });
    fireEvent.submit(searchElement);

    await waitFor(() => {
      const errorElement = screen.queryByTestId('error');
      expect(errorElement).not.toBeInTheDocument();
    });
  });

  it('renders the correct images when the user searches', async () => {
    fetchMock(mockResponse);

    renderApp();

    const searchElement = await screen.findByTestId('search');
    fireEvent.change(searchElement, { target: { value: 'moon' } });
    fireEvent.submit(searchElement);

    const imagesContainer = await screen.findByTestId('image-results');
    const imageResults = within(imagesContainer).getAllByRole('img');

    expect(imageResults).toHaveLength(2);
    expect(imageResults[0]).toHaveAttribute(
      'src',
      'https://images-assets.nasa.gov/image/PIA12235/PIA12235~thumb.jpg'
    );
    expect(imageResults[1]).toHaveAttribute(
      'src',
      'https://images-assets.nasa.gov/image/PIA13517/PIA13517~thumb.jpg'
    );
  });

  it('sets a loading spinner when search is performed', async () => {
    fetchMock(mockResponse);

    renderApp();

    const searchElement = await screen.findByTestId('search');
    fireEvent.change(searchElement, { target: { value: 'moon' } });
    fireEvent.submit(searchElement);

    const loader = await screen.findByTestId('loader');
    expect(loader).toBeTruthy();
  });

  it('clears previous search results whilst a new search is being performed', async () => {
    fetchMock(mockResponse);

    renderApp();

    const searchElement = await screen.findByTestId('search');
    fireEvent.change(searchElement, { target: { value: 'moon' } });
    fireEvent.submit(searchElement);

    const imagesContainer = await screen.findByTestId('image-results');
    const imageResults = within(imagesContainer).getAllByRole('img');

    expect(imageResults).toHaveLength(2);

    fireEvent.change(searchElement, { target: { value: 'mars' } });
    fireEvent.submit(searchElement);

    await waitFor(() => {
      const imagesContainerAfterRerender =
        screen.queryByTestId('image-results');
      expect(imagesContainerAfterRerender).not.toBeInTheDocument();
    });
  });
});
