import { combineReducers } from "redux";
import { productreducers } from "./ProductReducers";
import { Cartreducers } from "./CartReducers";
import { couponReducers } from './CouponReducers'
import { shippingReducer } from './ShippingReducers';
import { orderReducer } from './OrderformReducers'
import { contryreducers } from "./ContryData";
import { Paymentreducers } from "./PaymentGetway";
import { SetformDatareducers } from "./SetformDatareducers";
import { applycoupon } from "./ApplyCoupon";
import { Orderrecivedreducers } from "./Orderrecivedreducers";


const reducer = combineReducers({
    allproduct: productreducers,
    Cartreducers,
    ashok: couponReducers,
    shipping: shippingReducer,
    order: orderReducer,
    contry: contryreducers,
    paymentreducers: Paymentreducers,
    setformData: SetformDatareducers,
    applycoupon: applycoupon,
    orderreceived: Orderrecivedreducers

})

export default reducer;