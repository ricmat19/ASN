import React, { FC, useEffect, useState } from "react";
import CartItemC from "./cartItem";
import AccountHeaderC from "../standard/accountNav";
import MenuHeaderC from "../standard/menuNav";
import FooterC from "../standard/footer";
import IndexAPI from "../../../apis/indexAPI";
import { ICart } from "../../../interfaces";

const CartC: FC = () => {
  const [cart, setCart] = useState<ICart[]>([]);

  useEffect((): void => {
    const fetchData = async () => {
      try {
        const cartResponse = await IndexAPI.get(`/cart`);

        for (let i = 0; i < cartResponse.data.data.cart.length; i++) {
          if (cartResponse.data.data.cart[i].imagekey !== null) {
            let imagesResponse = await IndexAPI.get(
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
      <AccountHeaderC />
      <MenuHeaderC/>
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
