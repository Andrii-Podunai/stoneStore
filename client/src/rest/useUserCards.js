import { useEffect, useState } from 'react';
import { generalRequestsVoid } from './requestsServices';
import { useUserToken } from './index';

function useUserCards() {
  const [token] = useUserToken();

  const [userCards, setUserCards] = useState([]);
  const [loadingCards, setLoadingCards] = useState(true);
  const [errorCards, setErrorCards] = useState(false);

  const reFetchCards = async (token) => {
    setLoadingCards(true);
    try {
      const { data } = await generalRequestsVoid('GET', 'my/cards', null, token, null);
      setUserCards(data);
      setLoadingCards(false);
    } catch (e) {
      console.log(e.message);
      setErrorCards(e);
      setLoadingCards(false);
    }
  };
  useEffect(() => {
    reFetchCards(token);
  }, [token]);

  return { userCards, reFetchCards, loadingCards, errorCards };
}

export default useUserCards;
