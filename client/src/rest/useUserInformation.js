import { useEffect, useState } from 'react';
import { generalRequestsVoid } from './requestsServices';
import { useUserToken } from './index';
import { useAuth0 } from '@auth0/auth0-react';

function useUserInformation() {
  const [token] = useUserToken();
  const { user } = useAuth0();
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const reFetchUserInfo = async (method, token, value = null) => {
    if (token) {
      setLoading(true);
      try {
        const { data } = await generalRequestsVoid(method, 'my/information', null, token, value);
        if (data.information) {
          const userData = Array.isArray(data.information) ? data.information[0] : data.information;

          setUserInfo({
            given_name: userData.given_name,
            family_name: userData.family_name,
            phoneNumber: userData.phoneNumber,
            picture: user.picture,
          });
        } else {
          new Error('Fetch Auth0 data');
        }

        setLoading(false);
      } catch (e) {
        setUserInfo({
          given_name: user.given_name,
          family_name: user.family_name,
          phoneNumber: '',
          picture: user.picture,
        });
        console.log(e.message);
        setError(e);
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    reFetchUserInfo('GET', token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return { userInfo, reFetchUserInfo, loading, error };
}

export default useUserInformation;
