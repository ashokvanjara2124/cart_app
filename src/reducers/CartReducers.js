import { ADD_CART, DECREASE_QUANTITY, DELETE_CART, INCREASE_QUANTITY } from '../constant/action-types'
import { placeHolderImage } from '../images/index';
const intialState = {
    numberCart: 0,
    Carts: [],
    _products: []
}

export const Cartreducers = (state = intialState, action) => {
    let ashok = action.payload?.Cartreducers?.Carts[0]?.image;
   
    switch (action.type) {
        case ADD_CART:
            if (state.numberCart == 0) {
                let cart = {
                    id: action.payload.id,
                    quantity: 1,
                    name: action.payload.name,
                    image: action.payload.images[0].src,
                    price: action.payload.price
                }
                state.Carts.push(cart);
            }
            else {
                let check = false;
                state.Carts.map((item, key) => {
                    if (item.id == action.payload.id) {
                        state.Carts[key].quantity++;
                        check = true;
                    }
                });
                if (!check) {
                    let _cart = {
                        id: action.payload.id,
                        quantity: 1,
                        name: action.payload.name,
                        image: action.payload.images[0].src,
                        price: action.payload.price
                    }
                    state.Carts.push(_cart);
                }
            }
            return {
                ...state,
                numberCart: state.numberCart + 1
            }
        case INCREASE_QUANTITY:
            // console.log("increment", state);
            // console.log("increment action", action.payload);

            state.numberCart++
            action.payload.quantity++;

            return {
                ...state
            }
        case DECREASE_QUANTITY:

            let quantity = action.payload.quantity;
            if (quantity > 1) {
                state.numberCart--;
                action.payload.quantity--;
            }

            return {
                ...state
            }
        case DELETE_CART:
            console.log(state);
            console.log(action.payload)

            let quantity_ = action.payload.quantity;
            return {
                ...state,
                numberCart: state.numberCart - quantity_,
                Carts: state.Carts.filter(item => {
                        

                    return item.id != action.payload.id
                })
            }
        default:
            return state;
    }
}