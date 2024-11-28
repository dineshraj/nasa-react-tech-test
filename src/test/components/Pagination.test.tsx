import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Pagination from '../../components/Pagination';

import { PageLink } from '../../types';

const renderPagination = (links: PageLink[]) => {
  return render(
    <MemoryRouter>
      <Pagination links={links} handleNavigation={() => {}} />
    </MemoryRouter>
  );
};

describe('Pagination', () => {
  it('displays the next link if there is one', async () => {
    const mockLinks: PageLink[] = [
      {
        rel: 'next',
        prompt: 'Next',
        href: 'next page',
      },
    ];
    renderPagination(mockLinks);

    const paginationNext = await screen.findByTestId('next');
    expect(paginationNext).toBeVisible();
  });

  it('displays the previous link if there is one', async () => {
    const mockLinks: PageLink[] = [
      {
        rel: 'prev',
        prompt: 'Previous',
        href: 'previous page',
      },
    ];
    renderPagination(mockLinks);

    const paginationPrev = await screen.findByTestId('prev');
    expect(paginationPrev).toBeVisible();
  });

  it('displays both links if there is one', async () => {
    const mockLinks: PageLink[] = [
      {
        rel: 'next',
        prompt: 'Next',
        href: 'next page',
      },
      {
        rel: 'prev',
        prompt: 'Previous',
        href: 'previous page',
      },
    ];
    renderPagination(mockLinks);

    const paginationPrev = await screen.findByTestId('prev');
    const paginationNext = await screen.findByTestId('next');
    expect(paginationPrev).toBeVisible();
    expect(paginationNext).toBeVisible();
  });
});
