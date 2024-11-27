import Logo from '../../components/Logo';
import { render, screen } from '@testing-library/react';

describe('Logo', () => {
  it('renders the logo', async () => {
    render(<Logo url="" alt="" />);

    const logoElement = await screen.findByTestId('logo');
    expect(logoElement).toBeTruthy();
  });
});
