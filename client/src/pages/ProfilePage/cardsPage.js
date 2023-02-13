import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import emptyImg from '../../images/emptyImage.png';
import ModalComponent from '../../components/Modal';

export default function renderUserCards(
  cards,
  sortBy,
  handleFilterValue,
  showModal,
  openModal,
  handleRemoveCards,
  handleModalCancel
) {
  return (
    <>
      <ul className={'option--list'} onClick={(e) => handleFilterValue(e)}>
        <li
          className={'option--item text-success ' + (sortBy === 'active' ? 'active' : '')}
          data-id="active">
          Активні
        </li>
        <li
          className={'option--item text-success ' + (sortBy === 'pending' ? 'active' : '')}
          data-id="pending">
          В обробці
        </li>
        <li
          className={'option--item text-success ' + (sortBy === 'rejected' ? 'active' : '')}
          data-id="rejected">
          Скасовані
        </li>
      </ul>
      {cards.length === 0 ? (
        <div className="row py-lg-5">
          <div className="col-lg-8 col-md-8 mx-auto">
            {(() => {
              switch (sortBy) {
                case 'active':
                  return (
                    <>
                      <h1 className="fw-light">У вас немає активних оголошень</h1>
                      <p className="lead text-muted">
                        Можливо, ваше оголошення ще проходить перевірку. <br /> Завітайте у вкладку
                        "В обробці", щоб це перевірити.
                      </p>
                    </>
                  );
                case 'pending':
                  return (
                    <>
                      <h1 className="fw-light">У вас немає оголошень в обробці</h1>
                      <p className="lead text-muted">
                        Створіть нове оголошення і воно з'явиться тут.
                      </p>
                    </>
                  );
                case 'rejected':
                  return (
                    <>
                      <h1 className="fw-light">У вас немає скасованих оголошень</h1>
                      <p className="lead text-muted">
                        Тут з'являться оголошення, які порушують правила платформи.
                      </p>
                    </>
                  );
                default:
                  return (
                    <>
                      <h1 className="fw-light">У вас немає активних оголошень</h1>
                      <p className="lead text-muted">
                        Можливо, ваше оголошення ще проходить перевірку. <br /> Завітайте у вкладку
                        "В обробці", щоб це перевірити.
                      </p>
                    </>
                  );
              }
            })()}
            <p>
              <Link to="/create" className="btn btn-outline-success my-2">
                Створити оголошення
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <ul className="list-unstyled d-flex gap-3 flex-wrap pt-3 pb-3 justify-content-center justify-content-md-start">
          {cards.map(({ _id, price, images, category, title, currency, type }) => {
            return (
              <li key={_id} className="profile-cards-item border border-rounded pb-2">
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
                <Link
                  className="btn btn-outline-success m-2 py-2 text-decoration-none"
                  style={{ width: '120px' }}
                  to={`/products/${_id}/edit`}>
                  Редагувати
                </Link>
                <button
                  className="btn btn-outline-danger m-2 py-2 text-decoration-none"
                  style={{ width: '120px' }}
                  onClick={() => showModal(_id)}>
                  Видалити
                </button>
                <ModalComponent
                  title="Ви впевнені, що хочете видалити товар?"
                  handleOk={(e) => handleRemoveCards(e)}
                  open={openModal}
                  handleCancel={(e) => handleModalCancel(e)}
                />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
