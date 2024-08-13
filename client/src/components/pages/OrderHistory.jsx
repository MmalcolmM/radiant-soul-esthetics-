import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';

function OrderHistory() {
  let user;

  try {
    const { loading, error, data } = useQuery(QUERY_USER);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      console.error("Query error:", error);
      return <div>Error: {error.message}</div>;
    }

    if (data) {
      console.log("Fetched user data:", data); 
      user = data.user;
    }

    return (
      <div className="container">
        <Link to="/services">← Back to Services</Link>
        {user ? (
          <>
            <h2>Order History for {user.name}</h2>
            {user.orders.map((order) => (
              <div key={order._id} className="my-2">
                <h3>{new Date(parseInt(order.purchaseDate)).toLocaleDateString()}</h3>
                <div className="flex-row">
                  {order.services.map(({ _id, title, price }, index) => (
                    <div key={index} className="card">
                      <Link to={`/services/${_id}`}>
                        <p>{title}</p>
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
  } catch (err) {
    console.error("Unexpected error:", err);
    return <div>An unexpected error occurred: {err.message}</div>;
  }
}

export default OrderHistory;
