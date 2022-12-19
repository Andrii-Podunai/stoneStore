import React from 'react';
import { Card } from 'antd';

function ProductCard({ price, image, category, title }) {
  return (
    <Card
      hoverable
      style={{
        width: 240,
        fontFamily: 'Roboto, sans-serif',
        maxHeight: '456px',
      }}
      bodyStyle={{ paddingLeft: '10px', paddingRight: '10px' }}
      cover={<img style={{ height: '300px', objectFit: 'cover' }} alt="product" src={image} />}>
      <h4 className="fs-6 mb-3">{title}</h4>
      <p className="fst-italic">ціна: {price} грн</p>
      <Card.Meta description={category} />
    </Card>
  );
}

export default ProductCard;
