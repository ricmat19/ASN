import React, { ChangeEvent, FC, useEffect, useState } from "react";
import OrderSummaryC from "./orderSummary";
import HeaderC from "./header";
import FooterC from "./footer";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CollectionAPI from "../apis/collectionAPI";
import Paypal from "./paypalComponent";
// import { Cart } from "../interfaces";

const PaymentC: FC = () => {
  const stripe = useStripe();
  const elements = useElements();

  // const [cart, setCart] = useState<Cart[]>([]);
  const [cartPrices, setCartPrices] = useState<number[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  // const [shipment, setShipment] = useState([]);

  let cartPriceArray: number[] = [];
  let sub = 0;
  useEffect((): void => {
    const fetchData = async () => {
      try {
//         const cartResponse = await CollectionAPI.get(`/cart`);

//         for (let i = 0; i < cartResponse.data.data.cart.length; i++) {
//           let itemSummaryPrice: number =
//             cartResponse.data.data.cart[i].price *
//             cartResponse.data.data.qty[i];
//           cartPriceArray.push(itemSummaryPrice);
//         }

//         for (let i = 0; i < cartResponse.data.data.cart.length; i++) {
//           if (cartResponse.data.data.cart[i].imagekey !== null) {
//             let imagesResponse = await CollectionAPI.get(
//               `/images/${cartResponse.data.data.cart[i].imagekey}`,
//               {
//                 responseType: "arraybuffer",
//               }
//             ).then((response) =>
//               Buffer.from(response.data, "binary").toString("base64")
//             );

//             cartResponse.data.data.cart[i].imageBuffer = imagesResponse;
//           }
//         }

//         const shipmentResponse = await CollectionAPI.get(`/shipment`);

//         setCartPrices(cartPriceArray);

//         sub = cartPriceArray.reduce(function (a, b): number {
//           return a + b;
//         }, 0);
//         setSubtotal(sub);

//         setCart(cartResponse.data.data.cart);
//         setShipment(shipmentResponse.data.data.shipment.rows[0]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: ChangeEvent) => {
    e.preventDefault();
//     const { err, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card: elements.getElement(CardElement),
//     });

    // if (!err) {
      try {
//         const { id } = paymentMethod;
//         const response = await CollectionAPI.post(`/payment`, {
//           amount: 1000,
//           id: id,
//         });

//         if (response.data.success) {
//           console.log("Successful payment!");
//         }
      } catch (err) {
        console.log(err);
      }
    // } else {
    //   console.log(err);
    // }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontFamily: "Rajdhani",
      },
    },
    hidePostalCode: true,
  };

  return (
    <div>
      <HeaderC />
      {/* <div className="main-body payment-div">
        <div className="payment-selection-div">
          <div className="payment-info-div">
            <div className="payment-info">
              <p className="align-left">contact</p>
              <p className="align-left">{shipment.email}</p>
              <a className="align-right" href="/checkout">
                <p>change</p>
              </a>
            </div>
            <hr className="payment-hr" />
            <div className="payment-info">
              <p className="align-left">ship to</p>
              <p className="align-left">
                {shipment.address} {shipment.city}, {shipment.state}{" "}
                {shipment.zipcode}
              </p>
              <a className="align-right" href="/checkout">
                <p>change</p>
              </a>
            </div>
            <hr className="payment-hr" />
            <div className="payment-info">
              <p className="align-left">method</p>
              <p className="align-left">first class (3-7 days) - $0.00</p>
              <a className="align-right" href="/shipping">
                <p>change</p>
              </a>
            </div>
          </div>

          <div className="payment-method-selection-div">
            <p>payment method</p>
            <div className="payment-options-div">
              <div className="payment-option">
                <input
                  className="align-left"
                  type="radio"
                  name="payment-method"
                />
                <label className="align-left">Credit Card</label>
              </div>
              <div className="payment-info-input-div">
                <form
                  className="credit-card-form"
                  method="POST"
                  onSubmit={handleSubmit}
                >
                  <div className="grid payment-input">
                    <CardElement
                      className="cardElement"
                      options={cardElementOptions}
                    />
                  </div>
                  <div className="grid payment-input">
                    <input type="text" placeholder="name on card" />
                  </div>
                  <div className="credit-card-option">
                    <button className="payment-button" type="submit">
                      continue to payment
                    </button>
                  </div>
                </form>
                <hr className="payment-hr" />
                <div className="payment-option">
                  <input
                    className="align-left"
                    type="radio"
                    name="payment-method"
                  />
                  <label className="align-left">PayPal</label>
                  <Paypal className="payment-button" />
                </div>
                <hr className="payment-hr" />
                <div className="payment-option">
                    <input className="align-left" type="radio" name="payment-method"/>
                    <label className="align-left">Amazon Pay</label>
                </div>
              </div>
            </div>
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
      </div> */}
      <FooterC />
    </div>
  );
};

export default PaymentC;
