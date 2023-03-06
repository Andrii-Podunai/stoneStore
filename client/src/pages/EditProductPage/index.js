import ProductForm from 'components/ProductForm';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCard, usePutForm, useUserToken } from 'rest';

function EditProductPage() {
  const [initialValues, setInitialValues] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [token] = useUserToken();
  const { card } = useCard();
  const { reRenderPutForm, errorPutForm } = usePutForm();

  useEffect(() => {
    if (card === false) {
      return;
    }
    const dataValues = {
      name: card.name,
      title: card.title,
      description: card.description,
      price: card.price,
      count: card.count,
      category: card.category,
      phoneNumber: card.phoneNumber,
      location: card.location,
      currency: card.currency,
      type: card.type,
      images: card.images,
    };
    setInitialValues(dataValues);
    setLoading(false);
  }, [card]);

  function submit(value) {
    reRenderPutForm(token, JSON.stringify(value)).then(() => {
      if (!errorPutForm) {
        navigate('/successfully');
      }
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
