import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Row } from 'antd';
import emptyImg from 'images/emptyImage.png';
import './style.scss';
import ProductCard from 'components/ProductCard';
import { SERVER_URL } from 'variables';

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/cards`, {
        params: {
          page: 1,
          amount: 12,
        },
      })
      .then(({ data }) => setData(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="container-main">
      <Row style={{ marginTop: '10px' }}>
        <Col span={6}>
          <Link to="/products?category=glass">
            <img src="./img/glass.jpg" alt="Glass" className="Category"></img>
          </Link>
        </Col>
        <Col span={6}>
          <Link to="/products?category=paper">
            <img src="./img/paper.jpg" alt="Paper" className="Category"></img>
          </Link>
        </Col>
        <Col span={6}>
          <Link to="/products?category=metal">
            <img src="./img/metal.jpg" alt="Metal" className="Category"></img>
          </Link>
        </Col>
        <Col span={6}>
          <Link to="/products?category=plastic">
            <img src="./img/plastic.jpg" alt="Plastic" className="Category"></img>
          </Link>
        </Col>
      </Row>
      <h3 className="PageHeader">Останні оголошення</h3>
      <ul className="container row mx-auto gap-3 list-unstyled py-3">
        {data.map((elem) => {
          const image =
            elem.images.length > 0 && elem.images[0].url ? elem.images[0].url : emptyImg;
          return (
            <li key={elem._id} className="col p-0 d-flex justify-content-center">
              <Link className="w-100 text-decoration-none" to={`/products/${elem._id}`}>
                <ProductCard
                  price={elem.price}
                  category={elem.category}
                  image={image}
                  title={elem.title}
                  currency={elem.currency}
                  type={elem.type}
                />
              </Link>
            </li>
          );
        })}
      </ul>
      <Link to={'/products?category=all'}>
        <p className="link-success">До всіх оголошень</p>
      </Link>
    </div>
  );
}

export default Home;
