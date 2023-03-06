import { useEffect } from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
import { usePendingCards, usePutPendingCards, useUserToken } from 'rest';

function Admin() {
  const dayjs = require('dayjs');
  const [token] = useUserToken();
  const { pendingCards, reFetchPendingCards } = usePendingCards(token);
  const { reFetchPutPendingCards } = usePutPendingCards();

  useEffect(() => {
    if (token) {
      setInterval(() => {
        reFetchPendingCards(token);
      }, 10000);
    }
    // eslint-disable-next-line
  }, []);

  const handleStatus = (data, status) => {
    reFetchPutPendingCards(token, data._id, status).then((bool) => {
      if (bool === true) {
        reFetchPendingCards(token);
      }
    });
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
          {pendingCards
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
