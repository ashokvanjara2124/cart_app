import axios from 'axios';
import { SET_PRODUCTS, } from '../constant/action-types'
import { ADD_TO_CART, DELETE_CART, INCREASE_QUANTITY, DECREASE_QUANTITY, DETAIL_PRODUCT, APPLY_COUPON, SET_SIPPING, ORDER, CONTRY,SHIPPING_LINESDATA, APPLY_COUPONS_DATA, ORDERRECIVED,PAYMENT_METHOD } from '../constant/action-types';


export const setProduct = (data) => async (dispatch) => {
  try {
    const res = await axios.get("http://php74dev.com/wordpress/wp-json/wc/v3/products?per_page=12&orderby=date&order=desc&status=publish");
    // console.log(res)
    dispatch({
      type: SET_PRODUCTS,
      payload: { ShopData: res.data },
    });


  } catch (error) {
    dispatch({
      type: SET_PRODUCTS,
      payload: { ShopData: error },
    });
  }
};



export const setCoupon = () => async (dispatch) => {
  try {
    const repsonse = await axios.get(`http://php74dev.com/wordpress/wp-json/wc/v3/coupons`);

    dispatch({
      type: APPLY_COUPON,
      payload: { CouponData: repsonse.data },
    });


  }
  catch (error) {
    dispatch({
      type: APPLY_COUPON,
      payload: { CouponData: error },
    });
  }
};

export const ApplyCouponsData = (myRe) => async dispatch => {
  console.log("ApplyCouponsData", myRe);


  dispatch({
    type: APPLY_COUPONS_DATA,
    payload: myRe

  })
}
//this is the Shiiping api
export const setShipping = () => async (dispatch) => {
  try {
    const reponse = await axios.get("http://php74dev.com/wordpress/wp-json/wc/v3/shipping/zones/0/methods");
    dispatch({
      type: SET_SIPPING,
      payload: { ShippingData: reponse.data }
    });
  }
  catch (error) {
    dispatch({
      type: SET_SIPPING,
      payload: { ShippingData: error }
    });
  }
}

export const detailProduct = (payload) => {
  return {
    type: DETAIL_PRODUCT,
    payload 

  }
}
// this  api for order buying product
export const setorder = (values) => async (dispatch) => {
  try {
    const repsonse = await axios.post("http://php74dev.com/wordpress/wp-json/wc/v3/orders", (values));

    dispatch({
      type: ORDER,
      payload: { orderData: repsonse.data }
    })
  }
  catch (error) {
    dispatch({
      type: ORDER,
      payload: { orderData: error }
    })
  }
}
// this is used orderRecived
// export const orderRecived = ()=>async(dispatch)=>{
//   try{
//     const res = await axios.get("http://php74dev.com/wordpress/wp-json/wc/v3/orders");
//     dispatch({
//       type:ORDERRECIVED,
//       payload:{orderRecived:res.data}

//     })
//   }
//   catch(error){
//     dispatch({
//       type:ORDERRECIVED,
//       payload:{orderRecived:error}
//     })
//   }
// }



// This is the contry data api
export const contry = () => async (dispatch) => {
  try {
    const repsonse = await axios.get("http://php74dev.com/wordpress/wp-json/wc/v3/data/countries")
    dispatch({
      type: CONTRY,
      payload: { ContryData: repsonse.data }
    })
  }
  catch (error) {
    dispatch({
      type: CONTRY,
      payload: { ContryData: error }
    })
  }
}


// this is the Payment Getway
export const Paymentgetway = ()=>async (dispatch)=>{
  try{
    const repsonseData = await axios.get("http://php74dev.com/wordpress/wp-json/wc/v3/payment_gateways");
    dispatch({
      type:PAYMENT_METHOD,
      payload:{payment: repsonseData.data}
    })
  }catch(erorr){
    dispatch({
      type:PAYMENT_METHOD,
      payload:{repsonseData:erorr}
    })
  }
}
export function AddCart(payload) {

  return {
    type: 'ADD_CART',
    payload
  }
}

export function DeleteCart(payload) {
  return {
    type: 'DELETE_CART',
    payload
  }
}

export function IncreaseQuantity(payload) {
  return {
    type: 'INCREASE_QUANTITY',
    payload
  }
}
export function DecreaseQuantity(payload) {
  return {
    type: 'DECREASE_QUANTITY',
    payload
  }
}


