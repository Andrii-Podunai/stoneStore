import { useEffect, useState } from 'react';
import ProductForm from '../../components/ProductForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { SERVER_URL } from 'variables';

const initialValues = {
  name: '',
  title: '',
  description: '',
  price: 0,
  count: 0,
  category: '',
  phoneNumber: '',
  location: '',
  currency: 'UAH',
  type: '',
};

function CreateProductPage() {
  const navigate = useNavigate();
  const { getIdTokenClaims } = useAuth0();
  const [token, setToken] = useState();
  useEffect(() => {
    const getUserAccessToken = async () => {
      try {
        const accessToken = await getIdTokenClaims();
        setToken(accessToken.__raw);
      } catch (e) {
        console.log(e.message);
      }
    };

    getUserAccessToken();
  }, [getIdTokenClaims]);

  function submit(value, files) {
    axios
      .post(`${SERVER_URL}/cards`, JSON.stringify({ ...value, images: files }), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function () {
        navigate('/successfully');
      })
      .catch(function (error) {
        console.error(error.message);
      });
  }

  return <ProductForm initialValues={initialValues} submit={submit} />;
}

export default CreateProductPage;
