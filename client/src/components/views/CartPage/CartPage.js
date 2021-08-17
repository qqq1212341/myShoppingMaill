import React, {useEffect, useState} from 'react';
import { getCartItems, removeCartItem } from '../../../_actions/user_actions';
import {useDispatch} from 'react-redux';
import Grid from 'antd/lib/card/Grid';
import CartProductInfo from './CartProductInfo';
import Axios from 'axios';

function CartPage(props) {

  const [TotalPrice, setTotalPrice] = useState(0)
  const [userData, setuserData] = useState(0)
  const dispatch = useDispatch();
  useEffect(() => {

    let cartItems = []
    //리덕스 user state 안에 cart 안에 상품이 들어있는지 확인
    if(props.user.userData && props.user.userData.cart) {
      // console.log(props.user)
      if(props.user.userData.cart.length > 0) {
        props.user.userData.cart.forEach(item => {
          cartItems.push(item.id)
        })

        let total = 0
        dispatch(getCartItems(cartItems, props.user.userData.cart))
        .then(response => {
          // console.log(response.payload.product)
          caculateTotal(response.payload.product)
        })
      }
    }
  }, [props.user.userData, userData])

  const caculateTotal = (cartDetail) => {
  let total = 0
  cartDetail.map(item => {
    total += item.price * item.quantity
    // console.log(total)
    setTotalPrice(total)
    })
  } 

  let removeFromCart = (productId) => {
    // console.log(productId)
    dispatch(removeCartItem(productId))
    .then(
      // setuserData(1)
      window.location.replace("/user/cart")
    )
  }

  return (
    <div style={{padding:'90px', fontSize:'24px', fontWeight:'700', backgroundColor:'rgb(242, 243, 246)', fontFamily:'benton-sans,sans-serif'}}>
      Shopping Bag
      <div style={{display:'grid', gridTemplateColumns:'2.2fr 1fr', paddingTop: '30px', gap:'30px'}}>
        <div>
          {props.user.userData && props.user.userData.cart && 
          props.user.userData.cart.map((item, index) => {
            return <CartProductInfo  key={index} id={item.id} quantity={item.quantity} date={item.date} removeItem={removeFromCart}/>
          })}
        </div>
        <div style={{backgroundColor: 'white', height:'180px', padding:'30px'}}>
          <div>Total amount: {Number(TotalPrice).toLocaleString()}원</div>
          <div>PayPal</div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
