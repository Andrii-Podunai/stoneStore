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
      />
    );
    const titleElement = screen.getByText('Test title in Product Card');
    expect(titleElement).toBeInTheDocument();
    const priceElement = screen.getByText('ціна: 22345 грн');
    expect(priceElement).toBeInTheDocument();
    const imageElement = screen.getByAltText('product');
    expect(imageElement.src).toContain(
      'https://upload.wikimedia.org/wikipedia/commons/b/bd/Test.svg'
    );
    const categoryElement = screen.getByText('Test category in Product Card');
    expect(categoryElement).toBeInTheDocument();
  });
  it('should render correctly ProductCard snapshot', () => {
    expect(
      render(
        <ProductCard
          title="Test title in Product Card"
          price={22345}
          image="https://upload.wikimedia.org/wikipedia/commons/b/bd/Test.svg"
          category="Test category in Product Card"
        />
      )
    ).toMatchSnapshot();
  });
});
