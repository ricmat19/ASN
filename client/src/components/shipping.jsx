import React, { useEffect, useState } from "react";
import OrderSummaryC from "./orderSummary";
import HeaderC from "./header";
import FooterC from "./footer";
import CollectionAPI from "../apis/collectionAPI";

const ShippingC = () => {
  const [cart, setCart] = useState([]);
  const [cartPrices, setCartPrices] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shipment, setShipment] = useState([]);

  let cartPriceArray = [];
  let sub = 0;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartResponse = await CollectionAPI.get(`/cart`);

        for (let i = 0; i < cartResponse.data.data.cart.length; i++) {
          let itemSummaryPrice =
            cartResponse.data.data.cart[i].price *
            cartResponse.data.data.qty[i];
          cartPriceArray.push(parseInt(itemSummaryPrice));
        }

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

        const shipmentResponse = await CollectionAPI.get(`/shipment`);

        setCartPrices(cartPriceArray);

        sub = cartPriceArray.reduce(function (a, b) {
          return a + b;
        }, 0);
        setSubtotal(sub);

        setCart(cartResponse.data.data.cart);
        setShipment(shipmentResponse.data.data.shipment.rows[0]);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <HeaderC />
      <div className="main-body shipping-div">
        <div className="shipping-selection-div">
          <div className="shipping-info-div">
            <div className="shipping-info">
              <p className="align-left">contact</p>
              <p className="align-left">{shipment.email}</p>
              <a className="align-right" href="">
                <p>change</p>
              </a>
            </div>
            <hr className="shipping-hr" />
            <div className="shipping-info">
              <p className="align-left">ship to</p>
              <p className="align-left">
                {shipment.address} {shipment.city}, {shipment.state}{" "}
                {shipment.zipcode}
              </p>
              <a className="align-right" href="">
                <p>change</p>
              </a>
            </div>
          </div>

          <div className="shipping-method-selection-div">
            <p>shipping method</p>
            <div className="shipping-options-div">
              <div className="shipping-option">
                <input
                  className="align-left"
                  type="radio"
                  name="shipping-method"
                />
                <label className="align-left">
                  first class (3-7 business days)
                </label>
                <p className="align-right">$0.00</p>
              </div>
              <hr className="shipping-hr" />
              <div className="shipping-option">
                <input
                  className="align-left"
                  type="radio"
                  name="shipping-method"
                />
                <label className="align-left">
                  priority mail (1-3 business days)
                </label>
                <p className="align-right">$0.00</p>
              </div>
            </div>
          </div>
          <div className="two-column-div shipping-button">
            <button>
              <a href="/payment">continue to payment</a>
            </button>
            <a href="/checkout">
              <p>return to information</p>
            </a>
          </div>
        </div>
        <div className="order-summary">
          <div>
            <OrderSummaryC
              cartCollection={cart}
              cartPrices={cartPrices}
              subtotal={subtotal}
            />
          </div>
          <div className="two-column-div checkout-discount">
            <input type="text" placeholder="discount code" />
            <button>apply</button>
          </div>
        </div>
      </div>
      <FooterC />
    </div>
  );
};

export default ShippingC;
