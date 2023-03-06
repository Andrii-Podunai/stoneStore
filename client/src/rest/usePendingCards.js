import { useEffect, useState } from 'react';
import { generalRequestsVoid } from './requestsServices';

function usePendingCards(token = null) {
  const [pendingCards, setPendingCards] = useState([]);
  const [loadingPendingCards, setLoadingPendingCards] = useState(true);
  const [errorPendingCards, setErrorPendingCards] = useState(false);

  const reFetchPendingCards = async (token) => {
    setLoadingPendingCards(true);
    try {
      const { data } = await generalRequestsVoid('GET', 'cards/admin', null, token, null);
      setPendingCards(data);
      setLoadingPendingCards(false);
    } catch (e) {
      console.log(e.message);
      setErrorPendingCards(e);
      setLoadingPendingCards(false);
    }
  };

  useEffect(() => {
    if (token) {
      reFetchPendingCards(token);
    }
    // eslint-disable-next-line
    }, [token]);

  return { pendingCards, reFetchPendingCards, loadingPendingCards, errorPendingCards };
}

export default usePendingCards;
