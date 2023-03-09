import './style.scss';
import { useEffect, useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import renderUserCards from './subpages/cardsPage';
import renderUserFav from './subpages/favoritePage';
import { Link } from 'react-router-dom';
import { useDeleteCard, useFavorite, useFavorites, useUserCards, useUserToken } from '../../rest';
import { generalRequestsVoid } from '../../rest/requestsServices';
import useUserInformation from '../../rest/useUserInformation';

function ProfilePage() {
  const [token] = useUserToken();

  const { userInfo } = useUserInformation();
  const { given_name: name, picture: profilePhoto, family_name: surname } = userInfo;
  const fullName = name + ' ' + surname;
  const { userCards, reFetchCards } = useUserCards(token);
  const { reRenderDelCard } = useDeleteCard();
  const [filteredUserCards, setFilteredUserCards] = useState([]);

  const { favorites } = useFavorites(token);
  const { reFetchFavorite } = useFavorite();
  const [userFavorites, setUserFavorites] = useState([]);

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
    reRenderDelCard(token, modalCurrentId)
      .then(() => reFetchCards(token))
      .catch((error) => console.log('error', error));
    setOpenModal(false);
  };

  const handleRemoveFav = (e) => {
    e.preventDefault();
    reFetchFavorite('PATCH', token, modalCurrentId)
      .then(() => {
        setUserFavorites((prevState) => prevState.filter(({ _id }) => _id !== modalCurrentId));
      })
      .catch((error) => console.log('error', error));
    setOpenModal(false);
  };
  const getFilteredData = (data, value) => {
    return data.filter(({ status }) => {
      return status.toUpperCase() === value.toUpperCase();
    });
  };
  const getUserFavorites = async () => {
    favorites.map(async (id) => {
      const { data } = await generalRequestsVoid('GET', `cards/${id}`, null, token, null);
      setUserFavorites((prev) =>
        !prev.some(({ _id }) => _id === data._id) ? [...prev, data] : [...prev]
      );
    });
  };

  useEffect(() => {
    getUserFavorites();

    setFilteredUserCards(getFilteredData(userCards, sortBy));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userCards, sortBy]);
  const handleProfilePage = (e) => {
    const value = e.target.getAttribute('data-id');
    setRenderPage(value);
  };
  const handleFilterValue = (e) => {
    if (e.target.tagName === 'LI') {
      const value = e.target.getAttribute('data-id');
      setSortBy(value);
      setFilteredUserCards(getFilteredData(userCards, value));
    }
  };

  return (
    <main className="Main">
      <div className="Main-container">
        <header className="container profile-header my-3">
          <div className="d-flex flex-column align-items-center text-center">
            <img src={profilePhoto} alt={fullName} className="rounded-circle" width="100" />
            <div className="d-flex align-items-center mt-3">
              <h4>{fullName}</h4>
              <Link to="./userInfo">
                <EditOutlined className="ms-1 edit-btn" />
              </Link>
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
                Ваші обрані
              </li>
            </ul>
            <section className="py-3 text-center container">
              {renderPage === 'user-cards'
                ? renderUserCards(
                    filteredUserCards,
                    sortBy,
                    handleFilterValue,
                    showModal,
                    openModal,
                    handleRemoveCards,
                    handleModalCancel
                  )
                : renderUserFav(
                    userFavorites,
                    showModal,
                    openModal,
                    handleModalCancel,
                    handleRemoveFav
                  )}
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

export default ProfilePage;
