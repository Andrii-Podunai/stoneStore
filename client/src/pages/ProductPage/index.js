import ProductComponent from 'components/ProductComponent';
import { useUserToken, useFavorites, useCard } from 'rest';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductPage() {
  const [token] = useUserToken();
  const { favorites } = useFavorites(token);
  const [currentFavorite, setCurrentFavorite] = useState(false);
  const { id } = useParams();
  const { card, loadingCard, errorCard } = useCard(id);

  useEffect(() => {
    if (favorites && card) {
      if (favorites.includes(card._id)) {
        setCurrentFavorite(true);
      }
    }
  }, [favorites, card]);

  if (loadingCard) {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only"></span>
      </div>
    );
  }

  if (errorCard) {
    return <h4>Сторінка не знайдена</h4>;
  }
  return <ProductComponent favorite={currentFavorite} token={token} id={card._id} product={card} />;
}

export default ProductPage;
