import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setorder, contry } from '../action/productaction';
import { json, Link, useNavigate } from 'react-router-dom';
import OtherShip from './OtherShip';
import { useFormik } from 'formik';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
// import OrderPage from './OrderPage';
import doted from '../images/doted.gif'


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

const Checkout = (props) => {
    const [show, hide] = useState(false)
    const [check, setcheck] = useState(false)
    const [error, seterror] = useState(false)
    const [selectedcontry, setselectedContry] = useState(null)

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const OrderData = useSelector((state) => state.order.orders);
    const contrydata = useSelector((state) => state.contry.contry.ContryData)
    const shipping_linesData = useSelector((state) => state)
    console.log("shipping___lines",)


    const [showTopBtn, setShowTopBtn] = useState(false);
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
    useEffect(() => {
        dispatch(contry())
    }, [])
    const handlechange = () => {
        setcheck(!check)
    }



    const availableState = contrydata.find((a) => a.name === selectedcontry)
    // console.log(availableState,"this is the state")


    // Form validation start  here
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
            email: ''
        },
        validate,

        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
            console.log(JSON.stringify(values))
            dispatch(setorder(values))
            console.log("the  ", values)
        },
    });
    const handlestate = (e) => {
        console.log("e is =================", e.target.value)
    }
    return (
        <>
            {
                <div className='container checkout'>

                    <form onSubmit={formik.handleSubmit}>
                        <div className='heading-h3'>
                            Checkout
                            <hr />
                        </div>


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



                        <div className='f-l-name'>
                            <p className='billing '>Billing  Details</p>
                            <div className='d-flex'>
                                <div className="mb-3" >
                                    <label htmlFor="first_name" className="form-label">First name</label>
                                    <input type="text" className="form-control" id='first_name' name='first_name' onChange={formik.handleChange}
                                        value={formik.values.first_name} aria-describedby="firstHelp" />

                                </div>
                                <div className="mb-3" id="lastname">
                                    <label htmlFor="last_name" className="form-label">Last name</label>
                                    <input type="text" className="form-control width-input" id="last_name" name='last_name' onChange={formik.handleChange} value={formik.values.last_name} />
                                </div>
                            </div>
                        </div>

                        <div className=' mb-3' id='width-1'>
                            <label htmlFor="company" className="form-label">Company name (optional)</label>
                            <input type="text" className="form-control" id="company" name='company' value={formik.values.company} onChange={formik.handleChange} />
                        </div>
                        <div className='dropdown-1 mb-3' id='width-1' >
                            <label htmlFor="country" className="formF-label">Country / Region *</label>
                            <select className="form-select" name='country' id='country' value={selectedcontry} onChange={(e) => setselectedContry(e.target.value)}>
                                {
                                    contrydata.map((us, id) => {
                                        return (
                                            <option key={id} value={us.name}>{us.name}</option>
                                        )

                                    })
                                }
                            </select>
                        </div>
                        <div className=' mb-3' id='width-1'>
                            <label htmlFor="address_1" className="form-label">Street address *</label>
                            <input type="text" className="form-control" id="address_1" name='address_1' value={formik.values.address_1} onChange={formik.handleChange} placeholder='House number and street name' />
                        </div>

                        <div className=' mb-3' id='width-1'>
                            <label htmlFor="address_2" className="form-label"></label>
                            <input type="text" className="form-control" id="address_2" name='address_2' value={formik.values.address_2} onChange={formik.handleChange} placeholder='Apartment, suite, unit, etc.' />
                        </div>
                        <div className=' mb-3' id='width-1'>
                            <label htmlFor="city" className="formF-label">Town / City *</label>
                            <input type="text" className="form-control" id="city" name='city' value={formik.values.city} onChange={formik.handleChange} />
                        </div>
                        <div className='dropdown-1 mb-3' id='width-1' >
                            <label htmlFor="state" className="form-label">State</label>
                            <select className="form-select" name='states' onChange={handlestate} id='states'>
                                {availableState?.states?.map((states, id) => {
                                    return (
                                        <option key={id} value={states.name}>{states.name}</option>
                                    )
                                })}

                            </select>
                        </div>
                        <div className='mb-3' id='width-1'>
                            <label htmlFor="postcode" className="formF-label">Zip code</label>
                            <input type="text" className="form-control" id="postcode" name='postcode' value={formik.values.postcode} onChange={formik.handleChange} />
                        </div>
                        <div className='mb-3' id='width-1'>
                            <label htmlFor="Phone" className="form-label">Phone</label>
                            <input type="text" className="form-control" id="phone" name='phone' value={formik.values.phone} onChange={formik.handleChange} />
                        </div>
                        <div className='mb-3' id='width-1'>
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" name='email' value={formik.values.email} onChange={formik.handleChange} />
                        </div>


                        <div className='shipAdd mb-3'>
                            <div className="form-check mb-3">

                                <input className="form-check-input" type="checkbox" onChange={handlechange} id="flexCheckDefault" />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    <p className='other-spiing'> Ship to a different address?</p>
                                </label>
                                {check ?
                                    <div>

                                        <OtherShip />
                                    </div>
                                    : null}
                            </div>
                        </div>
                        <div className='text-area mb-9'>
                            <label htmlFor="">Order notes (optional)</label>
                            <div className="form-floating mb-3" id='text-area' >
                                <textarea className="form-control" placeholder="as" id="floatingTextarea"></textarea>
                            </div>
                        </div>
                        <div className='btn-palce'>
                            {

                                showTopBtn && (
                                    <button type="submit" className='btn-submit-form' name='submit' onClick={goToTop}>place order</button>


                                )
                            }
                        </div>

                    </form>

                </div>
            }

        </>
    )
}

export default Checkout