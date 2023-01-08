import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Row } from 'antd';
import './style.scss';
import ProductCard from '../../components/ProductCard';

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8085/cards', {
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
          <Link to="/glass">
            <img src="./img/glass.jpg" alt="Glass" className="Category"></img>
          </Link>
        </Col>
        <Col span={6}>
          <Link to="/paper">
            <img src="./img/paper.jpg" alt="Paper" className="Category"></img>
          </Link>
        </Col>
        <Col span={6}>
          <Link to="/metal">
            <img src="./img/metal.jpg" alt="Metal" className="Category"></img>
          </Link>
        </Col>
        <Col span={6}>
          <Link to="/plastic">
            <img src="./img/plastic.jpg" alt="Plastic" className="Category"></img>
          </Link>
        </Col>
      </Row>
      <h3 className="PageHeader">Останні оголошення</h3>
      <ul className="ContentContainer">
        {data.map((elem) => {
          return (
            <li key={elem._id}>
              <ProductCard
                price={elem.price}
                category={elem.category}
                image={'http://localhost:8085/public/cards-images/' + elem.images[0].name}
                title={elem.title}
                currency={elem.currency}
              />
            </li>
          );
        })}
      </ul>
      <Link to={'/products'}>
        <p className="link-success">До всіх оголошень</p>
      </Link>
    </div>
  );
}

export default Home;
