import {render, screen} from '@testing-library/react';
import Test from './Test';
import '@testing-library/jest-dom'
test('Add to cart test passed ', () => {
  render(<Test/>);
  const linkElement = screen.getByText(/Add to cart/i);
  expect(linkElement).toBeInTheDocument();
});
test('Validate Product test passed ', () => {
    render(<Test/>);
    const linkElement = screen.getByText(/Validate Product/i);
    expect(linkElement).toBeInTheDocument();
  });
  test('Add product test passed ', () => {
    render(<Test/>);
    const linkElement = screen.getByText(/Add Product/i);
    expect(linkElement).toBeInTheDocument();
  });
  test('Stock Request test passed ', () => {
    render(<Test/>);
    const linkElement = screen.getByText(/Stock Request/i);
    expect(linkElement).toBeInTheDocument();
  });

