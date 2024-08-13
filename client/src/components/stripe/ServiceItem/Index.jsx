function ServiceItem({ title, _id, price, link }) {

  const handlePurchase = () => {
    window.open(link, '_blank');
  };

  return (
    <div className="card px-1 py-1">
        <p>{title}</p>
      <div>
        <div>Purchase {title} service!</div>
        <span>${price}</span>
      </div>
      <button onClick={handlePurchase}>Book Service</button>
    </div>
  );
}

export default ServiceItem;
