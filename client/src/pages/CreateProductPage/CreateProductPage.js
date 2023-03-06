import ProductForm from '../../components/ProductForm';
import { useNavigate } from 'react-router-dom';
import { usePostForm, useUserToken } from 'rest';

const initialValues = {
  name: '',
  title: '',
  description: '',
  price: 0,
  count: 0,
  category: '',
  phoneNumber: '+38 (___) ___ __ __',
  location: '',
  currency: 'UAH',
  type: '',
  images: [],
};

function CreateProductPage() {
  const navigate = useNavigate();
  const [token] = useUserToken();
  const { reRenderPostForm, errorPostForm } = usePostForm();

  function submit(value) {
    reRenderPostForm(token, JSON.stringify(value)).then(() => {
      if (!errorPostForm) {
        navigate('/successfully');
      }
    });
  }

  return <ProductForm initialValues={initialValues} submit={submit} />;
}

export default CreateProductPage;
