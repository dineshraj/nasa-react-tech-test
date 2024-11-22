import { fireEvent, within, render, screen, waitFor } from '@testing-library/react';
import App from './App';

const fetchMock = (value: any) => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue(value)
  } as unknown as Response)
}

const mockImageItems = [
  {
    "href": "https://images-assets.nasa.gov/image/PIA12235/collection.json",
    "data": [
      {
          "center": "JPL",
          "title": "Nearside of the Moon",
          "nasa_id": "PIA12235",
          "date_created": "2009-09-24T18:00:22Z",
          "keywords": [
              "Moon",
              "Chandrayaan-1"
          ],
          "media_type": "image",
          "description_508": "Nearside of the Moon",
          "secondary_creator": "ISRO/NASA/JPL-Caltech/Brown Univ.",
          "description": "Nearside of the Moon"
      }
    ],
    "links": [
      {
        "href": "https://images-assets.nasa.gov/image/PIA12235/PIA12235~thumb.jpg",
        "rel": "preview",
        "render": "image"
      }
    ]
  },
  {
    "href": "https://images-assets.nasa.gov/image/PIA13517/collection.json",
    "data": [
      {
        "center": "JPL",
        "title": "Color of the Moon",
        "nasa_id": "PIA13517",
        "date_created": "2010-09-10T22:24:40Z",
        "keywords": [
            "Moon",
            "Lunar Reconnaissance Orbiter LRO"
        ],
        "media_type": "image",
        "description_508": "Color of the Moon",
        "secondary_creator": "NASA/GSFC/Arizona State University",
        "description": "Color of the Moon"
      }
    ],
    "links": [
      {
        "href": "https://images-assets.nasa.gov/image/PIA13517/PIA13517~thumb.jpg",
        "rel": "preview",
        "render": "image"
      }
    ]
  },
];


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

  it('errors gracefully when the fetch fails', async () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false
    } as unknown as Response);

    render(<App />);

    const searchElement = await screen.findByTestId('search');
    fireEvent.change(searchElement, { target: { value: 'moon' } })
    fireEvent.submit(searchElement)

    await waitFor(() => {
      expect(consoleLogSpy).toHaveBeenCalledWith('Error');
    })
  })


  it.only('renders the correct images when the user searches', async () => {
    fetchMock(mockImageItems);

    render(<App />);

    const searchElement = await screen.findByTestId('search');
    fireEvent.change(searchElement, { target: { value: 'moon' } })
    fireEvent.submit(searchElement)

    const imagesContainer = await screen.findByTestId('image-results');
    const imageResults = within(imagesContainer).getAllByRole('img');

    expect(imageResults).toHaveLength(2);
    expect(imageResults[0]).toHaveAttribute('src', 'https://images-assets.nasa.gov/image/PIA12235/PIA12235~thumb.jpg')
    expect(imageResults[1]).toHaveAttribute('src', 'https://images-assets.nasa.gov/image/PIA13517/PIA13517~thumb.jpg')
  });
})
