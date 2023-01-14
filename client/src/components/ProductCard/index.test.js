import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductCard from './index';

describe('ProductCard component', () => {
  it('render ProductCard component', () => {
    render(
      <ProductCard
        title="Test"
        price="Test"
        image="https://upload.wikimedia.org/wikipedia/commons/b/bd/Test.svg"
        category="Test"
        currency="EUR"
        type="sell"
      />
    );
  });
  it('should correctly render content', () => {
    render(
      <ProductCard
        title="Test title in Product Card"
        price={22345}
        image="https://upload.wikimedia.org/wikipedia/commons/b/bd/Test.svg"
        category="Test category in Product Card"
        currency="EUR"
        type="sell"
      />
    );
    const titleElement = screen.getByText('Test title in Product Card');
    expect(titleElement).toBeInTheDocument();
    const priceElement = screen.getByText('ціна: 22.345,00 €');
    expect(priceElement).toBeInTheDocument();
    const imageElement = screen.getByAltText('product');
    expect(imageElement.src).toContain(
      'https://upload.wikimedia.org/wikipedia/commons/b/bd/Test.svg'
    );
    const categoryElement = screen.getByText('Test category in Product Card');
    expect(categoryElement).toBeInTheDocument();
    const typeElement = screen.getByText('продаж');
    expect(typeElement).toBeInTheDocument();
  });
  it('should render correctly ProductCard snapshot', () => {
    expect(
      render(
        <ProductCard
          title="Test title in Product Card"
          price={22345}
          image="https://upload.wikimedia.org/wikipedia/commons/b/bd/Test.svg"
          category="Test category in Product Card"
          currency="EUR"
          type="sell"
        />
      )
    ).toMatchSnapshot();
  });
});
