import { useState, useEffect } from 'react';
import axios from 'axios';
import './style.scss';

function Admin() {
  const dayjs = require('dayjs');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setInterval(function repeatSend() {
      const fetchData = async () => {
        const result = await axios('http://localhost:8085/cards?page=1');
        setProducts(result.data);
      };
      fetchData();
    }, 4000);
  }, []);

  let approveToPublish = async (value) => {
    await axios
      .put(`http://localhost:8085/cards/${value._id}/status`, { value: 'Active' })
      .catch((error) => console.log(error));
  };

  let declineToPublish = async (value) => {
    await axios
      .put(`http://localhost:8085/cards/${value._id}/status`, { value: 'Rejected' })
      .catch((error) => console.log(error));
  };
  return (
    <div className="Admin">
      <table className="border-0.1rem-solid-#0000">
        <thead>
          <tr>
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
                <td className="Admin-text">{data.title}</td>
                <td>{data.phoneNumber}</td>
                <td>{data.status}</td>
                <td>{dayjs(parseInt(data.createdAt)).format('DD.MM.YYYY')}</td>
                <td>
                  <form>
                    <button
                      onClick={() => approveToPublish(data)}
                      type="button"
                      className="Admin-text-btn btn btn-outline-success">
                      Approve
                    </button>
                    <button
                      onClick={() => declineToPublish(data)}
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
