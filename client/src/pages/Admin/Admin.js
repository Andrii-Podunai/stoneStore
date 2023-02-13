import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import './style.scss';
import { SERVER_URL } from 'variables';
import { Link } from 'react-router-dom';

function Admin() {
  const dayjs = require('dayjs');
  const { getIdTokenClaims } = useAuth0();
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(false);

  useEffect(() => {
    getIdTokenClaims()
      .then((response) => setToken(response.__raw))
      .catch((err) => {
        console.log(err.message);
      });
  }, [getIdTokenClaims]);

  useEffect(() => {
    if (!token) {
      return;
    }
    const fetchData = async () => {
      const result = await axios(`${SERVER_URL}/cards/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(result.data);
    };
    fetchData();
    setInterval(() => {
      fetchData();
    }, 20000);
  }, [token]);

  const handleStatus = async (data, status) => {
    await axios
      .put(
        `${SERVER_URL}/cards/${data._id}/status`,
        { value: status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        deleteLocal(data._id);
      })
      .catch((error) => console.log(error));
  };

  const deleteLocal = (id) => {
    setProducts((prevState) => prevState.filter(({ _id }) => _id !== id));
  };

  return (
    <div className="Admin">
      <table className="border-0.1rem-solid-#0000">
        <thead>
          <tr>
            <th>Preview</th>
            <th>Title</th>
            <th>Phone Number</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Decision</th>
          </tr>
        </thead>
        <tbody>
          {products
            .filter((data) => data.status === 'Pending')
            .map((data) => (
              <tr key={data._id}>
                <td>
                  <Link to={'/products/' + data._id}>Show more</Link>
                </td>
                <td className="Admin-text">{data.title}</td>
                <td>{data.phoneNumber}</td>
                <td>{data.status}</td>
                <td>{dayjs(parseInt(data.createdAt)).format('DD.MM.YYYY')}</td>
                <td>
                  <form>
                    <button
                      onClick={() => handleStatus(data, 'Active')}
                      type="button"
                      className="Admin-text-btn btn btn-outline-success">
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatus(data, 'Rejected')}
                      type="button"
                      className="btn btn-outline-success">
                      Decline
                    </button>
                  </form>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export default Admin;
