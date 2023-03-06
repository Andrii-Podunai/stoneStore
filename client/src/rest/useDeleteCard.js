import { useEffect, useState } from 'react';
import { generalRequestsVoid } from './requestsServices';

function useDeleteCard(token = null, id = null) {
  const [successDelCard, setSuccessDelCard] = useState(false);
  const [loadingDelCard, setLoadingDelCard] = useState(true);
  const [errorDelCard, setErrorDelCard] = useState(false);

  const reRenderDelCard = async (token, id) => {
    setLoadingDelCard(true);
    try {
      const response = await generalRequestsVoid('DELETE', `cards/${id}`, null, token, null);
      if (response.status !== 200) {
        new Error(`response code: ${response.status}`);
      }
      setSuccessDelCard(true);
      setLoadingDelCard(false);
    } catch (e) {
      console.log(e.message);
      setErrorDelCard(e);
      setLoadingDelCard(false);
    }
  };

  useEffect(() => {
    if (token && id) {
      reRenderDelCard(token, id);
    }
  }, [token, id]);

  return { successDelCard, reRenderDelCard, loadingDelCard, errorDelCard };
}

export default useDeleteCard;
