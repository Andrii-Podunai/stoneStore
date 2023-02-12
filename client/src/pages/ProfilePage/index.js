import './style.scss';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from 'variables';
import renderUserCards from './cardsPage';
import renderUserFav from './favoritePage';
function ProfilePage() {
  const { user } = useAuth0();
  const { getIdTokenClaims } = useAuth0();
  const { name: userName, picture: profilePhoto, given_name: fullName } = user;
  const [token, setToken] = useState([]);
  const [data, setData] = useState([]);
  const [userCards, setUserCards] = useState([]);
  const [userFav, setUserFav] = useState([]);
  const [sortBy, setSortBy] = useState('active');
  const [renderPage, setRenderPage] = useState('user-cards');
  const [openModal, setOpenModal] = useState(false);
  const [modalCurrentId, setModalCurrentId] = useState('');
  const showModal = (id) => {
    setOpenModal(true);
    setModalCurrentId(id);
  };
  const handleModalCancel = (e) => {
    e.preventDefault();
    setOpenModal(false);
    setModalCurrentId('');
  };
  const handleRemoveCards = (e) => {
    e.preventDefault();
    axios
      .delete(`${SERVER_URL}/cards/${modalCurrentId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => getUserCards(token))
      .catch((error) => console.log('error', error));
    setOpenModal(false);
  };
  const handleRemoveFav = (e) => {
    e.preventDefault();
    axios
      .patch(`${SERVER_URL}/my/favorites`, JSON.stringify(modalCurrentId), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setUserFav((prevState) => prevState.filter(({ _id }) => _id !== modalCurrentId));
      })
      .catch((error) => console.log('error', error));
    setOpenModal(false);
  };
  const getFilteredData = (data, value) =>
    data.filter(({ status }) => {
      return status.toUpperCase() === value.toUpperCase();
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getUserCards = async (token) => {
    if (token) {
      axios
        .get(`${SERVER_URL}/my/cards`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => {
          setData(data);
          setUserCards(getFilteredData(data, sortBy));
        })
        .catch((error) => console.log('error', error));
    }
  };
  const getMyFavorites = async (token) => {
    if (token) {
      axios
        .get(`${SERVER_URL}/my/favorites`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => {
          console.log(data);
          data.favorites.forEach((id) => {
            axios.get(`${SERVER_URL}/cards/${id}`).then(({ data }) => {
              setUserFav((prev) =>
                !prev.some(({ _id }) => _id === data._id) ? [...prev, data] : [...prev]
              );
            });
          });
        })
        .catch((error) => console.log('error', error));
    }
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
      getUserCards(token).then(() => getMyFavorites(token));
    });
    // eslint-disable-next-line
  }, [getIdTokenClaims]);
  const handleProfilePage = (e) => {
    const value = e.target.getAttribute('data-id');
    setRenderPage(value);
  };
  const handleFilterValue = (e) => {
    if (e.target.tagName === 'LI') {
      const value = e.target.getAttribute('data-id');
      setSortBy(value);
      setUserCards(getFilteredData(data, value));
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
              {renderPage === 'user-cards'
                ? renderUserCards(
                    userCards,
                    sortBy,
                    handleFilterValue,
                    showModal,
                    openModal,
                    handleRemoveCards,
                    handleModalCancel
                  )
                : renderUserFav(userFav, showModal, openModal, handleRemoveFav, handleModalCancel)}
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

export default ProfilePage;
