import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setCoupon, setShipping } from '../action/productaction'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useParams } from 'react-router-dom'
import OrderRecived from './OrderRecived';

const Coupon_code = (props) => {
  const dispatch = useDispatch()
  const coupon = useSelector((state) => state?.ashok?.coupon.CouponData)
  const products = useSelector((state) => state.Cartreducers.Carts)

  const Shipping = useSelector((state) => state?.shipping?.Shipping?.ShippingData)
  // console.log("Shipping_______", Shipping)


  const [user, setUser] = useState()
  const [showrCoupon, setHideCoupon] = useState(false)
  const [CouponData, SetCouponData] = useState()
  const [remove, setremove] = useState()
  const [data, setData] = useState("");
  const [value] = useState(50)
  const [right, setwrong] = useState(value)
  const [haa, setnaa] = useState(false)
  const [loading, setloading] = useState(false)
  const handletoggle = () => {
    setloading(ashok => !ashok)
    setTimeout(() => {
      setloading(false);
    }, 1000);
  };
  const handlechange = (e) => {

    setUser(e.target.value)
  }
  const handlesubmit = (e) => {
    e.preventDefault();

    SetCouponData(user)

    let data12 = coupon.find((ashok) => ashok.code === user);
    // console.log("copon code is ", data12 === products)


    const notify = () => {
      toast.success(`Coupon code is Applyed`, {
        position: toast.POSITION.TOP_CENTER
      });
    };
    if (data12) {

      setHideCoupon(data12)

      notify()
    }
    else {
      console.log("not valid")
    }
    setUser(" ")
  }
  useEffect(() => {
    dispatch(setCoupon());
    dispatch(setShipping());
  }, [])

  let amount = coupon?.find((ashok) => ashok.amount);





  let subtotatal = 0;
  let sub = 50.00
  products.map((cart) => {
    return (
      subtotatal += parseInt(cart.quantity) * parseInt(cart.price)

    )
  })

  const handleShipping = (e) => {
    console.log(e.target.value)
    let code = e.target.value;
    if (code == "Same day delivery") {
      // console.log("this is the sum",sum = subtotatal+value)
      let add = subtotatal + value;
      setnaa(subtotatal)


    }
    else {
      console.log("")
      alert("frees ")
    }
  }

  return (
    <>
      <div className='container d-flex'>
        <form className='d-flex form-input'>
          <div className="form-group">
            <input type="text" className="form-control" value={user} onChange={handlechange} placeholder="coupon code" />
          </div>
          <div className='form-group'>
            <button type="submit" className='btn-dark' name='btn-submit' onClick={handlesubmit} > Apply coupon</button>
            <div className="Tostcontainer">
              <ToastContainer position="top-center"
                className="tostinput"
                autoClose={30000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark" />
            </div>
          </div>
        </form>
      </div>
      {/* this is the cart summrmary start */}
      <div className='container'>
        <div className='box'>
          <div className='heading-hp'>
            <p>Cart total</p>
          </div>
          <div className='subtotal'>
            <div className='col-3'>
              Subtotal
            </div>
            <div className='col-3'>
              ${subtotatal}.00
            </div>
          </div>
          {
            showrCoupon &&
            <div className='coupon_code'>
              <div className='col-3'>
                Coupon:
                {/* {user} */}
                {CouponData}-
              </div>
              <div className='col-3'>
                -${amount?.amount} <Link className='link'>
                  <button type="" className='btn-remove' onClick={() => setHideCoupon(false)(handlesubmit)}>[remove]</button>
                </Link>
              </div>
            </div>

          }
          <div className='shipping'>
            <div className='col-3'>
              Shipping
            </div>
            <div className='col-3'>
              {
                Shipping?.map((shipPrice, i) => {

                  return (
                    <div className='' key={i}>
                      <input type="radio" value={shipPrice.title} onChange={handleShipping} name="gender" />
                      <span>{shipPrice.title} {shipPrice?.settings?.cost ? <span> ${shipPrice?.settings?.cost?.value}.00</span> : null}</span>
                    </div>
                  )
                })
              }

            </div>
          </div>
          <div className='shipping-total'>
            <div className='col-3'>
              Total
            </div>
            <div className='col-3'>

              ${subtotatal}.00



            </div>
          </div>

          <div className='btn-process'>
            <Link to={"/Billingform"}>
              {/* <Link to={"/Billingform"}> */}
              <button type="submit" className='btn-pro'>Proceed to checkout <i className="fa-solid fa-arrow-right  arrow"></i></button>
            </Link>
          </div>
        </div>

      </div>
    </>


  )
}

export default Coupon_code