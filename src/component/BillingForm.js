import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Accordion from 'react-bootstrap/Accordion';
import { contry, setorder, setformData, setShipping, Paymentgetway } from '../action/productaction';
import { useForm } from 'react-hook-form';
import { signUpSchema } from './Formvalidation';
import { useFormik } from 'formik';

import { createSearchParams, useNavigate} from 'react-router-dom';


const validate = values => {
  const errors = {};

  if (!values.first_name) {
    errors.first_name = 'Billing First name is a required field.';

  } else if (values.first_name.length > 15) {
    errors.first_name = 'Must be 15 characters or less';
  }

  if (!values.last_name) {
    errors.last_name = 'Billing Last name is a required field.';
  } else if (values.last_name.length > 20) {
    errors.last_name = 'Must be 20 characters or less';
  }
  if (!values.address_1) {
    errors.address_1 = "Billing Street address is a required field."
  } else if (values.address_1.length > 50) {
    errors.address_1 = "Must be 20 characters or less"
  }
  if (!values.city) {
    errors.city = "Billing Town / City is a required field."
  } else if (values.city) {
    // errors.Town=""
  }
  if (!values.postcode) {
    errors.postcode = "Billing post code is A required field. "
  }
  if (!values.phone) {
    errors.phone = "Billing Phone is a required field."
  } else if (values.phone.length > 10) {
    errors.phone = "maximum 10 or 12 "
  }

  if (!values.email) {
    errors.email = "Billing Email address is a required field."
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address"
  }



  return errors;


};


const BillingForm = (props) => {
  const products = useSelector((state) => state.Cartreducers.Carts)
  const numberof = useSelector((state) => state.Cartreducers.numberCart)
  const Shipping = useSelector((state) => state?.shipping?.Shipping?.ShippingData)
  // console.log("Shipping_______", Shipping)

  const paymentData = useSelector((state) => state?.paymentreducers?.payment?.payment)
  // console.log("the  payment data is ", paymentData)
  const OrderData = useSelector((state) => state?.order?.orders?.orderData);
  // console.log("orderData", OrderData);
  const shipping_linesData = useSelector((state) => state.setformData.shipping_linesData)
  // console.log("shiiping__linesData", shipping_linesData)

  const shippingCost = shipping_linesData.map((data) => data.total)
  // console.log("shippingCost is==============>", shippingCost)
  const [check, setcheck] = useState(false)
  const [selectedcontry, setselectedContry] = useState(false)
  const [shippinginput, setshippinginput] = useState(shipping_linesData)
  const contrydata = useSelector((state) => state?.contry.contry.ContryData)
  // console.log("the contry is ",contrydata);
  const availableState = contrydata?.find((a) => a.name === selectedcontry)
  const [value, setvalue] = useState(50)
  const [asss, setss] = useState(false)
  const [payment_method, setpayment_method] = useState('')
  const navigate = useNavigate()
  // console.log("state isssssssssssss", availableState)


  const [showTopBtn, setShowTopBtn] = useState(false);
  const [meassage, setmessage] = useState('');
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const dispatch = useDispatch()
  const handlechange = () => {
    setcheck(!check)
  }
  let subtotatal = 0;
  products.map((cart, id) => {
    return (
      subtotatal += parseInt(cart.quantity) * parseInt(cart.price)
    )
  })

  const clickTitle = () => {
  }
  const handlepaymentgetway = () => {
  }
  const clickme = () => {
    alert("click me now")
  }
  // formik validatin start here

  const handlesubmit = (e) => {
    e.preventDefault();
  }
  const handleChange = () => {
    console.log("the value is ")
  }

  const changeData = (e) => {
    
    // console.log("payment data is :=====>", e.target.value)
    // setmessage(e.target.value)
       

  }
  const ashokcontry = (e) => {

    console.log("contry data is ", e.target.value)
  }
  const [chekc, setuncheck] = useState(false)

  const shippinghandlechange = (e) => {
    console.log("this is shipping method", e.target.value)
  }
  useEffect(() => {
    dispatch(contry())
  }, [])

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      company: "",
      address_1: '',
      country: '',

      address_2: '',
      city: '',
      state: '',
      postcode: "",
      phone: '',
      email: '',

      shipping: {
        Shipping_12_first_name: '',
        Shipping_12_last_name: '',
        Shipping_12_company: "",
        Shipping_12_address_1: '',
        Shipping_12_country: '',
        Shipping_12_address_2: '',
        Shipping_12_city: '',
        Shipping_12_state: '',
        Shipping_12_postcode: "",
        Shipping_12_phone: '',
        Shipping_12_email: '',
        line_items: ''
      },
      payment_method: '',
    },



    validate,

    onSubmit: values => {
      navigate("/orderRecived")
      alert(JSON.stringify(values, null, 2));
      dispatch(setorder({ billing: values, shipping: values }))
      console.log(JSON.stringify(values, null, 2))
    }
  })
  useEffect(() => {
    dispatch(Paymentgetway())
  }, [])
  return (

    <>


      <div className='container form-bill'>
        <form onSubmit={formik.handleSubmit}>

          <div className='billing-form'>

            {formik.touched.first_name && formik.errors.first_name ? (
              <div className='error'> <i className="fa-sharp fa-solid fa-circle-exclamation mb-3 as-icons"></i>{formik.errors.first_name}</div>
            ) : null}

            {formik.touched.last_name && formik.errors.last_name ? (
              <div className='error'> <i className="fa-sharp fa-solid fa-circle-exclamation as-icons"></i>  {formik.errors.last_name}</div>
            ) : null}
            {formik.touched.address_1 && formik.errors.address_1 ? (
              <div className='error'><i className="fa-sharp fa-solid fa-circle-exclamation as-icons"></i>{formik.errors.address_1}</div>
            ) : null}
            {formik.touched.city && formik.errors.city ? (
              <div className='error'><i className="fa-sharp fa-solid fa-circle-exclamation as-icons"></i>{formik.errors.city}</div>
            ) : null}
            {formik.touched.postcode && formik.errors.postcode ? (
              <div className='error'><i className="fa-sharp fa-solid fa-circle-exclamation as-icons"></i>{formik.errors.postcode}</div>
            ) : null}
            {formik.touched.phone && formik.errors.phone ? (
              <div className='error'><i className="fa-sharp fa-solid fa-circle-exclamation as-icons"></i>{formik.errors.phone}</div>
            ) : null}
            {formik.touched.email && formik.errors.email ? (
              <div className='error'><i className="fa-sharp fa-solid fa-circle-exclamation as-icons"></i>{formik.errors.email}</div>
            ) : null}



            <h3 className=''>Billing form</h3>
            <div className='row-1'>
              <div className='first-last d-flex'>
                <div className='col-3'>
                  <div className="mb-3">
                    <label htmlFor="text" className="form-label">First name</label>
                    <input type="text" name='first_name' className="form-control" id=" first_name" onChange={formik.handleChange} value={formik.values.first_name || ''} />
                  </div>

                </div>
                <div className='col-3'>
                  <div className="mb-3">
                    <label htmlFor="last_name" className="form-label">Last name</label>
                    <input type="text" name='last_name' className="form-control l-name" id="last_name" onChange={formik.handleChange} value={formik.values.last_name || ''} />
                  </div>
                </div>

              </div>
              <div className='company-name' id='width-23'>
                <div className="mb-3">
                  <label htmlFor="company" className="form-label">Company name (optional)</label>
                  <input type="text" name='company' className="form-control" id="company" onChange={formik.handleChange} value={formik.values.company || ''} />
                </div>
              </div>
              <div className='dropdown-1 mb-3' id='width-23' >
                <label htmlFor="country" className="formF-label">Country / Region *</label>
                <select className="form-select" name='country' onChange={(e) => setselectedContry(e.target.value)} value={selectedcontry} id='country' >

                  {
                    contrydata?.map((country) => {
                      return (
                        <option key={contry.id} value={contry.id}>{country.name}</option>
                      )
                    })
                  }
                </select>

              </div>
              <div className='street-Address' id='width-23'>
                <div className="mb-3">
                  <label htmlFor="adress_1" className="form-label">Street address *</label>
                  <input type="text" className="form-control" id="address_1" name='address_1' onChange={formik.handleChange} value={formik.values.address_1 || ''} />
                </div>
              </div>
              <div className='' id='width-23'>
                <div className="mb-3">
                  <label htmlFor="adress_2" className="form-label"></label>
                  <input type="text" className="form-control" id="address_2" name='address_2' onChange={formik.handleChange} value={formik.values.address_2 || ''} />
                </div>
              </div>
              <div className='town/city' id='width-23'>
                <div className="mb-3">
                  <label htmlFor="city" className="form-label">Town/City *</label>
                  <input type="text" className="form-control" id="city" name='city' onChange={formik.handleChange} value={formik.values.city || ''} />
                </div>
              </div>

              <div className='state'>
                <div className='dropdown-1 mb-3' id='width-23' >
                  <label htmlFor="state" className="formF-label">state*</label>
                  <select className="form-select" name='state' onChange={formik.handleChange} value={formik.values.state} id='state'>
                    {availableState?.states?.map((states, id) => {
                      return (
                        <option key={id} value={formik.values.name} onChange={onclick}>{states.name}</option>
                      )
                    })}

                  </select>
                </div>
                <div className='zip-code' id='width-23'>
                  <div className="mb-3">
                    <label htmlFor="postcode" className="form-label">ZIP Code *</label>
                    <input type="text" className="form-control" id="postcode" name='postcode' onChange={formik.handleChange} value={formik.values.postcode || ''} />
                  </div>
                </div>
                <div className='phone' id='width-23'>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="text" className="form-control" id="phone" name='phone' onChange={formik.handleChange} value={formik.values.phone || ''} />
                  </div>
                </div>
                <div className='email' id='width-23'>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email-address</label>
                    <input type="email" className="form-control" id="email" name='email' onChange={formik.handleChange} value={formik.values.email || ''} />
                  </div>
                </div>
                <div className='order-details'>

                  <div className='container'>
                    <div className='row'>
                      <div className='order-heading-1 '>
                        <h4 className='main-heading'>Your order</h4>
                        <div className='ashok-21 d-flex'>
                          <div className='col-2'>
                            <h5 className='order-main-heading'>Product</h5>
                          </div>
                          <div className='col-2'>
                            <h5 className='order-main-heading-subtotal'>Subtotal</h5>
                          </div>
                        </div>
                        <div className='order-start'>

                          <div className='row-12'>
                            {
                              products.map((product, id) => {
                                return (
                                  <>
                                    <div className='order-name-q d-flex' key={id} >
                                      <div className='col-2' >
                                        {product.name} <i className="fa-sharp fa-solid fa-xmark   icons"></i>{product.quantity}
                                      </div>
                                      <div className='col-2'>
                                        ${product.price * product.quantity}.00
                                      </div>
                                    </div>
                                  </>
                                )
                              })
                            }
                          </div>
                          <div className='Subtotal d-flex' id='space-top'>
                            <div className='col-2'>
                              <h6 className=''>subtotal:</h6>
                            </div>
                            <div className='col-2'>
                              <h6 className=''>${subtotatal}.00</h6>
                            </div>
                          </div>
                          <div className='shipping-display d-flex' id='space-top'>
                            <div className='col-2'>
                              <h5>Shipping</h5>
                            </div>
                            <div className='col-2'>
                              {Shipping?.map((item, id) => (

                                <label>
                                  <input key={id}
                                    onChange={(e) => shippinghandlechange(e)}
                                    id="radio1"
                                    name="radiobuttonshipping"
                                    type="radio"
                                    checked={shipping_linesData ? shipping_linesData?.find((i) => i.method_id === item.method_id) ? item.method_id : null : id == 0}
                                    value={item.method_id}
                                  />
                                  <span>{item.title} {item?.settings?.cost ? <span> ${item?.settings?.cost?.value}.00</span> : null}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                          <div className='order-total d-flex' id='space-top'>
                            <div className='col-2'>
                              <strong>Total</strong>
                            </div>
                            <div className='col-2'>
                              <strong>${subtotatal}.00</strong>


                            </div>
                          </div>
                          <div className='payment-check' id='space-top'>
                            {
                              paymentData?.map((payment_method, id) => {
                                // console.log("ashok", paymentData)
                                return (


                                  <div>
                                    <section id="accordion">
                                      <div className='ashok1243545' key={id}>
                                        <input type="radio" name="payment_method" id="payment_method" className='radio-black' value={payment_method.title} onClick={changeData} />
                                        <label className='ashok123' name="payment_method_title" id="payment_method_title" value={payment_method.title || ""} onChange={handleChange}>{payment_method.title}</label>
                                        <article className='article'>
                                          {payment_method.description}
                                        </article>
                                      </div>
                                    </section>
                                  </div>
                                )
                              })
                            }
                          </div>
                          <div className='parapage'>
                            <article>
                              Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <strong className='pollicy'>privacy policy.</strong>
                            </article>
                          </div>
                          <div className='place-btn'>
                            <button type="submit" name='submit' className='btn-submit-form' onClick={goToTop}>place order</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* pass here chekout chekbox */}
                <div className='shipAdd-12 mb-3'>
                  <div className="form-check mb-3">
                    <input className="form-check-input" type="checkbox" onChange={handlechange} id="flexCheckDefault" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                      <p className='other-spiing'> Ship to a different address?</p>
                    </label>
                    {check ?
                      <div>
                        {/* Shipping form  start here */}

                        <div>
                          <div className='shipping-other' >
                            <div className='new-form'>
                              <div className='d-flex'>
                                <div className="mb-3">
                                  <label htmlFor="Shipping_12_first_name" className="form-label">First name</label>
                                  <input type="text" className="form-control" id="Shipping_12_first_name" name='Shipping_12_first_name' value={formik.values.Shipping_12_first_name} onChange={formik.handleChange} />
                                </div>
                                <div className="mb-3" id="lastname">
                                  <label htmlFor="_12_last_name" className="form-label ">Last name</label>
                                  <input type="text" className="form-control ls-name" id="Shipping_12_last_name" name='Shipping_12_last_name' value={formik.values.Shipping_12_last_name} onChange={formik.handleChange} />
                                </div>
                              </div>
                            </div>
                            <div className='width-1 mb-3' id='width-1'>
                              <label htmlFor="Shipping_12_company" className="form-label">Company name</label>
                              <input type="text" className="form-control" id="Shipping_12_company" name='Shipping_12_company' value={formik.values.Shipping_12_company} onChange={formik.handleChange} />
                            </div>
                            <div className='avivanjara mb-3 ' id='width-1'>
                              <label htmlFor="Shipping_12_company" className="form-label">Contry/State*</label>
                              {/* <select className="form-select" name='Shipping_12_ ntry' onChange={(e) => setselectedContry(e.target.value)} value={selectedcontry} id='country' >
                              {
                                contrydata.map((contry, id) => {
                                  return (
                                    <><option key={id} >{contry.name}</option>
                                    </>
                                  )
                                })
                              }
                            </select> */}
                            </div>
                            <div className='width-1 mb-3' id='width-1'>
                              <label htmlFor="Shipping_12_address_1" className="form-label">Street address *</label>
                              <input type="text" className="form-control" id="Shipping_12_address_1" name='Shipping_12_address_1' value={formik.values.Shipping_12_address_1} onChange={formik.handleChange} />
                            </div>
                            <div className='width-1 mb-3' id='width-1'>
                              <label htmlFor="Shipping_12_address_2" className="form-label"></label>
                              <input type="text" className="form-control" id="Shipping_12_address_2" name='Shipping_12_address_2' placeholder='Apartment, suite, unit, etc. ' value={formik.values.Shipping_12_address_2} onChange={formik.handleChange} />
                            </div>
                            <div className='width-1 mb-3' id='width-1'>
                              <label htmlFor="Shipping_12_city" className="form-label">Town / City *</label>
                              <input type="text" className="form-control" id="Shipping_12_city" name='Shipping_12_city' value={formik.values.Shipping_12_city} onChange={formik.handleChange} />
                            </div>
                            <div className='avivanjara mb-3 ' id='width-1'>
                              <label htmlFor="Shipping_12_state" className="form-label">state*</label>
                              {/* <select className="form-select" name='Shipping_12_state' id='Shipping_12_state'>
                              {availableState?.states?.map((states, id) => {
                                return (
                                  <> <option key={id} value={formik.values.name}>{states.name}</option></>
                                )
                              })}

                            </select> */}
                            </div>
                            <div className='width-1 mb-3' id='width-1'>
                              <label htmlFor="Shipping_12_postcode" className="form-label">Zip code</label>
                              <input type="text" className="form-control" id="Shipping_12_postcode" name='Shipping_12_postcode' value={formik.values.Shipping_12_postcode} onChange={formik.handleChange} />
                            </div>
                          </div>
                        </div>
                      </div>
                      : null}
                  </div>
                </div>
                <div className='ordernotes' id='width-1'>
                  <div className="mb-3">
                    <label htmlFor="notes" className="form-label">Order notes (optional)</label>
                    <input type="notes" className="form-control" id="notes" name='notes' />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <OrderRecived/> */}
        </form>
      </div>
    </>
  )
}

export default BillingForm      