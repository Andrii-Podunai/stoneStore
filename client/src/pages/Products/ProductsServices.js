import emptyImg from '../../images/emptyImage.png';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';

const dataMapper = (data, favorites, token) => {
  if (data.length === 0) {
    return <h3 className="text-center">За вашим запитом нічого не знайдено</h3>;
  }
  return data.map(({ _id, price, images, category, title, currency, type }) => {
    const image = images.length > 0 && images[0].url ? images[0].url : emptyImg;
    let favorite = false;
    if (favorites !== false) {
      favorite = favorites.includes(_id);
    }
    return (
      <div key={_id} className="col p-0 d-flex justify-content-center">
        <Link to={_id} className="w-100 text-decoration-none">
          <ProductCard
            id={_id}
            price={price}
            category={category}
            title={title}
            image={image}
            currency={currency}
            type={type}
            favorite={favorite}
            userToken={token}
          />
        </Link>
      </div>
    );
  });
};

export { dataMapper };
