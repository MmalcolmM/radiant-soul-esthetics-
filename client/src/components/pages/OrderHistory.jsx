import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import './pages.css';

function OrderHistory() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data && data.user) {
    user = data.user;
    console.log(user);
  }

  return (
    <>
      <div className="historyContainer my-1">
        <Link to="/services">← Back to Services</Link>

        <h2>
          {user ? `Order History for ${user.name}` : ''}
        </h2>

        {user && user.orders ? (
          <>
            {user.orders.map((order) => (
              <div key={order._id} className="my-2">
                <h3>
                  {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                </h3>
              </div>
            ))}
          </>
        ) : (
          <p>No order history available.</p>
        )}
      </div>
    </>
  );
}

export default OrderHistory;
