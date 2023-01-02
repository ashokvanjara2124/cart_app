import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { placeHolderImage } from '../images/index';
import { setProduct } from '../action/productaction';
import { AddCart } from '../action/productaction'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Pagination from './Pagination';
// import spinner from '../Loder/spinner.gif'
import doted from '../images/doted.gif'

const ProductComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(6);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  const navigate = useNavigate();
  const [hidden, setHidden] = useState(false)
  const products = useSelector((state) => state?.allproduct?.products
?.ShopData
);
  console.log("products is ", products);


  const dispatch = useDispatch()
  const imgeDetails = (slug) => {

    navigate(`/details/${slug}`)

  }

  const ashok = (product) => {

    if (!hidden[product.id]) {
      setHidden({
        ...hidden, [product.id]:
          !hidden[product.id]
      })
    }
    dispatch(AddCart(product))
  }

  useEffect(() => {
    dispatch(setProduct());

  }, [])
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = products && products.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(products && products.length / recordsPerPage)
  return (
    <div className='container'>
      {<div className='row'>
        {loading ? (
          <div className="loader-container">
            {/* <img src={spinner} alt="Loading"/> */}
            {/* <div className="lds-facebook"><div></div><div></div><div></div></div> */}
            <img src={doted} alt="Loading" />

          </div>

        ) :
          products && products.map((product) => {

            return (
              <div className='col-3' key={product.id}>
                <div className='product'>
                  <div className='product__img'>
                    <img
                      src={product.images.length > 0 ? product.images[0].src : placeHolderImage}
                      alt=""
                      onClick={() => imgeDetails(product.slug)}
                    />

                  </div>
                  <div className='product__name'>
                    {product.name}
                  </div>
                  <div className='row'>
                    <div className='col-6'>
                      <div className='product__price'>
                        <div dangerouslySetInnerHTML={{ __html: product.price_html }} className="__html"></div>

                      </div>
                    </div>
                    <div className='col-6'>
                      <div className='product__sale'>
                        {product.on_sale === true ? <div className='saletag'>sale</div> : null}
                      </div>
                    </div>
                    <div className='col-6'>
                      <div className='addtocart-btn'>
                        <button type="" className='btn-submit' onClick={() => ashok(product)}>add to cart</button>
                      </div>
                    </div>
                    <div className='col-6'>
                      <div className='view-cart'>
                        {
                          !!hidden[product.id] ? <button className='btn-view'> <Link className="nav" to='/cart'>
                            View Cart<i className="fa-solid fa-arrow-right  arrow"></i>
                          </Link></button> : ''
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>}
      {<Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />}
    </div>
  )
}

export default ProductComponent