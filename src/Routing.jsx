import React from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Landing from "./pages/LandingPage/Landing";
import SignUp from "./pages/auth/SignUp";
import Orders from "./pages/orders/Orders";
import Cart from "./pages/cart/Cart";
import ProductDetail from "./pages/productDetail/ProductDetail";
import Result from './pages/results/Result'
import Payment from "./pages/payments/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";


const stripePromise = loadStripe(
  "pk_test_51Qw6MF1lBDaqcNze4uVQzEiHNx8rjrztiBX8jMt4XbGJiXA6Ee2VCLS1g5Vbt9D3YirQz6wJeSTPpiH9wBUTQVvs00Efg6iLQU"
);


const Routing = () => {
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/orders" element={ <ProtectedRoute
                msg="Please login to access your orders"
                redirectTo="/SignUp"
              >   <Orders /> </ProtectedRoute> } />
          {/* <Route
            path="/payments"
            element={
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            }
          /> */}
          <Route
            path="/payments"
            element={
              <ProtectedRoute
                msg="Please login to proceed with payment"
                redirectTo="/SignUp"
              >
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
              </ProtectedRoute>
            }
          />
          <Route path="category/:name" element={<Result />} />
          <Route path="/productDetail/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Routing;
