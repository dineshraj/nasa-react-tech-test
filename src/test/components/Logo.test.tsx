import Logo from '../../components/Logo';
import { render, screen, waitFor } from '@testing-library/react';

describe('Logo', () => {
  it('renders the logo', async () => {
    render(<Logo url='' alt='' />);

    const logo = await screen.findByTestId('logo');
    expect(logo).toBeTruthy();
  })
})