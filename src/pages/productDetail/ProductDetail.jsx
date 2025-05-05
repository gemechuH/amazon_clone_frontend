import React, {useEffect, useState} from 'react'
import Layout from '../../components/layout/Layout'
import ProductCard from '../../components/product/ProductCard';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { productURL } from '../../components/api/endPoint';
import Loading from '../../components/loading/Loading';



const ProductDetail = () => {

  const { productId } = useParams({})
  
  const [singleProduct, setSingleProduct] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    axios
      .get(`${productURL}/products/${productId}`)
      .then((res) => {
        setSingleProduct(res.data);
        setIsLoading(false)

      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false)
      });
  }, [])
  
  return (
    <>
      {" "}
      <Layout>
        {isLoading ? (<Loading /> ): (
          <ProductCard
            product={singleProduct}
            flex={true}
            proDesc={true} />)} 
      </Layout>
    </>
  );
}

export default ProductDetail
