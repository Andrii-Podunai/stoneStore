import { useEffect, useState } from 'react';
import { generalRequestsVoid } from './requestsServices';

function useCards(page, amount, category = null, type = null, search = null) {
  const [cards, setCards] = useState([]);
  const [loadingCards, setLoadingCards] = useState(true);
  const [errorCards, setErrorCards] = useState(false);

  const reFetchCards = async (page, amount, category, type, search) => {
    setLoadingCards(true);
    try {
      const query = {
        page: page,
        amount: amount,
        category: category,
        type: type,
        search: search,
      };
      const { data } = await generalRequestsVoid('GET', 'cards', query, null, null);
      setCards(data);
      setLoadingCards(false);
    } catch (e) {
      console.log(e.message);
      setErrorCards(e);
      setLoadingCards(false);
    }
  };

  useEffect(() => {
    if (page && amount) {
      reFetchCards(page, amount, category, type, search);
    }
    // eslint-disable-next-line
    }, [page, amount, category, type, search]);

  return { cards, reFetchCards, loadingCards, errorCards };
}

export default useCards;
