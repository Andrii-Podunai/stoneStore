import { useEffect, useState } from 'react';
import { generalRequestsVoid } from './requestsServices';
import { useUserToken } from './index';

function useUserInformation() {
  const [token] = useUserToken();
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const reFetchUserInfo = async (method, token, value = null) => {
    setLoading(true);
    try {
      const { data } = await generalRequestsVoid(method, 'my/information', null, token, value);
      setUserInfo(data.information);
      setLoading(false);
    } catch (e) {
      console.log(e.message);
      setError(e);
      setLoading(false);
    }
  };
  useEffect(() => {
    reFetchUserInfo('GET', token);
  }, [token]);

  return { userInfo, reFetchUserInfo, loading, error };
}

export default useUserInformation;
