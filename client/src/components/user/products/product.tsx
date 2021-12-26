import React, { useEffect, FC, useState } from "react";
import { useParams } from "react-router";
import IndexAPI from "../../../apis/indexAPI";
import CartModalC from "../cart/cartModal";
import AccountHeaderC from "../standard/accountNav";
import MenuHeaderC from "../standard/menuNav";
import FooterC from "../standard/footer";
import { ICart, IProduct } from "../../../interfaces";

const ProductC: FC = () => {
  const { product, id } = useParams();

  const [, setCart] = useState<ICart[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProduct[]>([]);
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [qty, setQty] = useState<number>(0);
  const [info, setInfo] = useState<string>("");
  const [cartState, setCartState] = useState<boolean>(false);
  const [cartQty, setCartQty] = useState<number>(0);
  const [cartCost, setCartCost] = useState<number>(0);
  const [imageBuffer, setImageBuffer] = useState("");

  useEffect((): void => {
    const fetchData = async () => {
      try {
        const productResponse = await IndexAPI.get(
          `/products/${product}/${id}`
        );

        if (productResponse.data.data.product.imagekey !== null) {
          let imagesResponse = await IndexAPI.get(
            `/images/${productResponse.data.data.product.imagekey}`,
            {
              responseType: "arraybuffer",
            }
          ).then((response) =>
            Buffer.from(response.data, "binary").toString("base64")
          );

          setImageBuffer(`data:image/png;base64,${imagesResponse}`);
        }
        setSelectedProduct(productResponse.data.data.product)
        setTitle(productResponse.data.data.product.title);
        setPrice(productResponse.data.data.product.price);
        setQty(productResponse.data.data.product.qty);
        setInfo(productResponse.data.data.product.info);

        const cartResponse = await IndexAPI.get(`/cart`);
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
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const addToCart = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await IndexAPI.post("/cart", {
        id: id,
      });

      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addToCollection = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await IndexAPI.post("/collection", {
        id: id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // const imageURL = async (imagekey: string) =>{

  //     const imagesResponse = await IndexAPI.get(`/images/${imagekey}`, {
  //         responseType: 'arraybuffer'
  //     })
  //     .then(response => Buffer.from(response.data, 'binary').toString('base64'))
  //     // setImages(imagesResponse);
  // }

    // onChange={imageURL(selectedItem.imagekey)}

  return (
    <div>
      <CartModalC cartState={cartState} cartQty={cartQty} cartCost={cartCost} />
      <AccountHeaderC />
      <MenuHeaderC/>
      <div className="main-body item-details">
        <div className="item-images">
          <div className="image-div">
            <div className="big-image-div">
              <img className="big-image" src={imageBuffer} alt="main" />
            </div>
          </div>
        </div>
        <form className="item-form" method="POST" action="/cart">
          <div className="info-div">
            <h1>{selectedProduct && title}</h1>
            <div className="info-detail-div">
              <label>price:</label>
              <p className="no-margin">
                ${selectedProduct && price}.00
              </p>
            </div>
            <div className="info-detail-div">
              <label>quantity:</label>
              <p className="no-margin">{selectedProduct && qty}</p>
            </div>
            <div className="info-detail-div">
              <label>info:</label>
              <p className="no-margin">{selectedProduct && info}</p>
            </div>
            <hr className="no-margin" />
            <div className="cart-options">
              <button onClick={addToCart}>Add To Cart</button>
              <button onClick={addToCollection}><i className="far fa-heart"></i></button>
            </div>
          </div>
        </form>
      </div>
      <FooterC />
    </div>
  );
};

export default ProductC;
