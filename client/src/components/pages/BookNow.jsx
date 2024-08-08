import Cart from "../stripe/Cart";
import ServiceList from "../stripe/ServiceList";


import "./pages.css";

function BookNow() {
  return (
    <div className="container">
    <ServiceList />
    <Cart />
    </div>
  )
}

export default BookNow;