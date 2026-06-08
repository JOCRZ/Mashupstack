import { render, screen, fireEvent } from '@testing-library/react';
import EditLinkModal from '../components/EditLinkModal';

const mockLink = {
  short: 'http://192.168.1.15:8080/abc',
  long: 'https://example.com/old',
  title: 'Old Title',
  date: '2025-01-01T00:00:00.000Z',
};

describe('EditLinkModal', () => {
  const defaultProps = {
    link: mockLink,
    onSave: jest.fn(),
    onCancel: jest.fn(),
    mode: 'edit',
  };

  it('renders Edit Link heading in edit mode', () => {
    render(<EditLinkModal {...defaultProps} />);
    expect(screen.getByText('Edit Link')).toBeInTheDocument();
  });

  it('renders Preview heading in preview mode', () => {
    render(<EditLinkModal {...defaultProps} mode="preview" />);
    expect(screen.getByText('Preview')).toBeInTheDocument();
  });

  it('renders Save button with correct variant in edit mode', () => {
    render(<EditLinkModal {...defaultProps} />);
    const saveBtn = screen.getByText('Save');
    expect(saveBtn).toHaveClass('btn-primary');
  });

  it('renders Save button with success variant in preview mode', () => {
    render(<EditLinkModal {...defaultProps} mode="preview" />);
    const saveBtn = screen.getByText('Save');
    expect(saveBtn).toHaveClass('btn-success');
  });

  it('pre-fills inputs with link data', () => {
    render(<EditLinkModal {...defaultProps} />);
    expect(screen.getByDisplayValue('Old Title')).toBeInTheDocument();
    expect(screen.getByDisplayValue('https://example.com/old')).toBeInTheDocument();
  });

  it('calls onSave with updated values', () => {
    render(<EditLinkModal {...defaultProps} />);
    const titleInput = screen.getByDisplayValue('Old Title');
    fireEvent.change(titleInput, { target: { value: 'New Title' } });

    fireEvent.click(screen.getByText('Save'));
    expect(defaultProps.onSave).toHaveBeenCalledWith({
      ...mockLink,
      title: 'New Title',
      long: 'https://example.com/old',
    });
  });

  it('calls onCancel when Cancel clicked', () => {
    render(<EditLinkModal {...defaultProps} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(defaultProps.onCancel).toHaveBeenCalledTimes(1);
  });

  it('returns null when link is null', () => {
    const { container } = render(<EditLinkModal {...defaultProps} link={null} />);
    expect(container.innerHTML).toBe('');
  });
});
