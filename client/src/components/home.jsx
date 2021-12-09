import React, { useContext, useEffect, useState } from "react";
import CartModalC from "./cartModal";
import HeaderC from "./header";
import FooterC from "./footer";
import CollectionAPI from "../apis/collectionAPI";
import { CollectionContext } from "../context/collectionContext";

const HomeC = () => {
  const { setCollection } = useContext(CollectionContext);
  const [, setCart] = useState([]);
  const [cartState, setCartState] = useState(false);
  const [cartQty, setCartQty] = useState(0);
  const [cartCost, setCartCost] = useState(0);
  const [twoDImage, setTwoDImage] = useState("");
  const [threeDImage, setThreeDImage] = useState("");
  const [comicImage, setComicImage] = useState("");

  let productResponse;
  useEffect(() => {
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

        if (cartResponse.length !== 0) {
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
        setCollection(productResponse.data.data.collection);
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
      <div className="main-body home-menu">
        <a href="collection/2D">
          <div className="menu-item">
            <img className="menu-image" src={twoDImage} alt="prints" />
            <h1>2D art</h1>
          </div>
        </a>
        <a href="collection/3D">
          <div className="menu-item">
            <img className="menu-image" src={threeDImage} alt="3d art" />
            <h1>3D art</h1>
          </div>
        </a>
        <a href="collection/comic">
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
