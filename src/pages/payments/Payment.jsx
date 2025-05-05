import React from "react";
import Layout from "../../components/layout/Layout";

import { ClipLoader } from "react-spinners";
import { db } from "../../utility/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { clearCart } from "../../redux/cartSlice";
import { useSelector, useDispatch } from "react-redux";

import classes from "./Payment.module.css";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { axiosBase_URL } from "../../components/api/axiosBase";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart?.cartItems);

  const totalQuantity = useSelector((state) => state.cart?.totalQuantity);
  const [prossing, setprossing] = useState(false);
  const user = useSelector((state) => state.auth?.user);

  const navigate = useNavigate();
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const [cardError, setCardError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (e) => {
    console.log(e);
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.uid) {
      setCardError("Please sign in to complete your purchase");
      navigate("/SignUp");
      console.error("User is not defined. Cannot store order.");
      return; // Stop execution if `user` is not available
    }
    // step 1 to connect with backend || functions
    setprossing(true);
    try {
      const response = await axiosBase_URL({
        method: "POST",
        url: `/payment/create?total=${totalPrice * 100}`,
       
      });
      console.log(response.data);
      const clientsecret = response.data?.clientSecret;

      //step 2 the confarmation of the payment
      const confirmation = await stripe.confirmCardPayment(clientsecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      console.log(confirmation);

      //       if (!user || !user.uid) {
      //   navigate("/SignUp")
      //   console.error("User is not defined. Cannot store order.");
      //   return; // Stop execution if `user` is not available
      // }

      const paymentIntent = confirmation.paymentIntent; // Get paymentIntent from confirmation

      const orderRef = doc(db, "users", user.uid, "orders", paymentIntent.id);
      await setDoc(orderRef, {
        cartItems: cartItems,
        amount: paymentIntent.amount / 100,
        created: paymentIntent.created,
        paymentStatus: paymentIntent.status,
        userEmail: user.email,
        orderDate: new Date().toISOString(),
      });

      dispatch(clearCart()); // Add this line to clear the cart

      setprossing(false);
      navigate("/orders", { state: { msg: "you are placed new orders" } });
    } catch (error) {
      // console.log(error);
      console.log("Error processing payment:", error);
      setprossing(false);
    }
  };

  return (
    <Layout>
      <>
        <div className={classes.payment_container}>
          <div className={classes.payment_header}>
            <h3>Payment Page</h3>
            <p>Total Items: {totalQuantity}</p>
            <p>Total Price: ${totalPrice}</p>
          </div>

          <div className={classes.payment_items}>
            {cartItems.map((item) => (
              <div key={item?.id} className={classes.payment_item}>
                <div>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={classes.payment_image}
                  />
                  <div>
                    {/* <h5>{item?.title}</h5> */}
                    <p>Quantity: {item?.quantity}</p>
                    <p>Price: ${item?.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <button className={classes.payment_button}>Proceed to Payment</button> */}

        <div className={classes.payment_stripe}>
          <h3>payment methods</h3>
          <div className={classes.payment_card_container}>
            <form action="" onSubmit={handleSubmit}>
              {cardError && <small style={{ color: "red" }}>{cardError}</small>}
              <CardElement className={classes.vise_card} />
              <div>
                <div>
                  <span>Total price | ${totalPrice}</span>
                </div>
                <button type="submit" onClick={handleChange}>
                  {prossing ? (
                    <div className={classes.loading}>
                      {" "}
                      <ClipLoader color="grey" size={10} />
                      <p> please wait...</p>
                    </div>
                  ) : (
                    "Pay Now"
                  )}{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default Payment;
