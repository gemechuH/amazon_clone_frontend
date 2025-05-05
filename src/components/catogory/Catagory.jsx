import React from 'react'
import { catagoryData } from './catagoryData'
import CatagoryCard from './CatagoryCard'
import classes from './Catagory.module.css'

const Catagory = () => {
  return (
    <section className={classes.Catagory__container}>
          {
              catagoryData.map((dataInfo) => (
                  <CatagoryCard data={dataInfo} key={dataInfo.image}/>
              ))
      }
    </section>
  )
}

export default Catagory
