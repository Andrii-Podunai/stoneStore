import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Carousel } from 'antd';
import './style.scss';
import { SERVER_URL } from 'variables';
import FavoriteService from '../../components/FavoriteService';
import { useAuth0 } from '@auth0/auth0-react';

function ProductPage() {
  const { getIdTokenClaims } = useAuth0();
  const [token, setToken] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState();
  const { id } = useParams();
  const dayjs = require('dayjs');

  async function getResponse() {
    setLoading(true);
    const { data } = await axios.get(`${SERVER_URL}/cards/${id}`);
    setLoading(false);
    setProduct(data);
  }

  useEffect(() => {
    getIdTokenClaims()
      .then((response) => setToken(response.__raw))
      .catch((err) => {
        console.log(err.message);
      });
  }, [getIdTokenClaims]);

  useEffect(() => {
    if (token === false) {
      return;
    }
    axios
      .get(`${SERVER_URL}/my/favorites`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        if (!data || !data.favorites) {
          return;
        }
        if (data.favorites.includes(id)) {
          setFavorite(true);
        }
      })
      .catch((error) => console.log('error', error));
  }, [token, id]);

  useEffect(() => {
    getResponse();
    // eslint-disable-next-line
  }, []);
  if (loading) {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only"></span>
      </div>
    );
  }
  const categoryObj = {
    glass: 'Скло',
    plastic: 'Пластик',
    paper: 'Папір',
    metal: 'Метал',
  };
  const typeObj = {
    buy: 'Купівля',
    sell: 'Продаж',
    free: 'Безкоштовно',
  };
  if (!product) return <h4>Сторінка не знайдена</h4>;
  return (
    <div className="product-main">
      <div className="product">
        <div className="product-img">
          <div className="product-star">
            <FavoriteService fill={favorite} token={token} id={id} />
          </div>
          <Carousel autoplay arrows dots={false} prevArrow={<button />} nextArrow={<button />}>
            {' '}
            {(product.images || []).map((image) => (
              <img key={image.key} src={image.url} alt="img" />
            ))}
          </Carousel>
        </div>
        <div className="product-info">
          <p className="product-info--dateAdd">
            Опубліковано {dayjs(parseInt(product.createdAt)).format('DD.MM.YYYY')}
          </p>
          <h2 className="product-info--title"> {product.title}</h2>{' '}
          <h3 className="product-info--price">
            {product.price.toLocaleString('de-DE', {
              style: 'currency',
              currency: product.currency,
            })}
          </h3>{' '}
          <p className="product-info--count">Кількість: {product.count}</p>{' '}
          <p className="product-info--type">{typeObj[product.type]}</p>
          <div className="product-info--category">
            <span className={`badge ${product.category}`}> {categoryObj[product.category]}</span>
          </div>
          <h3 className="product-info--descriptionTitle">Опис</h3>
          <p className="product-info--description">{product.description}</p>
        </div>
        <div className="product-info--seller">
          <h2 className="product-info--sellerTitle">Зв'язатися з продавцем</h2>
          <p className="product-info--name">{product.name}</p>
          <a className="product-info--number" href={`tel:${product.phoneNumber}`}>
            <i className="fa-solid fa-phone-volume mt-1" />
            {''} {product.phoneNumber}
          </a>
          <p className="product-info--location">
            Місцезнаходження:{' '}
            <a
              className="product-info--link"
              target={'_blank'}
              rel="noreferrer"
              href={`https://www.google.com/maps/place/${product.location}`}>
              {product.location}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
