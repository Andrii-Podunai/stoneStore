import ProductForm from 'components/ProductForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router-dom';
import { SERVER_URL } from 'variables';

function EditProductPage() {
  const [initialValues, setInitialValues] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { getIdTokenClaims } = useAuth0();
  const [token, setToken] = useState();
  const { id } = useParams();

  async function getData() {
    const { data } = await axios.get(`${SERVER_URL}/cards/${id}`);
    const {
      name,
      title,
      description,
      price,
      count,
      category,
      phoneNumber,
      location,
      currency,
      type,
      images,
    } = data;
    setLoading(false);
    setInitialValues({
      name,
      title,
      description,
      price,
      count,
      category,
      phoneNumber,
      location,
      currency,
      type,
      images,
    });
  }
  const getUserAccessToken = async () => {
    try {
      const accessToken = await getIdTokenClaims();
      setToken(accessToken.__raw);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getData();
    getUserAccessToken();
  }, []);

  function submit(value) {
    axios
      .put(`${SERVER_URL}/cards/${id}`, JSON.stringify(value), {
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
  if (loading) {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only"></span>
      </div>
    );
  }

  return <ProductForm initialValues={initialValues} submit={submit} />;
}
export default EditProductPage;
