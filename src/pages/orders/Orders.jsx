import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { useSelector } from "react-redux";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../utility/firebase";
import { ClipLoader } from "react-spinners";
import classes from "./Orders.module.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth?.user);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user?.uid) {
        try {
          const ordersRef = collection(db, "users", user.uid, "orders");
          const q = query(ordersRef, orderBy("created", "desc"));
          const querySnapshot = await getDocs(q);

          const ordersData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setOrders(ordersData);
        } catch (error) {
          console.error("Error fetching orders:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) {
    return (
      <Layout>
        <div className={classes.loading}>
          <ClipLoader color="#FF9900" size={50} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={classes.orders}>
        <h1>Your Orders</h1>
        {orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className={classes.order}>
              <div className={classes.order_header}>
                <div>
                  <p>Order Placed</p>
                  <p>{new Date(order.orderDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p>Total</p>
                  <p>${order.amount}</p>
                </div>
                <div>
                  <p>Order ID</p>
                  <p>{order.id}</p>
                </div>
              </div>

              <div className={classes.order_items}>
                {order.cartItems.map((item) => (
                  <div key={item.id} className={classes.order_item}>
                    <img src={item.image} alt={item.title} />
                    <div>
                      <h4>{item.title}</h4>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
};

export default Orders;
