import React from 'react'
import Layout from '../../components/layout/Layout'
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart, increaseQuantity, decreaseQuantity } from "../../redux/cartSlice";
import classes from './Cart.module.css'
import { Link, useNavigate } from 'react-router-dom';
const Cart = () => {
  const navigator = useNavigate()
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
   const totalPrice = cartItems.reduce(
     (total, item) => total + item.price * item.quantity,
     0
   );
  const dispatch = useDispatch();

  const handleCheckout = () => {
    navigator("/payments" ,
    {
        state: {cartItems, totalPrice, totalQuantity}
      })
  }

  return (
    <>
      <Layout>
        <div className={classes.cart__container}>
          <div className={classes.cart__sub_container}>
            <h2>Your Shopping basket ({totalQuantity})</h2>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className={classes.cart__items}>
                  <img src={item.image} alt={item.name} />
                  <div className="">
                    <h4 className={classes.cart_item_title}>{item.title}</h4>
                    <h4 className={classes.item_price}>${item.price}</h4>
                  </div>
                  <p>{}</p>
                  <p>Quantity: {item.quantity}</p>
                  <div className={classes.quantityControl}>
                    <button onClick={() => dispatch(decreaseQuantity({ id: item.id }))}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => dispatch(increaseQuantity({ id: item.id }))}>
                      +
                    </button>
                  </div>

                  <button
                    className={classes.item_remove_btn}
                    onClick={() => dispatch(removeFromCart({ id: item.id }))}
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
            <button
              className={classes.item_clear_btn}
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </button>
          </div>

          {cartItems.length > 0 && (
            <div className={classes.item_process}>
              <p>subtotal ({totalQuantity} items)</p>
              <p>
                <strong>${totalPrice.toFixed(2)}</strong>
              </p>
              <span>
                <input type="checkbox" />
                <small>this orders contains a gifts</small>
              </span>
              <Link to="/payments">
                <button className={classes.item_checkout_btn} onClick={handleCheckout}>
                  continue to Checkout
                </button>
              </Link>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}

export default Cart
