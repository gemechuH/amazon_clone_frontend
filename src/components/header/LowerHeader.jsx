import React from 'react'
import { IoMdMenu } from "react-icons/io";
import classes from './Header.module.css'

const LowerHeader = () => {
  return (
    <>
      <div className={classes.lower__container}>
        <ul>
          <li>
            <span>
              <IoMdMenu size={25} />
              <p>All</p>
            </span>
          </li>
          <li>Today's Deals</li>
          <li>Customer Service</li>
          <li>Registry</li>
          <li>Gift Card</li>
          <li>Sell</li>
        </ul>
        <div className={classes.my}>
          <small>developed by Gemechu hunduma</small>
        </div>
      </div>
    </>
  );
}

export default LowerHeader
