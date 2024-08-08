import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';

function OrderHistory() {
  const { loading, error, data } = useQuery(QUERY_USER);
  let user;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (data) {
    user = data.user;
  }

  return (
    <div className="container">
      <Link to="/">← Back to Products</Link>
      {user ? (
        <>
          <h2>Order History for {user.name}</h2>
          {user.orders.map((order) => (
            <div key={order._id} className="my-2">
              <h3>{new Date(parseInt(order.purchaseDate)).toLocaleDateString()}</h3>
              <div className="flex-row">
                {order.services.map(({ _id, name, price }, index) => (
                  <div key={index} className="card">
                    <Link to={`/services/${_id}`}>
                      <p>{name}</p>
                    </Link>
                    <div>
                      <span>${price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      ) : (
        <div>No order history found</div>
      )}
    </div>
  );
}

export default OrderHistory;