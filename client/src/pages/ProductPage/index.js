import '../../components/ProductComponent/style.scss';
import Loader from '../../components/Loader';
import ProductComponent from 'components/ProductComponent';
import { useUserToken, useFavorites, useCard } from 'rest';
import { useEffect, useState } from 'react';

function ProductPage() {
  const [token] = useUserToken();
  const { favorites } = useFavorites(token);
  const [currentFavorite, setCurrentFavorite] = useState(false);
  const { card, loadingCard, errorCard } = useCard();

  useEffect(() => {
    if (favorites && card) {
      if (favorites.includes(card._id)) {
        setCurrentFavorite(true);
      }
    }
  }, [favorites, card]);

  if (loadingCard) {
    return <Loader />;
  }

  if (errorCard) {
    return <h4>Сторінка не знайдена</h4>;
  }
  return <ProductComponent favorite={currentFavorite} token={token} id={card._id} product={card} />;
}

export default ProductPage;
