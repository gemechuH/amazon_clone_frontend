import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { productURL } from '../../components/api/endPoint'
import { useState } from 'react'
import Layout from '../../components/layout/Layout'
import ProductCard from '../../components/product/ProductCard'
import classes from './Result.module.css'
import Loading from '../../components/loading/Loading'

const Result = () => {
  const { name } = useParams()
  // console.log(name);
  const [results, setResults] = useState([])
  const [isLoading, setisLoading] = useState(false)
  useEffect(() => {
    setisLoading(true)
     axios
       .get(`${productURL}/products/category/${name}`)
       .then((res) => {
         console.log(res);
         setResults(res.data)
         setisLoading(false)
          //  setResults(Array.isArray(res.data) ? res.data : []);
        //  console.log("API Response:", res.data);
       })
       .catch((err) => {
         console.log(err);
         setisLoading(false)
       });
  },[name])
  
 

  return (
    <>
      <Layout>
        <section>
          {isLoading ? (
            <Loading />
          ) : (
            <div>
              <h1 style={{ padding: "30px" }}> Results</h1>
              <p style={{ padding: "30px" }}>Catagory/{name}</p>
              <hr />
              <div className={classes.products_container}>
                {results.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </section>
      </Layout>
    </>
  );
}

export default Result
