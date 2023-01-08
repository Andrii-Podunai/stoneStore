import { Card } from 'antd';
import './main.scss';

function ProductCard({ price, image, category, title, currency }) {
  return (
    <Card
      hoverable
      className="home-cards"
      bodyStyle={{ paddingLeft: '10px', paddingRight: '10px' }}
      cover={
        <img
          style={{ height: '300px', objectFit: 'cover' }}
          alt="product"
          src={image}
          crossOrigin="anonymous"
        />
      }>
      <h4 className="fs-6 mb-3">{title}</h4>
      <div className="d-flex align-items-center gap-1">
        <p className="fst-italic">
          ціна: {price.toLocaleString('de-DE', { style: 'currency', currency: currency })}
        </p>
      </div>
      <Card.Meta description={category} />
    </Card>
  );
}

export default ProductCard;
