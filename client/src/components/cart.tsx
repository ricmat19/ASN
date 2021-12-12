import React, { FC, useEffect, useState } from "react";
import CartItemC from "./cartItem";
import HeaderC from "./header";
import FooterC from "./footer";
import CollectionAPI from "../apis/collectionAPI";
import { ICart } from "../interfaces";

const CartC: FC = () => {
  const [cart, setCart] = useState<ICart[]>([]);

  useEffect((): void => {
    const fetchData = async () => {
      try {
        const cartResponse = await CollectionAPI.get(`/cart`);

        for (let i = 0; i < cartResponse.data.data.cart.length; i++) {
          if (cartResponse.data.data.cart[i].imagekey !== null) {
            let imagesResponse = await CollectionAPI.get(
              `/images/${cartResponse.data.data.cart[i].imagekey}`,
              {
                responseType: "arraybuffer",
              }
            ).then((response) =>
              Buffer.from(response.data, "binary").toString("base64")
            );

            cartResponse.data.data.cart[i].imageBuffer = imagesResponse;
          }
        }
        setCart(cartResponse.data.data.cart);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="main-body">
      <HeaderC />
      <div className="center">
        <h1>Shopping Cart</h1>
      </div>
      <div className="cart-table">
        <div className="table-headers">
          <p>item</p>
          <p className="align-center">quantity</p>
          <p className="align-right">price</p>
        </div>
        <hr className="table-hr" />
        <div className="cart-items">
          <CartItemC cartCollection={cart} />
        </div>
        <div className="align-right cart-button">
          <button>
            <a href="/checkout">Checkout</a>
          </button>
        </div>
      </div>
      <FooterC />
    </div>
  );
};

export default CartC;
