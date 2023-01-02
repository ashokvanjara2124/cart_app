import React, { useState } from 'react'
import { DeleteCart } from '../action/productaction';
import { BsFillBagFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AiTwotoneDelete } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
const Header = () => {

  const dispatch = useDispatch()
  const numberof = useSelector((state) => state.Cartreducers.numberCart)
  const products = useSelector((state) => state.Cartreducers.Carts)
  // console.log("cart product is ", products)
  const popupCart = () => { }
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  let subtotatal = 0;
  products.map((cart) => {
    return (
      subtotatal += parseInt(cart.quantity) * parseInt(cart.price)
    )
  })

  const handleClose = () => {
    setAnchorEl(null);
  };


  // const data = () => {
  //   let subtotal = 0;
  //   products.map((cart) => {
  //     // console.log(cart.price*cart.quantity);
  //     // let subtotal = 0;
  //     subtotal += cart.price * cart.quantity;
  //     console.log(subtotal);
  //   })
  //   return (
  //     <p>{subtotal}</p>
  //     // <p>Hello</p>
  //   )
  // }
  return (
    <div className='navbar'>
      <div className='container'>
        <div className='nav__container'>
          <div className='nav__logo'>
            Shopping
          </div>
          <div className='nav__center as-d'>
            <Link to={"/"}>home</Link>
          </div>
          <div className='nav__center as-d'>
            <Link to={"/about"}>about</Link>
          </div>
          <div className='nav__right as-d'>
            <Link to={"/cart"}> cart</Link>
          </div>
          <div className='nav__right   as-d'>
            <Link to={"/Billingform"}>chekout</Link>
          </div>
          <div className='nav__pop'>
            <div className='nav__popup'>
              <Badge badgeContent={numberof} color="primary" >
                <BsFillBagFill className='popup_cart'
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                />
              </Badge>
              {products.length>0?<>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >


                <div className='container-fluid'>
                  {
                    products.map((cart, id) => {
                      return (
                   
                          <div className='row' key ={id}>
                            <div className='col-2'>
                              <div className='cart__image12'>
                                <img src={cart.image} alt="" className='ashok-img' />
                              </div>
                            </div>
                            <div className='col-2'>
                              <div className='cart__remove12' onClick={() => dispatch(DeleteCart(cart))}>
                                <AiTwotoneDelete />
                              </div>
                            </div>
                            <div className='col-2'>
                              <div className='cart__name12   small'>
                                {cart.name}
                              </div>
                            </div>
                            <div className='col-2'>
                              <div className='cart__quntity'>
                                {cart.quantity}<i className="fa-sharp fa-solid fa-xmark   icons"></i>
                              </div>
                            </div>
                            <div className='col-2 '>
                              <div className='cart__total12'>
                                ${cart.price * cart.quantity}.00 
                              </div>
                            </div>
                          </div>

                        
                      )
                    })
                  }
                </div>
                <div className='container'>
                  <div className='cart__subTotal'>
                    subtotal: ${subtotatal}
                  </div>
                  <div className='cart__viewCart'>
                    <Link to={"/cart"}>

                      view cart <i className="fa-sharp fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                  <div className='cart__checkout'>
                    <Link to={"/Billingform"}>
                    checkout <i className="fa-sharp fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </Menu>
              </>:null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header