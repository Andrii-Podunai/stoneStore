import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../components/ProductComponent/style.scss';
import { SERVER_URL } from 'variables';
import { useAuth0 } from '@auth0/auth0-react';
import ProductComponent from '../../components/ProductComponent';

function ProductPage() {
  const { getIdTokenClaims } = useAuth0();
  const [token, setToken] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState();
  const { id } = useParams();

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

  if (!product) return <h4>Сторінка не знайдена</h4>;
  return <ProductComponent favorite={favorite} token={token} id={id} product={product} />;
}

export default ProductPage;
