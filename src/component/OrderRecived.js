import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { orderRecived } from '../action/productaction'
import spinner from '../Loder/spinner.gif'
const OrderRecived = (props) => {
    const Navigate = useNavigate();
    const products = useSelector((state) => state.Cartreducers.Carts)
    const numberof = useSelector((state) => state.Cartreducers.numberCart)
    const OrderData = useSelector((state) => state?.order?.orders?.orderData);
    console.log("orderData", OrderData && OrderData);
    console.log("orderData", OrderData && OrderData?.billing.email
    );
    // Date converter

    const date = new Date(OrderData && OrderData.date_created)
    const formattedDate = date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric"
    })
    console.log("formated Data is >>>> ", formattedDate ? formattedDate : "null")


    let subtotatal = 0;
    products.map((cart, id) => {

        return (

            subtotatal += parseInt(cart.quantity) * parseInt(cart.price)

        )
    })
    const retrunshop = (event) => {
        // event.preventDefult();
        Navigate("/")
    }
    return (
        <>

            <div className='main-container'>
                <div className="as-345">

                    <h4 className='main-h3-p'>Order received </h4>
                    <p className='order-para main-h3-p mb-4'>Thank you. Your order has been received.</p>
                    <button type="" onClick={() => retrunshop()} className="redirect-home">returnshop</button>

                    <div className='container  order-main '>
                        <div className='order_number '>
                            <p>ORDER NUMBER:</p>
                            <h5 className='all-center'>  {OrderData && OrderData?.id}</h5><hr className='hr' />
                            <p>EMAIL:</p>
                            <h5 className='all-center'>  {OrderData && OrderData?.billing.email}</h5><hr className='hr' />
                            <p>Date:</p>
                            <h5 className='all-center'>{formattedDate}</h5><hr className='hr' />
                            <p>TOTAl:</p>
                            <h5 className='all-center'> ${subtotatal}.00</h5><hr className='hr' />
                            <p>PAYMENT METHOD:</p>
                            <h5 className='all-center'>{props.meassage}</h5><hr className='hr' />
                            {console.log("the props data is the ",props.meassage)}
                        </div>
                    </div>
                    <h4 className='order-para main-h3-p mb-4'>Our bank details</h4>
                    <h5 className='order-para main-h3-p mb-4'>bob </h5>
                    <div className='order_number order-para main-h3-p mb-4'>
                        <p>BANK:</p>
                        <h5 className='all-center'>BANK OF BARODA</h5><hr className='hr' />
                        <p>ACCOUNT NUMBER:</p>
                        <h5 className='all-center'>12345678902</h5><hr className='hr' />
                        <p>ROUTING NUMBER:</p>
                        <h5 className='all-center'>12424</h5><hr className='hr' />
                        <p>IFSC:</p>
                        <h5 className='all-center'>DGMF12859</h5><hr className='hr' />
                        <p>BIC:</p>
                        <h5 className='all-center'>SSW1575269892698832</h5><hr className='hr' />
                    </div>
                    <h4 className='order-para main-h3-p '>Order details</h4>
                    <div className='main-check mt-5  '>
                        <div className='order-main-heading d-flex mb-2 order-para main-h3-p  mb-4  ' id='main-order'>
                            <div className='col-2'>
                                <h6 className='ashok-12444'>product</h6>
                            </div>
                            <div className='col-2'>
                                <h6 className='ashok-12444'>Total</h6>
                            </div>
                        </div>
                        <div className='main-h3-p mb-3'>
                            {
                                products.map((product) => {
                                    return (
                                        <>
                                            <div className='order-main-heading d-flex mt-3 '>
                                                <div className='col-2'>
                                                    {product.name} <i className="fa-sharp fa-solid fa-xmark   icons"></i>{product.quantity}
                                                </div>
                                                <div className='col-2'>
                                                    ${product.price * product.quantity}.00
                                                </div>

                                            </div>
                                            <div className='order-main-heading d-flex mt-3'>
                                                <div className='col-2'>
                                                    Subtotal
                                                </div>
                                                <div className='col-2'>
                                                    ${subtotatal}.00
                                                </div>
                                            </div>
                                            <div className='order-main-heading d-flex mt-3'>
                                                <div className='col-2'>
                                                    Shipping
                                                </div>
                                                <div className='col-2'>
                                                    Free Shipping
                                                </div>
                                            </div>
                                            <div className='order-main-heading d-flex mt-3'>
                                                <div className='col-2'>
                                                    Payment method:
                                                </div>
                                                <div className='col-2'>
                                                
                                                    Direct Bank transfer
                                                </div>
                                            </div>

                                        </>
                                    )
                                })
                            }
                        </div>
                        <div className='right-body d-flex mt-3'>
                            <div className='col-2'>
                                <strong>Total:</strong>
                            </div>
                            <div className='col-2'>
                                <strong>${subtotatal}.00</strong>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default OrderRecived 