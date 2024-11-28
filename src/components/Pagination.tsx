import { Link } from 'react-router-dom';
import { PageLink } from '../types';

import '../styles/Pagination.css';

interface PaginationProps {
  links: PageLink[];
}

const Pagination = ({ links }: PaginationProps) => {
  return (
    <div className="pagination">
      {links.map((link: PageLink, i: number) => {
        return (
          <Link
            key={i}
            data-testid={link.rel}
            to={`?page=${link.href.slice(-1)}`}
          >
            {link.prompt}
          </Link>
        );
      })}
    </div>
  );
};

export default Pagination;
