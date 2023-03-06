import { useEffect, useState } from 'react';
import { generalRequestsVoid } from './requestsServices';

function useFavorite(method, token = null, id = null) {
  const [favorite, setFavorite] = useState(false);
  const [loadingFavorite, setLoadingFavorite] = useState(true);
  const [errorFavorite, setErrorFavorite] = useState(false);

  const reFetchFavorite = async (method, token, id) => {
    setFavorite(false);
    setLoadingFavorite(true);
    if (!token) {
      setErrorFavorite('token is not defined');
      setLoadingFavorite(false);
      return;
    }
    try {
      const response = await generalRequestsVoid(method, 'my/favorites', null, token, id);
      if (response !== 200) {
        setErrorFavorite('favorites is not defined');
        setLoadingFavorite(false);
        return;
      }
      setFavorite(true);
      setLoadingFavorite(false);
    } catch (e) {
      console.log(e.message);
      setErrorFavorite(e);
      setLoadingFavorite(false);
    }
  };

  useEffect(() => {
    if (token && id) {
      reFetchFavorite(token, id);
    }
    // eslint-disable-next-line
    }, [token ,id]);

  return { favorite, reFetchFavorite, loadingFavorite, errorFavorite };
}

export default useFavorite;
