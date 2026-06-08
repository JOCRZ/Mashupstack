import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmModal from '../components/ConfirmModal';

describe('ConfirmModal', () => {
  const defaultProps = {
    title: 'Delete Link',
    message: 'Are you sure?',
    onConfirm: jest.fn(),
    onCancel: jest.fn(),
  };

  it('renders title and message', () => {
    render(<ConfirmModal {...defaultProps} />);
    expect(screen.getByText('Delete Link')).toBeInTheDocument();
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
  });

  it('renders Cancel and Delete buttons', () => {
    render(<ConfirmModal {...defaultProps} />);
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('calls onConfirm when Delete clicked', () => {
    render(<ConfirmModal {...defaultProps} />);
    fireEvent.click(screen.getByText('Delete'));
    expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when Cancel clicked', () => {
    render(<ConfirmModal {...defaultProps} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(defaultProps.onCancel).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel on Escape key', () => {
    render(<ConfirmModal {...defaultProps} />);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(defaultProps.onCancel).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel on backdrop click', () => {
    render(<ConfirmModal {...defaultProps} />);
    const backdrop = document.querySelector('.modal-backdrop');
    fireEvent.click(backdrop);
    expect(defaultProps.onCancel).toHaveBeenCalled();
  });

  it('does not call onCancel when clicking inside modal content', () => {
    render(<ConfirmModal {...defaultProps} />);
    const content = document.querySelector('.modal-content');
    fireEvent.click(content);
    expect(defaultProps.onCancel).not.toHaveBeenCalled();
  });
});
