import { useEffect, useState } from 'react';
import { generalRequestsVoid } from './requestsServices';
import { useParams } from 'react-router-dom';

function usePutForm(token = null, value = null) {
  const [successPutForm, setSuccessPutForm] = useState(false);
  const [loadingPutForm, setLoadingPutForm] = useState(true);
  const [errorPutForm, setErrorPutForm] = useState(false);
  const { id } = useParams();

  const reRenderPutForm = async (token, value) => {
    setLoadingPutForm(true);
    try {
      const response = await generalRequestsVoid('PUT', `cards/${id}`, null, token, value);
      if (response.status !== 200) {
        new Error(`response code: ${response.status}`);
      }
      setSuccessPutForm(true);
      setLoadingPutForm(false);
    } catch (e) {
      console.log(e.message);
      setErrorPutForm(e);
      setLoadingPutForm(false);
    }
  };

  useEffect(() => {
    if (token !== null && value !== null) {
      reRenderPutForm(token, value);
    }
    // eslint-disable-next-line
  }, [token, value]);

  return { successPutForm, reRenderPutForm, loadingPutForm, errorPutForm };
}

export default usePutForm;
