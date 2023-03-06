import { useEffect, useState } from 'react';
import { generalRequestsVoid } from './requestsServices';

function usePutPendingCards(token = null, id = null, value = null) {
  const [successPutPendingCards, setSuccessPutPendingCards] = useState(false);
  const [loadingPutPendingCards, setLoadingPutPendingCards] = useState(true);
  const [errorPutPendingCards, setErrorPutPendingCards] = useState(false);

  const reFetchPutPendingCards = async (token, id, value) => {
    setSuccessPutPendingCards(false);
    setLoadingPutPendingCards(true);
    try {
      const status = { status: value };
      await generalRequestsVoid('PUT', `cards/${id}/status`, null, token, status);
      setSuccessPutPendingCards(true);
      setLoadingPutPendingCards(false);
      return true;
    } catch (e) {
      console.log(e.message);
      setErrorPutPendingCards(e);
      setLoadingPutPendingCards(false);
    }
  };

  useEffect(() => {
    if (token && id && value) {
      reFetchPutPendingCards(token, id, value);
    }
    // eslint-disable-next-line
    }, [token,id,value]);

  return {
    successPutPendingCards,
    reFetchPutPendingCards,
    loadingPutPendingCards,
    errorPutPendingCards,
  };
}

export default usePutPendingCards;
