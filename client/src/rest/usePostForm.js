import { useEffect, useState } from 'react';
import { generalRequestsVoid } from './requestsServices';

function usePostForm(token = null, value = null) {
  const [successPostForm, setSuccessPostForm] = useState(false);
  const [loadingPostForm, setLoadingPostForm] = useState(true);
  const [errorPostForm, setErrorPostForm] = useState(false);

  const reRenderPostForm = async (token, value) => {
    setLoadingPostForm(true);
    try {
      const response = await generalRequestsVoid('POST', 'cards', null, token, value);
      if (response.status !== 201) {
        new Error(`response code: ${response.status}`);
      }
      setSuccessPostForm(true);
      setLoadingPostForm(false);
    } catch (e) {
      console.log(e.message);
      setErrorPostForm(e);
      setLoadingPostForm(false);
    }
  };

  useEffect(() => {
    if (token !== null && value !== null) {
      reRenderPostForm(token, value);
    }
  }, [token, value]);

  return { successPostForm, reRenderPostForm, loadingPostForm, errorPostForm };
}

export default usePostForm;
