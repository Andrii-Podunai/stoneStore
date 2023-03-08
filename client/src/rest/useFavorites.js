import { useEffect, useState } from 'react';
import { generalRequestsVoid } from './requestsServices';

function useFavorites(token = false) {
  const [favorites, setFavorites] = useState([]);
  const [loadingFavorites, setLoadingFavorites] = useState(true);
  const [errorFavorites, setErrorFavorites] = useState(false);

  const reFetchFavorites = async (token) => {
    setLoadingFavorites(true);
    if (!token) {
      setErrorFavorites('token is not defined');
      setLoadingFavorites(false);
      return;
    }
    try {
      const { data } = await generalRequestsVoid('GET', 'my/favorites', null, token, null);
      if (!data || !data.favorites) {
        setErrorFavorites('favorites is not defined');
        setLoadingFavorites(false);
        return;
      }
      setFavorites(data.favorites);
      setLoadingFavorites(false);
    } catch (e) {
      console.log(e.message);
      setErrorFavorites(e);
      setLoadingFavorites(false);
    }
  };

  useEffect(() => {
    if (token) {
      reFetchFavorites(token);
    }
    // eslint-disable-next-line
  }, [token]);

  return { favorites, reFetchFavorites, loadingFavorites, errorFavorites };
}

export default useFavorites;
