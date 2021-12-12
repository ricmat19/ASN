import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

interface ICartState {
  cartState: boolean,
  cartQty: number,
  cartCost: number,
}

const CartModalC = (props: ICartState) => {
  const [cartFull, setCartFull] = useState<boolean>(false);
  const [cartQty, setCartQty] = useState<number>(0);
  const [cartCost, setCartCost] = useState<number>(0);
  const [cartModal, setCartModal] = useState<string>("inactive-cart cart-modal");

  useEffect((): void => {
    const fetchData = async () => {
      try {
        setCartFull(props.cartState);
        setCartQty(props.cartQty);
        setCartCost(props.cartCost);

        if (cartFull === false) {
          setCartModal("inactive-cart cart-modal");
        } else {
          setCartModal("active-cart cart-modal");
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  });

  return (
    <a href="/cart">
      <div className={cartModal}>
        <i className="fas fa-shopping-cart cart-icon"></i>
        <div className="cart-quantity-div">
          <div className="cart-quantity">{cartQty}</div>
          <label>items</label>
        </div>
        <div className="totalPrice">${cartCost}</div>
      </div>
    </a>
  );
};

CartModalC.propTypes = {
  cartState: PropTypes.bool,
  cartQty: PropTypes.number,
  cartCost: PropTypes.number,
};

export default CartModalC;
