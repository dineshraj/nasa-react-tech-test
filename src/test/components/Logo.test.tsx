import Logo from '../../components/Logo';
import { render, screen, waitFor } from '@testing-library/react';

describe('Logo', () => {
  it('renders the logo', async () => {
    render(<Logo />);

    await waitFor(() => {
      const logo = screen.queryByTestId('nasa-logo');
      expect(logo).toBe(true);
    })

  })
})