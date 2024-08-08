import { Link } from "react-router-dom";
import { useStoreContext } from "../../../utils/GlobalState";
import { ADD_TO_CART } from "../../../utils/actions";
import { idbPromise } from "../../../utils/helpers";

function ServiceItem(item) {
  const [state, dispatch] = useStoreContext();

  const {
    name,
    _id,
    price
  } = item;

  const { cart } = state

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    if (itemInCart) {
      // If item is already in the cart, do nothing since it can only be purchased once
      console.log('Item already in cart');
    } else {
      // If item is not in the cart, add it with purchaseQuantity set to 1
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

  return (
    <div className="card px-1 py-1">
      <Link to={`/service/${_id}`}>
        <p>{name}</p>
      </Link>
      <div>
        <div>Purchase {name} service!</div>
        <span>${price}</span>
      </div>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}

export default ServiceItem;
