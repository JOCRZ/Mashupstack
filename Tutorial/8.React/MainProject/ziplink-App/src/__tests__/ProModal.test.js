import { render, screen, fireEvent } from '@testing-library/react';
import ProModal from '../components/ProModal';

describe('ProModal', () => {
  it('renders upgrade message', () => {
    render(<ProModal onClose={jest.fn()} />);
    expect(screen.getByText('Upgrade to Pro')).toBeInTheDocument();
    expect(screen.getByText(/You've reached the 5-link limit/)).toBeInTheDocument();
  });

  it('renders Subscribe and Maybe later buttons', () => {
    render(<ProModal onClose={jest.fn()} />);
    expect(screen.getByText('Subscribe Now — $4.99/mo')).toBeInTheDocument();
    expect(screen.getByText('Maybe later')).toBeInTheDocument();
  });

  it('calls onClose when Maybe later clicked', () => {
    const onClose = jest.fn();
    render(<ProModal onClose={onClose} />);
    fireEvent.click(screen.getByText('Maybe later'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose on Escape key', () => {
    const onClose = jest.fn();
    render(<ProModal onClose={onClose} />);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
