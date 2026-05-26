import { render, screen, fireEvent } from '@testing-library/react';
import Crud from './crud';

describe('CRUD Operations', () => {

  beforeEach(() => {
    render(<Crud />);
  });

  test('Read: displays initial items', () => {
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('David')).toBeInTheDocument();
    expect(screen.getByText('William')).toBeInTheDocument();
  });

  test('Create: adds a new item', () => {
    const input = screen.getByLabelText('Enter Name');
    fireEvent.change(input, { target: { value: 'Alice' } });
    fireEvent.click(screen.getByText('Add'));
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  test('Update: edits an existing item name', () => {
    const editButtons = screen.getAllByText('Edit');
    fireEvent.click(editButtons[0]);

    const editInput = screen.getByDisplayValue('John');
    fireEvent.change(editInput, { target: { value: 'Johnny' } });
    fireEvent.click(screen.getByText('Save'));

    expect(screen.getByText('Johnny')).toBeInTheDocument();
    expect(screen.queryByText('John')).not.toBeInTheDocument();
  });

  test('Update: cancels edit restores original name', () => {
    const editButtons = screen.getAllByText('Edit');
    fireEvent.click(editButtons[0]);

    const editInput = screen.getByDisplayValue('John');
    fireEvent.change(editInput, { target: { value: 'Johnny' } });
    fireEvent.click(screen.getByText('Cancel'));

    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.queryByText('Johnny')).not.toBeInTheDocument();
  });

  test('Delete: removes an item', () => {
    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);

    expect(screen.queryByText('John')).not.toBeInTheDocument();
    expect(screen.getByText('David')).toBeInTheDocument();
    expect(screen.getByText('William')).toBeInTheDocument();
  });

  test('Search: filters items by name', () => {
    const searchInput = screen.getByLabelText('Search Name:');
    fireEvent.change(searchInput, { target: { value: 'David' } });
    fireEvent.click(screen.getByText('Search'));

    expect(screen.getByText('David')).toBeInTheDocument();
    expect(screen.queryByText('John')).not.toBeInTheDocument();
    expect(screen.queryByText('William')).not.toBeInTheDocument();
  });

  test('Search: shows all items when search term is empty', () => {
    const searchInput = screen.getByLabelText('Search Name:');
    fireEvent.change(searchInput, { target: { value: 'David' } });
    fireEvent.click(screen.getByText('Search'));
    expect(screen.queryByText('John')).not.toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: '' } });
    fireEvent.click(screen.getByText('Search'));

    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('David')).toBeInTheDocument();
    expect(screen.getByText('William')).toBeInTheDocument();
  });

});
