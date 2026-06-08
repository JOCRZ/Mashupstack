import { render, screen, fireEvent } from '@testing-library/react';
import QrModal from '../components/QrModal';

const mockLink = {
  short: 'http://192.168.1.15:8080/qr-test',
};

describe('QrModal', () => {
  it('renders QR modal with link', () => {
    render(<QrModal link={mockLink} onClose={jest.fn()} />);
    expect(screen.getByText(mockLink.short)).toBeInTheDocument();
  });

  it('shows loading spinner initially', () => {
    render(<QrModal link={mockLink} onClose={jest.fn()} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders Close button', () => {
    render(<QrModal link={mockLink} onClose={jest.fn()} />);
    expect(screen.getByText('Close')).toBeInTheDocument();
  });

  it('calls onClose when Close clicked', () => {
    const onClose = jest.fn();
    render(<QrModal link={mockLink} onClose={onClose} />);
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('returns null when link is null', () => {
    const { container } = render(<QrModal link={null} onClose={jest.fn()} />);
    expect(container.innerHTML).toBe('');
  });

  it('renders QR image with correct URL', () => {
    render(<QrModal link={mockLink} onClose={jest.fn()} />);
    const img = document.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img.src).toContain(encodeURIComponent(mockLink.short));
  });
});
