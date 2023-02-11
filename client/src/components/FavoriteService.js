import Star from './Star';
import axios from 'axios';
import { SERVER_URL } from '../variables';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import ModalComponent from './Modal';

function FavoriteService({ fill, token, id }) {
  const [openModal, setOpenModal] = useState(false);
  const { loginWithRedirect } = useAuth0();
  const [currentFill, setCurrentFill] = useState(fill);

  useEffect(() => {
    setCurrentFill(fill);
  }, [fill]);

  const handleCancel = (e) => {
    e.preventDefault();
    setOpenModal(false);
  };

  const handleOk = (e) => {
    e.preventDefault();
    axios
      .patch(`${SERVER_URL}/my/favorites`, JSON.stringify(id), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setCurrentFill(false);
      })
      .catch((error) => console.log('error', error));
    setOpenModal(false);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!token) {
      loginWithRedirect();
      return;
    }
    if (currentFill === false) {
      axios
        .post(`${SERVER_URL}/my/favorites`, JSON.stringify(id), {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          setCurrentFill(true);
        })
        .catch((error) => console.log('error', error));
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
