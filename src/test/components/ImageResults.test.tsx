import ImageResults from '../../components/ImageResults';
import { render, screen } from '@testing-library/react';
import { SearchResults } from '../../types';

const mockResponse = {
  collection: {
    version: '',
    href: "",
    items: [
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
      }
    ],
    links: [{
      href: '',
      rel: '',
      render: ''
    }],
    metadata:  {
      total_hits: 2
    }
  }
} as unknown as SearchResults;


describe('Logo', () => {
  it('renders the logo', async () => {
    render(<ImageResults searchResults={mockResponse} />);

    const imageResult = await screen.findByTestId('image-results');
    expect(imageResult).toBeTruthy();
  })
})