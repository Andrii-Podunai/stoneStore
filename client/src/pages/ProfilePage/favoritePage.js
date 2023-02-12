import ModalComponent from '../../components/Modal';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import emptyImg from '../../images/emptyImage.png';

export default function renderUserFav(
  favorite,
  showModal,
  openModal,
  handleRemoveFav,
  handleModalCancel
) {
  if (favorite.length === 0) {
    return (
      <div className="row py-lg-5">
        <div className="col-lg-8 col-md-8 mx-auto">
          <>
            <h1 className="fw-light">У вас немає товарів доданих в обране</h1>
            <p className="lead text-muted">Тут буде відображено товари, які ви додали в обране.</p>
          </>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <ModalComponent
          title="Ви справді хочете прибрати з обраних?"
          handleOk={(e) => handleRemoveFav(e)}
          open={openModal}
          handleCancel={(e) => handleModalCancel(e)}
        />
        <ul className="list-unstyled d-flex gap-3 flex-wrap pt-3 pb-3">
          {favorite.map(({ _id, price, images, category, title, currency, type }) => {
            return (
              <li key={_id} className="border border-rounded pb-2">
                <Link to={'/products/' + _id} className="text-decoration-none border-rounded">
                  <ProductCard
                    price={price}
                    category={category}
                    title={title}
                    image={images.length > 0 && images[0].url ? images[0].url : emptyImg}
                    currency={currency}
                    type={type}
                    favorite={false}
                    userToken={false}
                  />
                </Link>
                <button
                  className="btn btn-outline-primary m-2 py-2 text-decoration-none"
                  style={{ width: '200px' }}
                  onClick={() => showModal(_id)}>
                  Прибрати з обраних
                </button>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}
