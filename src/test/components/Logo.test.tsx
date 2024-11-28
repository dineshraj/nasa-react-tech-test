import Logo from '../../components/Logo';
import { render, screen } from '@testing-library/react';

describe('Logo', () => {
  it('renders the logo', () => {
    render(<Logo url="" alt="" />);

    const logoElement = screen.getByTestId('logo');
    expect(logoElement).toBeVisible();
  });
});
