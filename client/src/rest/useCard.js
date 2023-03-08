import { useEffect, useState } from 'react';
import { generalRequestsVoid } from './requestsServices';

function useCard(id) {
  const [card, setCard] = useState(false);
  const [loadingCard, setLoadingCard] = useState(true);
  const [errorCard, setErrorCard] = useState(false);
  const reRenderCard = async (id) => {
    setLoadingCard(true);
    try {
      const { data } = await generalRequestsVoid('GET', `cards/${id}`, null, null, null);
      setCard(data);
      setLoadingCard(false);
    } catch (e) {
      console.log(e.message);
      setErrorCard(e);
      setLoadingCard(false);
    }
  };

  useEffect(() => {
    if (id) {
      reRenderCard(id);
    }
  }, [id]);

  return { card, reRenderCard, loadingCard, errorCard };
}

export default useCard;
