import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

const SuccessCreated = () => (
  <Result
    status="success"
    title="Дякуємо за публікацію оголошення"
    subTitle="Ваше оголошення скоро з'явиться на сайті"
    extra={[
      <Button type="text" style={{ border: '1px solid #d9d9d9' }} key="goback">
        <Link to={'/'} style={{ textDecoration: 'none', color: ' rgba(0, 0, 0, 0.88)' }}>
          На головну сторінку
        </Link>
      </Button>,
    ]}
  />
);

export default SuccessCreated;
