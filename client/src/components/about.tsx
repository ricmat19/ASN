import React, { FC, useEffect, useState } from "react";
import CartModalC from "./cartModal";
import HeaderC from "./header";
import FooterC from "./footer";
import { ICart } from "../interfaces";
import CollectionAPI from "../apis/collectionAPI";

const AboutC: FC = () => {
  const [, setCart] = useState<ICart[]>([]);
  const [cartState, setCartState] = useState<boolean>(false);
  const [cartQty, setCartQty] = useState<number>(0);
  const [cartCost, setCartCost] = useState<number>(0);

  useEffect((): void => {
    const fetchData = async () => {
      try {
        const cartResponse = await CollectionAPI.get(`/cart`);
        setCart(cartResponse.data.data.cart);
        console.log(cartResponse)

        setCartQty(cartResponse.data.data.cart.length);

        let price = 0;
        for (let i = 0; i < cartResponse.data.data.cart.length; i++) {
          price += parseInt(cartResponse.data.data.cart[i].price);
        }
        setCartCost(price);

        if (cartResponse.data.data.cart.length !== 0) {
          setCartState(true);
        } else {
          setCartState(false); 
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <CartModalC cartState={cartState} cartQty={cartQty} cartCost={cartCost} />
      <HeaderC />
      <div className="main-body">
        <div className="center">
          <h1>about</h1>
        </div>
        <div className="profile-info">
          <div className="profile-image-div">
            <div className="image">
              <div className="big-image-div">
                <img
                  className="big-image"
                  src="../../images/profileImage.jpeg"
                  alt="profile"
                />
              </div>
            </div>
            <div className="details"></div>
            <div className="qty"></div>
          </div>
          <div className="about-info">
            <p>&emsp; &emsp; {process.env.REACT_APP_INFO_PARAGRAPH_1}</p>
            <p>&emsp; &emsp; {process.env.REACT_APP_INFO_PARAGRAPH_2}</p>
          </div>
        </div>
      </div>
      <FooterC />
    </div>
  );
};

export default AboutC;
