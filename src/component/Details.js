import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AddCart } from '../action/productaction'
import ImageGallery from "react-image-gallery";
import { useDispatch } from 'react-redux';
const Details = () => {
  const [image, setImage] = useState(null)
  const [input, setinput] = useState(1)
  const [data, setData] = useState([])
  const { slug } = useParams();
  // console.log(slug);
const dispatch = useDispatch()

  async function fetchDetails() {
    axios.get(`https://php74dev.com/wordpress/wp-json/wc/v3/products/?slug=${slug}`).then((response) => {
      setData(response.data);

    });
  }

  useEffect(() => {
    fetchDetails()
  }, [slug])

 

  return (
    <div className='param__Details'>
      {
        data.map((product) => {
          console.log("slug us  ", product)

          return (
            <div className='container ashok mt-100' key={product.id}>
              <div className='row'>
                <div className='col-6'>
                  <div className='details__image'>
                    {/* <img src={product.images.length > 0 ? product.images[0].src : ""} alt="" />
                    <ImageGallery items={product.images.src} /> */}
                    {image ? (
                      <ImageGallery
                        showFullscreenButton={false}
                        showPlayButton={false}
                        items={image}
                      />
                    ) : (
                      <img src={product.images.length > 0 ? product.images[0].src : ""} alt="" />
                    )}
                  </div>
                </div>
                <div className='col-6'>
                  <div className='details__name'>
                    {product.name}
                  </div>
                </div>
                <div className='col-6'>
                  <div className='details__price'>
                    <div dangerouslySetInnerHTML={{ __html: product.price_html }} className=""></div>
                  </div>
                </div>
                <div className='col-6'>
                  <div className='details__sale'>
                    {product.on_sale === true ? <div className='sale__tag1'>sale!</div> : null}
                  </div>
                </div>
                <div className='col-6'>
                  <div className='details__input'>
                    <input
                      type="number"
                      min={1}
                      className="inputBox mt-4"
                      style={{ textAlign: "center" }}
                      value={input}
                      onChange={(e) => setinput(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div className='col-6'>
                  <div className='details__btn'>
                    <button type="button" className='btn-add'  onClick={() => dispatch(AddCart(product))} >Addtocart</button>
                  </div>
                </div>
                <div className='col-6'>
                  <div className='details__catagory'>
                    Category: {product?.categories[0].name}
                  </div>
                </div>
                <div className='col-6'>
                  <div className='details__desc_title'>
                 
                  </div>
                </div>
                <div className='col-6'>
                  <div className='details__desc'>
                    <p className='p__tag'> Description</p>
                    <div dangerouslySetInnerHTML={{ __html: product.description }} className="__html"></div>
                  </div>
                </div>
                <div className='col-6'>
                  <div className='review'>
                    {product.reviews_allowed}
                  </div>
                </div>
              </div>

            </div>
          )
        })
      }
    </div>
  )
}

export default Details