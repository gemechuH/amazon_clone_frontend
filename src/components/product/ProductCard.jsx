import React from "react";
import Rating from "@mui/material/rating";
import CurrencyFormat from "../currencyFormat/CurrencyFormat";
import classes from "./Product.module.css";
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from "../../redux/cartSlice";

const ProductCard = ({ product, flex, proDesc }) => {
  const { image, title, id, rating, price, description } = product;
  const dispatch = useDispatch()
   const handleAddToCart = () => {
     dispatch(addToCart(product));
   };
  return (
    <div
      className={`${classes.card__container} ${flex ? classes.flex_singleProduct : ""} `}
    >
      <Link to={`/productDetail/${id}`}>
        <img src={image} alt="" />
      </Link>
      <div className={classes.title}>
        <h2>{title}</h2>
        {proDesc && <h3>{description }</h3> }
        <div className={classes.rating}>
          {/* rating */}
          <Rating value={rating?.rate} precision={0.1} />
          {/* count  */}
          <small>{rating?.count}</small>
        </div>
        <div className={classes.price}>
          {/* price */}

          <CurrencyFormat amount={price} />
        </div>

        <button className={classes.button} onClick={handleAddToCart}>add to cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
