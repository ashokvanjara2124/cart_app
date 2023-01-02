import React, { useState, useEffect } from 'react'
import { DeleteCart, IncreaseQuantity, DecreaseQuantity } from '../action/productaction';
import { useSelector, useDispatch } from 'react-redux'
import { placeHolderImage } from '../images/index';
import { BsDash, BsPlus } from "react-icons/bs";
import { BsReverseBackspaceReverse } from "react-icons/bs";
import { setCoupon } from '../action/productaction'
import { AiTwotoneDelete } from 'react-icons/ai';
import Coupon_code from './Coupon_code';
// import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import doted from '../images/doted.gif'
import { useNavigate } from 'react-router-dom';


const Cart = () => {
  const Navigate = useNavigate();
  const retrunshop=(event)=>{
    // event.preventDefult();
    Navigate("/")
}

  const products = useSelector((state) => state.Cartreducers.Carts)
console.log("cart data is ",products)
  const numberof = useSelector((state) => state.Cartreducers.numberCart)
  console.log("number of  cart",numberof)
  const coupon = useSelector((state) => state?.ashok?.coupon.CouponData)


  const [name, setName] = useState("");
  const [showresult, setHide] = useState(false)
  const [set, setdata] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const handleSubmit = () => {
    let data12 = coupon.find((ashok) => ashok.code === set);
    console.log(data12)


    setdata(name)
    if (data12) {
      console.log(set);
      setHide(data12)
    }
    else {
      console.log("not");
    }
  }

  const ashok = () => {

    toast.warning(`Data is Deleted`, {
      position: toast.POSITION.TOP_CENTER

    });

  }
  let data = products;

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setCoupon())
  }, [setCoupon])
  const ashokl = products.subtotatal
  
  let subtotatal = 0;
  products.map((cart) => {
    return (
      subtotatal += parseInt(cart.quantity) * parseInt(cart.price)
    )
  })
  console.log("subtotal",subtotatal)
  return (

    <div className='cart'>
      {loading ? (
        <div className="loader-container">
          {/* <img src={spinner} alt="Loading"/> */}
          {/* <div className="lds-facebook"><div></div><div></div><div></div></div> */}
          <img src={doted} alt="Loading" />

        </div>
      ) :
        <div className='container '>
          <div className='cart-top'>
       

            {products.length > 0 ? <>
              <div className='row'>
                <div className='col-9'>
                  <h3 className='h3'>Your Cart</h3>
                  <div className='cart__heading   ashok12'>
                    <div className='row'>
                      <div className='col-2'>Picture</div>
                      <div className='col-2'>Name</div>
                      <div className="col-2">Price</div>
                      <div className="col-2">Inc/Dec</div>
                      <div className="col-2">Total Price</div>
                      <div className="col-2">Remove</div>
                    </div>
                  </div>
                  {data.map((product) => {
                    return (
                      <div className='row verticalAlign' key={product.id}>
                        <div className='col-2'>
                          <div className='cart__image'>
                            <img src={product.image} alt="" />

                          </div>
                        </div>
                        <div className='col-2'>
                          <div className='cart__name'>
                            {product.name}
                          </div>
                        </div>
                        <div className='col-2'>
                          <div className='cart__price'>
                            {product.price}.00

                          </div>
                        </div>
                        <div className="col-2">
                          <div className="details__info cart__incDec">
                            <div className="details__incDec">
                              <span className="dec" onClick={() => dispatch(DecreaseQuantity(product))}><BsDash /></span>
                              <span className="quantity">{product.quantity}</span>
                              <span className="inc" onClick={() => dispatch(IncreaseQuantity(product))}><BsPlus /></span>
                            </div>
                          </div>
                        </div>
                        <div className="col-2">
                          <div className='total__price  '>
                            {product.price * product.quantity}.00
                          </div>
                        </div>
                        <div className="col-2">
                          <div className="cart__remove" onClick={() => dispatch(DeleteCart(product))}>
                            <AiTwotoneDelete />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <Coupon_code />
              </div>
            </> : <div className="alert alert-danger" role="alert">
              <a href="#" className="alert-link">Cart is Empty</a>. Fill the Product...!
                 <button type="" onClick={()=>retrunshop()} className="redirect-home">returnshop</button>
            </div>
            }
          </div>
        </div>
      }
    </div>
  )
}

export default Cart