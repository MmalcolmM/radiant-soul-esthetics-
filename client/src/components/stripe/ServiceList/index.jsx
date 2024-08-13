// import { useEffect } from 'react';
// import ServiceItem from '../ServiceItem/Index';
// import { useStoreContext } from '../../../utils/GlobalState';
// import { UPDATE_SERVICES } from '../../../utils/actions';
// import { useQuery } from '@apollo/client';
// import { QUERYALLSERVICES } from '../../../utils/queries';
// import { idbPromise } from '../../../utils/helpers';

// function ServiceList() {
//   const [state, dispatch] = useStoreContext();
//   const { services } = state;

//   const { loading, data, error } = useQuery(QUERYALLSERVICES);

//   useEffect(() => {
//     if (data) {
//       console.log('Data from query:', data);
//       dispatch({
//         type: UPDATE_SERVICES,
//         services: data.getServices,
//       });
//       data.getServices.forEach((service) => {
//         idbPromise('services', 'put', service);
//       });
//     } else if (!loading) {
//       idbPromise('services', 'get').then((services) => {
//         console.log('Data from IndexedDB:', services);
//         if (services.length > 0) {
//           dispatch({
//             type: UPDATE_SERVICES,
//             services: services,
//           });
//         }
//       });
//     }
//   }, [data, loading, dispatch]);

//   console.log(data);
  

//   return (
//     <div className="my-2">
//       <h2>Our Services:</h2>
//       {services.length ? (
//         <div className="flex-row">
//           {services.map((service) => (
//             <ServiceItem
//               key={service._id}
//               _id={service._id}
//               name={service.name}
//               price={service.price}
//             />
//           ))}
//         </div>
//       ) : (
//         <h3>You haven't added any services yet!</h3>
//       )}
//     </div>
//   );
// }

// export default ServiceList;

import React from 'react';
import { Link } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../../utils/queries';

const stripePromise = loadStripe('pk_test_51PkEy5JQqDoxp8ufkpimkAai9or3YeGPZJMXFLsvRgtPjvbavPCKu7gAo1ENOOoKDSj4z3oo6tGnnthEIshxt6gX00zNLviU98');

function ServiceList() {
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  const services = [
    { _id: "1", title: "Radiant Soul Facial", price: 100.00 },
    { _id: "2", title: "Deep Cleansing Bacial", price: 140.00 },
    { _id: "3", title: "Teen Acne Facial", price: 80.00 },
    { _id: "4", title: "Anti-Aging Facial", price: 115.00 },
    { _id: "5", title: "Lash Lift and Tint", price: 80.00 }
  ];

  React.useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  const handleBuyNow = (serviceId) => {
    console.log('Service ID:', serviceId);
    getCheckout({
      variables: { services: [serviceId] },
    });
  };

  return (
    <div className="my-2">
      <h2>Our Services:</h2>
      <div className="flex-row">
        {services.map((service) => (
          <div key={service._id} className="card px-1 py-1">
            <Link to={`/service/${service._id}`}>
              <p>{service.title}</p>
            </Link>
            <div>
              <div>Purchase {service.title} service!</div>
              <span>${service.price}</span>
            </div>
            <button onClick={() => handleBuyNow(service._id)}>Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServiceList;
