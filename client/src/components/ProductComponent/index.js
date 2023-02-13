import FavoriteService from '../FavoriteService';
import { Carousel, Image } from 'antd';
import './style.scss';
import dayjs from 'dayjs';

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

function ProductComponent({ favorite = null, token = null, id = null, product }) {
  return (
    <div className="product-main">
      <div className="product">
        <div className="product-img">
          {token && id && (
            <div className="product-star">
              <FavoriteService fill={favorite} token={token} id={id} />
            </div>
          )}
          <Carousel autoplay arrows dots={false} prevArrow={<button />} nextArrow={<button />}>
            {(product.images || []).map((image) => (
              <Image key={image.key} src={image.url} alt="img" className="product-img--style" />
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

export default ProductComponent;
