import './style.scss';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from 'variables';
import ProductCard from '../../components/ProductCard';
import emptyImg from '../../images/emptyImage.png';
import ModalComponent from '../../components/Modal';

function ProfilePage() {
  const { user } = useAuth0();
  const { getIdTokenClaims } = useAuth0();
  const { name: userName, picture: profilePhoto, given_name: fullName } = user;
  const [token, setToken] = useState([]);
  const [data, setData] = useState([]);
  const [userCards, setUserCards] = useState([]);
  const [sortBy, setSortBy] = useState('active');
  const [renderPage, setRenderPage] = useState('user-cards');
  const [favorites, setFavorites] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [favoriteCurrentId, setFavoriteCurrentId] = useState('');

  const handleModalCancel = (e) => {
    e.preventDefault();
    setOpenModal(false);
    setFavoriteCurrentId('');
  };

  const handleModalOk = (e) => {
    e.preventDefault();
    axios
      .patch(`${SERVER_URL}/my/favorites`, JSON.stringify(favoriteCurrentId), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setFavorites((prevState) => prevState.filter((id) => id !== favoriteCurrentId));
        setUserFav((prevState) => prevState.filter(({ _id }) => _id !== favoriteCurrentId));
      })
      .catch((error) => console.log('error', error));
    setOpenModal(false);
  };

  const showModal = (id) => {
    setOpenModal(true);
    setFavoriteCurrentId(id);
  };

  const filteredDataHandler = (data, value) =>
    data.filter(({ status }) => {
      return status.toUpperCase() === value.toUpperCase();
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getUserCards = async (token) => {
    axios
      .get(`${SERVER_URL}/my/cards`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setData(data);
        setUserCards(filteredDataHandler(data, sortBy));
      })
      .catch((error) => console.log('error', error));
  };

  const getMyFavorites = (token) => {
    if (token === false) {
      return;
    }
    axios
      .get(`${SERVER_URL}/my/favorites`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        if (!data || !data.favorites) {
          return;
        }
        setFavorites(data.favorites);
      })
      .catch((error) => console.log('error', error));
  };

  useEffect(() => {
    const getUserAccessToken = async () => {
      try {
        const accessToken = await getIdTokenClaims();
        setToken(accessToken.__raw);
        return accessToken.__raw;
      } catch (e) {
        console.log(e.message);
      }
    };

    getUserAccessToken().then((token) => {
      getUserCards(token);
      getMyFavorites(token);
    });
    // eslint-disable-next-line
  }, [getIdTokenClaims]);
  const deleteCardHandler = (id) => {
    const res = window.confirm('Ви впевнені, що хочете видалити запис?');
    if (res) {
      axios
        .delete(`${SERVER_URL}/cards/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => getUserCards(token))
        .catch((error) => console.log('error', error));
    }
  };
  const [userFav, setUserFav] = useState(filteredDataHandler(data, sortBy));
  const handleProfilePage = (e) => {
    const value = e.target.getAttribute('data-id');
    setRenderPage(value);
    if (favorites === false) {
      return;
    }
    if (value === 'user-fav') {
      favorites.forEach((id) => {
        axios.get(`${SERVER_URL}/cards/${id}`).then(({ data }) => {
          setUserFav((prev) => {
            return [...prev, data];
          });
        });
      });
    } else {
      setUserFav([]);
    }
  };
  const handleFilterValue = (e) => {
    if (e.target.tagName === 'LI') {
      const value = e.target.getAttribute('data-id');
      setSortBy(value);
      setUserCards(filteredDataHandler(data, value));
    }
  };
  const renderUserCards = (cards) => {
    return (
      <>
        <ul className={'option--list'} onClick={handleFilterValue}>
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
                          Можливо, ваше оголошення ще проходить перевірку. <br /> Завітайте у
                          вкладку "В обробці", щоб це перевірити.
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
                          Можливо, ваше оголошення ще проходить перевірку. <br /> Завітайте у
                          вкладку "В обробці", щоб це перевірити.
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
                  <Link
                    className="btn btn-outline-success m-2 py-2 text-decoration-none"
                    style={{ width: '120px' }}
                    to={`/products/${_id}/edit`}>
                    Редагувати
                  </Link>
                  <button
                    className="btn btn-outline-danger m-2 py-2 text-decoration-none"
                    style={{ width: '120px' }}
                    onClick={() => deleteCardHandler(_id)}>
                    Видалити
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </>
    );
  };
  const renderUserFav = (fav) => {
    if (fav.length === 0) {
      return (
        <div className="row py-lg-5">
          <div className="col-lg-8 col-md-8 mx-auto">
            <>
              <h1 className="fw-light">У вас немає товарів доданих в обране</h1>
              <p className="lead text-muted">
                Тут буде відображено товари, які ви додали в обране.
              </p>
            </>
          </div>
        </div>
      );
    } else {
      return (
        <>
          <ModalComponent
            title="Ви справді хочете прибрати з обраних?"
            handleOk={handleModalOk}
            open={openModal}
            handleCancel={handleModalCancel}
          />
          <ul className="list-unstyled d-flex gap-3 flex-wrap pt-3 pb-3">
            {fav.map(({ _id, price, images, category, title, currency, type }) => {
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
  };

  return (
    <main className="Main">
      <div className="Main-container">
        <header className="container profile-header my-3">
          <div className="d-flex flex-column align-items-center text-center">
            <img src={profilePhoto} alt={fullName} className="rounded-circle" width="100" />
            <div className="mt-3">
              <h4>{userName}</h4>
            </div>
          </div>
        </header>
        <section className="album py-3 bg-light profile-body">
          <div className="container">
            <ul className="nav nav-pills d-flex justify-content-center py-3">
              <li
                onClick={handleProfilePage}
                className={
                  'nav-item m-2 cursor-pointer ' +
                  (renderPage === 'user-cards' ? 'text-success' : 'text-secondary')
                }
                data-id={'user-cards'}>
                Ваші оголошення
              </li>
              <li
                onClick={handleProfilePage}
                className={
                  'nav-item m-2 cursor-pointer ' +
                  (renderPage === 'user-fav' ? 'text-success' : 'text-secondary')
                }
                data-id={'user-fav'}>
                Ваші вибрані
              </li>
            </ul>
            <section className="py-3 text-center container">
              {renderPage === 'user-cards' ? renderUserCards(userCards) : renderUserFav(userFav)}
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

export default ProfilePage;
