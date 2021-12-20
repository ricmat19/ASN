import React, { FC, useEffect, useState } from "react";
import CartModalC from "./cart/cartModal";
import AccountHeaderC from "./standard/accountNav";
import MenuHeaderC from "./standard/menuNav";
import FooterC from "./standard/footer";
import CollectionAPI from "../apis/storeAPI";
import { ICart } from "../interfaces";

const HomeC: FC = () => {
  const [, setCart] = useState<ICart[]>([]);
  const [cartState, setCartState] = useState<boolean>(false);
  const [cartQty, setCartQty] = useState<number>(0);
  const [cartCost, setCartCost] = useState<number>(0);
  const [twoDImage, setTwoDImage] = useState<string>("");
  const [threeDImage, setThreeDImage] = useState<string>("");
  const [comicImage, setComicImage] = useState<string>("");

  let productResponse;
  useEffect((): void => {
    const fetchData = async () => {
      try {
        const cartResponse = await CollectionAPI.get(`/cart`);
        setCart(cartResponse.data.data.cart);

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

        productResponse = await CollectionAPI.get(`/collection`);

        for (let i = 0; i < productResponse.data.data.collection.length; i++) {
          if (productResponse.data.data.collection[i].imagekey !== null) {
            let imagesResponse = await CollectionAPI.get(
              `/images/${productResponse.data.data.collection[i].imagekey}`,
              {
                responseType: "arraybuffer",
              }
            ).then((response) =>
              Buffer.from(response.data, "binary").toString("base64")
            );

            if (
              productResponse.data.data.collection[i].primaryimage &&
              productResponse.data.data.collection[i].product === "2D"
            ) {
              setTwoDImage(`data:image/png;base64,${imagesResponse}`);
            }
            if (
              productResponse.data.data.collection[i].primaryimage &&
              productResponse.data.data.collection[i].product === "3D"
            ) {
              setThreeDImage(`data:image/png;base64,${imagesResponse}`);
            }
            if (
              productResponse.data.data.collection[i].primaryimage &&
              productResponse.data.data.collection[i].product === "comic"
            ) {
              setComicImage(`data:image/png;base64,${imagesResponse}`);
            }
          }
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
      <AccountHeaderC />
      <MenuHeaderC/>
      <div className="main-body home-menu">
        <a href="products/2D">
          <div className="menu-item">
            <img className="menu-image" src={twoDImage} alt="prints" />
            <h1>2D art</h1>
          </div>
        </a>
        <a href="products/3D">
          <div className="menu-item">
            <img className="menu-image" src={threeDImage} alt="3d art" />
            <h1>3D art</h1>
          </div>
        </a>
        <a href="products/comic">
          <div className="menu-item">
            <img className="menu-image" src={comicImage} alt="comics" />
            <h1>comics</h1>
          </div>
        </a>
      </div>
      <FooterC />
    </div>
  );
};

export default HomeC;
