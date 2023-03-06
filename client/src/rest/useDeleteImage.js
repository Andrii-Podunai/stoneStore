import { useEffect, useState } from 'react';
import { generalRequestsVoid } from './requestsServices';

function useDeleteImage(keys = null) {
  const [successDelImage, setSuccessDelImage] = useState(false);
  const [loadingDelImage, setLoadingDelImage] = useState(true);
  const [errorDelImage, setErrorDelImage] = useState(false);

  const reRenderDelImage = async (keys) => {
    setSuccessDelImage(false);
    setLoadingDelImage(true);
    try {
      const response = await generalRequestsVoid('DELETE', 'upload', null, null, keys);
      if (response.status !== 200) {
        new Error(`response code: ${response.status}`);
      }
      setSuccessDelImage(true);
      setLoadingDelImage(false);
    } catch (e) {
      console.log(e.message);
      setErrorDelImage(e);
      setLoadingDelImage(false);
    }
  };

  useEffect(() => {
    if (keys !== null) {
      reRenderDelImage(keys);
    }
  }, [keys]);

  return { successDelImage, reRenderDelImage, loadingDelImage, errorDelImage };
}

export default useDeleteImage;
