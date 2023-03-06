import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

function useUserToken() {
  const { getIdTokenClaims } = useAuth0();
  const [token, setToken] = useState(false);
  const [errorToken, setErrorToken] = useState(false);

  const reFetchToken = () => {
    getIdTokenClaims()
      .then((response) => {
        if (response && response.__raw) {
          setToken(response.__raw);
        }
      })
      .catch((e) => {
        setErrorToken(e);
        console.log(e.message);
      });
  };

  useEffect(() => {
    reFetchToken();
    // eslint-disable-next-line
  }, []);

  return [token, reFetchToken, errorToken];
}

export default useUserToken;
