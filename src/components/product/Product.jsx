import React, { useEffect, useState } from "react";

import ProductCard from "./ProductCard";
import axios from "axios";
import classes from "./Product.module.css";
import Loading from "../loading/Loading";


const Product = () => {
  const [products, setproducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setIsLoading(true)
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setproducts(res.data);
        
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false)
      });
  }, []);
 return (
   <section className={classes.products_container}>
     {isLoading ? (
       <Loading />
     ) : (
       products.map((singleproduct) => (
         <ProductCard product={singleproduct} key={singleproduct.id} />
       ))
     )}
   </section>
 );

};

export default Product;
