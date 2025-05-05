
import React from 'react'
import Layout from '../../components/layout/Layout'
import CarouselEffect from '../../components/carousel/CarouselEffect'
import Catagory from '../../components/catogory/Catagory'
import Product from '../../components/product/Product'

const Landing = () => {
  return (
    <div>
      <Layout>
        <CarouselEffect />
        <Catagory/>
        <Product/>
      </Layout>

    </div>
  )
}

export default Landing
