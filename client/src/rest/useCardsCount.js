import { useEffect, useState } from 'react';
import { generalRequestsVoid } from './requestsServices';

function useCardsCount(category = null, type = null, search = null) {
  const [cardsCount, setCardsCount] = useState(24);
  const [loadingCardsCount, setLoadingCardsCount] = useState(true);
  const [errorCardsCount, setErrorCardsCount] = useState(false);

  const reFetchCardsCount = async (category = null, type = null, search = null) => {
    setLoadingCardsCount(true);
    try {
      const query = {
        category: category,
        type: type,
        search: search,
      };
      const { data } = await generalRequestsVoid('GET', 'cards/count', query, null, null);
      setCardsCount(data);
      setLoadingCardsCount(false);
    } catch (e) {
      console.log(e.message);
      setErrorCardsCount(e);
      setLoadingCardsCount(false);
    }
  };

  useEffect(() => {
    reFetchCardsCount(category, type, search);
    // eslint-disable-next-line
    }, [category, type, search]);

  return { cardsCount, reFetchCardsCount, loadingCardsCount, errorCardsCount };
}

export default useCardsCount;
