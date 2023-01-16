import React, { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Form from './Form';


const Cart = (props) => {
  const [order,setOrder] = useState(false)
  const [isSubmitting,setIsSubmitting] = useState(false)
  const [didSubmit,setDidSubmit] = useState(false)

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id)
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item, amount  : 1  })
  };

  const handleOrder = () => {    
    setOrder(true)
  }

  const confirmOrder = async(userData) => {
    setIsSubmitting(true)
    const response = await fetch('https://foodfest-64439-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body : JSON.stringify({
        user : userData,
        orderedItems : cartCtx.items
      })
    })
    if(response.ok){
      setDidSubmit(true)
      setIsSubmitting(false)
      cartCtx.clearCart()
    }else {
      didSubmit(true)
    }
  }

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalAction = (
    <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button} onClick={handleOrder}>Order</button>}
      </div>
  )
  
  const modalCart = (
    <React.Fragment>
    {cartItems}
       <div className={classes.total}>
         <span>Total Amount</span>
         <span>{totalAmount}</span>
       </div>
       
       {order && <Form onClose={props.onClose} onConfirmOrder = {confirmOrder} />}
       {!order && modalAction}
    </React.Fragment>
  )

  

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && modalCart}      
      {isSubmitting && <p>Processing Order</p>}
      {didSubmit && <p>Order has been placed. Happy Eating</p>}
    </Modal>
  );
};

export default Cart;
