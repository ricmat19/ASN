import React, { FC, useEffect, useState } from "react";
import PropTypes from "prop-types";
// import { Cart } from "../interfaces";

const OrderSummaryC: FC = (props) => {
//   const [cart, setCart] = useState<Cart[]>([]);
  const [cartPrices, setCartPrices] = useState<number[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);

  useEffect((): void => {
    const fetchData = async () => {
      try {
//         setCart(props.cartCollection);
//         setCartPrices(props.cartPrices);
//         setSubtotal(props.subtotal);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  });

  return (
    <div>
      {/* {cart &&
        cartPrices &&
        cart.map((item, index) => {
          return (
            <div className="cart-item" key={item.id}>
              <div className="order-item-details">
                <div className="cart-item-info">
                  <img
                    className="cart-item-thumbnail"
                    src={`data:image/png;base64,${item.imageBuffer}`}
                    alt="thumbnail"
                  />
                  <div className="cart-item-title">Title</div>
                </div>
                <div className="cart-item-price">
                  <span>${cartPrices[index]}.00</span>
                </div>
              </div>
            </div>
          );
        })} */}
      <hr className="checkout-hr" />
      <div className="two-column-div">
        <p className="align-left">subtotal</p>
        <p className="align-right">${subtotal}.00</p>
      </div>
    </div>
  );
};

OrderSummaryC.propTypes = {
  cartCollection: PropTypes.array,
  cartPrices: PropTypes.array,
  subtotal: PropTypes.number,
};

export default OrderSummaryC;
