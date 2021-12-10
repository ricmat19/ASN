import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import CollectionAPI from "../apis/collectionAPI";
import { CollectionContext } from "../context/collectionContext";
import CartModalC from "./cartModal";
import HeaderC from "./header";
import FooterC from "./footer";

const ItemDetailsC = () => {
  const [, setCart] = useState([]);
  const [cartState, setCartState] = useState(false);
  const [cartQty, setCartQty] = useState(0);
  const [cartCost, setCartCost] = useState(0);

  const { product, id } = useParams();
  const { selectedItem, setSelectedItem } = useContext(CollectionContext);

  const [imageBuffer, setImageBuffer] = useState("../../images/loading.svg");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await CollectionAPI.get(
          `/collection/${product}/${id}`
        );

        if (productResponse.data.data.item.imagekey !== null) {
          let imagesResponse = await CollectionAPI.get(
            `/images/${productResponse.data.data.item.imagekey}`,
            {
              responseType: "arraybuffer",
            }
          ).then((response) =>
            Buffer.from(response.data, "binary").toString("base64")
          );

          setImageBuffer(`data:image/png;base64,${imagesResponse}`);
        }
        setSelectedItem(productResponse.data.data.item);

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
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const addToCart = async (e) => {
    e.preventDefault();
    try {
      const response = await CollectionAPI.post("/cart", {
        id: id,
      });

      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  // const imageURL = async (imagekey) =>{

  //     const imagesResponse = await CollectionAPI.get(`/images/${imagekey}`, {
  //         responseType: 'arraybuffer'
  //     })
  //     .then(response => Buffer.from(response.data, 'binary').toString('base64'))
  //     console.log(imagesResponse)
  //     setImages(imagesResponse);
  // }

  // onChange={imageURL(selectedItem.imagekey)}

  return (
    <div>
      <CartModalC cartState={cartState} cartQty={cartQty} cartCost={cartCost} />
      <HeaderC />
      <div className="main-body item-details">
        <div className="item-images">
          <div className="image-div">
            <div className="big-image-div">
              <img className="big-image" src={imageBuffer} alt="main" />
            </div>
            {/* <div className="image-thumbnails">
                            <img className="image-thumbnail" src="" alt="thumbnail"/>
                            <img className="image-thumbnail" src="" alt="thumbnail"/>
                            <img className="image-thumbnail" src="" alt="thumbnail"/>
                        </div> */}
          </div>
        </div>
        <form className="item-form" method="POST" action="/cart">
          <div className="info-div">
            <h1>{selectedItem && selectedItem.title}</h1>
            <div className="info-detail-div">
              <label>price:</label>
              <p className="no-margin">
                ${selectedItem && selectedItem.price}.00
              </p>
            </div>
            <div className="info-detail-div">
              <label>quantity:</label>
              <p className="no-margin">{selectedItem && selectedItem.qty}</p>
            </div>
            <div className="info-detail-div">
              <label>info:</label>
              <p className="no-margin">{selectedItem && selectedItem.info}</p>
            </div>
            <hr className="no-margin" />
            <div className="cart-options">
              <button onClick={addToCart}>Add To Cart</button>
            </div>
          </div>
        </form>
      </div>
      <FooterC />
    </div>
  );
};

export default ItemDetailsC;
