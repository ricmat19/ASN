import React, { ChangeEvent, FC, useEffect, useState } from "react";
import collectionAPI from "../apis/collectionAPI";
import PropTypes from "prop-types";

const CartItemC: FC = (props) => {
  const [cart, setCart] = useState<([]);
  const [prices, setPrices] = useState<number[]>([]);
  const [cartQty, setCartQty] = useState<number[]>([]);
  const [subtotal, setSubtotal] = useState<number>();

  let sub = 0;
  let priceArray: number[] = [];
  let qtyArray: number[] = [];
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (cart.length === 0) {
          setCart(props.cartCollection);
        }

        if (priceArray.length === 0) {
          for (let i = 0; i < cart.length; i++) {
            sub += parseInt(cart[i].price);
          }
        } else {
          sub = priceArray.reduce(function (a, b) {
            return a + b;
          }, 0);
        }

        if (prices.length === 0) {
          setSubtotal(sub);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  });

  const deleteFromCart = async (id: String) => {
    try {
      await collectionAPI.put("/cart/delete", {
        id: id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const setItemQty = async (item, e: ChangeEvent) => {
    try {
      setPrices(priceArray);
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === item.id) {
          priceArray[i] = cart[i].price * e;
        } else {
          if (prices[i] !== undefined) {
            priceArray[i] = prices[i];
          } else {
            priceArray[i] = parseInt(cart[i].price);
          }
        }

        if (cart[i].id === item.id) {
          qtyArray[i] = parseInt(e);
        } else {
          if (cartQty[i] !== undefined) {
            qtyArray[i] = cartQty[i];
          } else {
            qtyArray[i] = 1;
          }
        }
      }
      setPrices(priceArray);
      setCartQty(qtyArray);
      await collectionAPI.put("/cart/quantity", {
        cartQty: qtyArray,
      });

      sub = 0;
      sub = priceArray.reduce(function (a, b) {
        return a + b;
      }, 0);
      setSubtotal(sub);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {cart &&
        cart.map((item, index) => {
          priceArray.push(parseInt(item.price));

          let itemPrice = ``;
          if (prices[index] === undefined) {
            itemPrice = item.price;
          } else {
            itemPrice = prices[index];
          }

          return (
            <div className="cart-item" key={item.id}>
              <div className="cart-item-details">
                <div className="cart-item-info">
                  <span
                    className="delete-button"
                    onClick={() => deleteFromCart(item.id)}
                  >
                    X
                  </span>
                  <span>
                    <img
                      className="cart-item-thumbnail"
                      src={`data:image/png;base64,${item.imageBuffer}`}
                      alt="thumbnail"
                    />
                  </span>
                  <div className="cart-item-title">{item.title}</div>
                </div>
                <div className="cart-item-qty">
                  <input
                    onChange={(event) => setItemQty(item, event.target.value)}
                    className="item-qty-input"
                    type="number"
                    placeholder="0"
                  />
                </div>
                <div className="cart-item-price">
                  <span>${itemPrice}.00</span>
                </div>
              </div>
              <hr className="item-hr" />
            </div>
          );
        })}
      <div className="align-right subtotal-div">
        <span>subtotal</span>
        <span>${subtotal}.00</span>
      </div>
    </div>
  );
};

CartItemC.propTypes = {
  cartCollection: PropTypes.array,
};

export default CartItemC;
