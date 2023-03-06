import Star from './Star';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import ModalComponent from './Modal';
import { useFavorite } from 'rest';

function FavoriteService({ fill, token, id }) {
  const [openModal, setOpenModal] = useState(false);
  const { loginWithRedirect } = useAuth0();
  const [currentFill, setCurrentFill] = useState(fill);
  const { reFetchFavorite } = useFavorite();

  useEffect(() => {
    setCurrentFill(fill);
  }, [fill]);

  const handleCancel = (e) => {
    e.preventDefault();
    setOpenModal(false);
  };

  const handleOk = (e) => {
    e.preventDefault();
    reFetchFavorite('PATCH', token, id).then(() => {
      setCurrentFill(false);
    });
    setOpenModal(false);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!token) {
      loginWithRedirect();
      return;
    }
    if (currentFill === false) {
      reFetchFavorite('POST', token, id).then(() => {
        setCurrentFill(true);
      });
    } else {
      setOpenModal(true);
    }
  };
  return (
    <>
      <Star fill={currentFill} onClick={handleClick} />
      <ModalComponent
        handleOk={handleOk}
        title="Ви справді хочете прибрати з обраних?"
        open={openModal}
        handleCancel={handleCancel}
      />
    </>
  );
}

export default FavoriteService;
