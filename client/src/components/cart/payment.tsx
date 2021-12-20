import React, { FC, useEffect, useState } from "react";
import OrderSummaryC from "./orderSummary";
import AccountHeaderC from "../standard/accountNav";
import MenuHeaderC from "../standard/menuNav";
import FooterC from "../standard/footer";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CollectionAPI from "../../apis/storeAPI";
import Paypal from "./paypal";
import { ICart } from "../../interfaces";

const PaymentC: FC = () => {
  const stripe: any = useStripe();
  const elements: any = useElements();

  const [cart, setCart] = useState<ICart[]>([]);
  const [cartPrices, setCartPrices] = useState<number[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [zipcode, setZipcode] = useState<string>("");

  let cartPriceArray: number[] = [];
  let sub = 0;
  useEffect((): void => {
    const fetchData = async () => {
      try {
        const cartResponse = await CollectionAPI.get(`/cart`);

        for (let i = 0; i < cartResponse.data.data.cart.length; i++) {
          if(cartResponse.data.data.qty[i] === null){
            cartResponse.data.data.qty[i] = 0;
          }
          let itemSummaryPrice: number =
            cartResponse.data.data.cart[i].price *
            cartResponse.data.data.qty[i];
          cartPriceArray.push(itemSummaryPrice);
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

        setCartPrices(cartPriceArray);

        sub = cartPriceArray.reduce(function (a, b): number {
          return a + b;
        }, 0);
        setSubtotal(sub);

        setCart(cartResponse.data.data.cart);

        const shipmentResponse = await CollectionAPI.get(`/shipment`);
        setEmail(shipmentResponse.data.data.shipment.rows[0].email)
        setAddress(shipmentResponse.data.data.shipment.rows[0].address)
        setCity(shipmentResponse.data.data.shipment.rows[0].city)
        setState(shipmentResponse.data.data.shipment.rows[0].state)
        setZipcode(shipmentResponse.data.data.shipment.rows[0].zipcode)

      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await CollectionAPI.post(`/payment`, {
          amount: 1000,
          id: id,
        });

        if (response.data.success) {
          console.log("Successful payment!");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log(error);
    }
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
      <AccountHeaderC />
      <MenuHeaderC/>
      <div className="main-body payment-div">
        <div className="payment-selection-div">
          <div className="payment-info-div">
            <div className="payment-info">
              <p className="align-left">contact</p>
              <p className="align-left">{email}</p>
              <a className="align-right" href="/checkout">
                <p>change</p>
              </a>
            </div>
            <hr className="payment-hr" />
            <div className="payment-info">
              <p className="align-left">ship to</p>
              <p className="align-left">
                {address} {city}, {state}{" "}
                {zipcode}
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
                  <Paypal/>
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
      </div>
      <FooterC />
    </div>
  );
};

export default PaymentC;
