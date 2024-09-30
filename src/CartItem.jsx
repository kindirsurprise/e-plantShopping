import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
     return cart.reduce((total, item) => {
    return total + (item.cost * item.quantity); // Multiply cost by quantity and add to total
  }, 0); // Initialize total to 0
  };

  // Calculate total quantity of items in the cart
  const calculateTotalQuantity = () => {
    return cart.reduce((total, item) => {
      return total + item.quantity; // Sum up the quantities of each item
    }, 0);
  };

  // Update total quantity in the parent component
  React.useEffect(() => {
    setTotalQuantity(calculateTotalQuantity());
  }, [cart, setTotalQuantity]);


  const handleContinueShopping = (e) => {
     e.preventDefault(); // Prevent default button behavior if needed
    onContinueShopping(); // Call the function passed from the parent component
  };

  const handleCheckoutShopping = (e) => {
  alert('Functionality to be added for future reference');
};

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 })); // Increment quantity
  };

  const handleDecrement = (item) => {
    if (item.quantity === 1) {
      dispatch(removeItem(item.name)); // Remove item if quantity reaches 0
    } else {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 })); // Decrement quantity
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name)); // Dispatch removeItem with the item's name
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return (item.cost * item.quantity).toFixed(2); // Calculate total cost for the item
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


