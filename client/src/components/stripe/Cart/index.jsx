import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
 

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_TEST_KEY);

const Cart = () => {

}