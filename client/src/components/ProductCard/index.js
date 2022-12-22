import React from 'react';
import { Card } from 'antd';
import './main.scss';

function ProductCard({ price, image, category, title }) {
  return (
    <Card
      hoverable
      className="home-cards"
      bodyStyle={{ paddingLeft: '10px', paddingRight: '10px' }}
      cover={<img style={{ height: '300px', objectFit: 'cover' }} alt="product" src={image} />}>
      <h4 className="fs-6 mb-3">{title}</h4>
      <p className="fst-italic">ціна: {price} грн</p>
      <Card.Meta description={category} />
    </Card>
  );
}

export default ProductCard;
