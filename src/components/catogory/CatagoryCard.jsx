import React from "react";
import classes from "./Catagory.module.css";
import { Link } from "react-router-dom";

const CatagoryCard = ({ data }) => {
  // console.log(data)
  return (
    <div className={classes.catagory}>
      <Link to={`/category/${data.name}`}>
        <span>
          <h2>{data.name}</h2>
        </span>

        <img src={data.image} alt="" />
        <p>Shop now</p>
      </Link>
    </div>
  );
};

export default CatagoryCard;
