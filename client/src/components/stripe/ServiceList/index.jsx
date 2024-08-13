import { useEffect } from 'react';
import ServiceItem from '../ServiceItem/Index';
import { useStoreContext } from '../../../utils/GlobalState';
import { UPDATE_SERVICES } from '../../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERYALLSERVICES } from '../../../utils/queries';
import { idbPromise } from '../../../utils/helpers';

function ServiceList() {
  const [state, dispatch] = useStoreContext();
  const { services } = state;

  const { loading, data, error } = useQuery(QUERYALLSERVICES);

  useEffect(() => {
    if (data) {
      console.log('Data from query:', data);
      dispatch({
        type: UPDATE_SERVICES,
        services: data.getServices,
      });
      data.getServices.forEach((service) => {
        idbPromise('services', 'put', service);
      });
    } else if (!loading) {
      idbPromise('services', 'get').then((services) => {
        console.log('Data from IndexedDB:', services);
        if (services.length > 0) {
          dispatch({
            type: UPDATE_SERVICES,
            services: services,
          });
        }
      });
    }
  }, [data, loading, dispatch]);

  console.log(data);
  

  return (
    <div className="my-2">
      {services.length ? (
        <div className="flex-row">
          {services.map((service) => (
            <ServiceItem
              key={service._id}
              _id={service._id}
              title={service.title}
              price={service.price}
              link={service.link}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any services yet!</h3>
      )}
    </div>
  );
}

export default ServiceList;
