import React, { FC, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderSummaryC from "./orderSummary";
import AccountHeaderC from "../standard/accountNav";
import MenuHeaderC from "../standard/menuNav";
import FooterC from "../standard/footer";
import IndexAPI from "../../../apis/indexAPI";
import { ICart, ICheckout } from "../../../interfaces";

const CheckoutC: FC = () => {
  const [cart, setCart] = useState<ICart[]>([]);
  const [cartPrices, setCartPrices] = useState<number[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [, setCheckOut] = useState<ICheckout[]>([]);

  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [suite, setSuite] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [phone, setPhone] = useState("");

  const emailInput = useRef(null);
  const firstNameInput = useRef(null);
  const lastNameInput = useRef(null);
  const addressInput = useRef(null);
  const suiteInput = useRef(null);
  const cityInput = useRef(null);
  const stateInput = useRef(null);
  const zipcodeInput = useRef(null);
  const phoneInput = useRef(null);

  let cartPriceArray: number[] = [];
  let sub = 0;
  
  useEffect((): void => {
    const fetchData = async () => {
      try {
        const cartResponse = await IndexAPI.get(`/cart`);

        console.log(cartResponse.data.data.cart[0].price)
        console.log(cartResponse.data.data.qty)
        for (let i = 0; i < cartResponse.data.data.cart.length; i++) {
          if(cartResponse.data.data.qty[i] === null){
            cartResponse.data.data.qty[i] = 0;
          }
          let itemSummaryPrice =
            cartResponse.data.data.cart[i].price *
            cartResponse.data.data.qty[i];
          cartPriceArray.push(itemSummaryPrice);
        }

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

        setCartPrices(cartPriceArray);

        sub = cartPriceArray.reduce(function (a, b): number {
          return a + b;
        }, 0);
        setSubtotal(sub);

        setCart(cartResponse.data.data.cart);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  let navigation = useNavigate();

  const handleCheckout = async (e: any) => {
    e.preventDefault();
    try {
      const response = await IndexAPI.post("/shipment", {
        email: email,
        firstname: firstname,
        lastname: lastname,
        address: address,
        suite: suite,
        city: city,
        state: state,
        zipcode: zipcode,
        phone: phone,
      });

      setCheckOut(response.data.data.newAddress);

      navigation(`/shipping`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <AccountHeaderC />
      <MenuHeaderC/>
      <div className="main-body checkout-div">
        <form className="checkout-info" method="POST">
          <h1>express checkout</h1>
          <div className="express-checkout-button-div">
            <button>PayPal</button>
          </div>
          <hr className="checkout-hr" />
          <h1>checkout</h1>
          <div>
            <div className="grid">
              <div className="checkout-email-div">
                <input
                  type="email"
                  ref={emailInput}
                  value={email}
                  name="email"
                  placeholder="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="two-column-div">
                <input
                  type="text"
                  ref={firstNameInput}
                  value={firstname}
                  name="firstname"
                  placeholder="First Name"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
                <input
                  type="text"
                  ref={lastNameInput}
                  value={lastname}
                  name="lastname"
                  placeholder="Last Name"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>
              <div className="checkout-address-div">
                <input
                  type="text"
                  ref={addressInput}
                  value={address}
                  name="address"
                  placeholder="Address"
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </div>
              <div className="checkout-suite-div">
                <input
                  type="text"
                  ref={suiteInput}
                  value={suite}
                  name="suite"
                  placeholder="apartment, suite, etc. (optional)"
                  onChange={(e) => {
                    setSuite(e.target.value);
                  }}
                />
              </div>
              <div className="three-column-div">
                <input
                  type="text"
                  ref={cityInput}
                  value={city}
                  name="city"
                  placeholder="city"
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                />
                <select
                  ref={stateInput}
                  value={state}
                  name="state"
                  placeholder="state"
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                >
                  <option>Alabama</option>
                  <option>Alaska</option>
                  <option>Arizona</option>
                  <option>Arkansas</option>
                  <option>California</option>
                  <option>Colorado</option>
                  <option>Connecticut</option>
                  <option>Delaware</option>
                  <option>Florida</option>
                  <option>Georgia</option>
                  <option>Hawaii</option>
                  <option>Idaho</option>
                  <option>Illinois</option>
                  <option>Indiana</option>
                  <option>Iowa</option>
                  <option>Kansas</option>
                  <option>Kentucky</option>
                  <option>Louisiana</option>
                  <option>Maine</option>
                  <option>Maryland</option>
                  <option>Massachusetts</option>
                  <option>Michigan</option>
                  <option>Minnesota</option>
                  <option>Mississippi</option>
                  <option>Missouri</option>
                  <option>Montana</option>
                  <option>Nebraska</option>
                  <option>Nevada</option>
                  <option>New Hampshire</option>
                  <option>New Jersey</option>
                  <option>New Mexico</option>
                  <option>New York</option>
                  <option>North Carolina</option>
                  <option>North Dakota</option>
                  <option>Ohio</option>
                  <option>Oklahoma</option>
                  <option>Oregon</option>
                  <option>Pennsylvania</option>
                  <option>Rhode Island</option>
                  <option>South Carolina</option>
                  <option>South Dakota</option>
                  <option>Tennessee</option>
                  <option>Texas</option>
                  <option>Utah</option>
                  <option>Vermont</option>
                  <option>Virginia</option>
                  <option>Washington</option>
                  <option>West Virginia</option>
                  <option>Wisconsin</option>
                  <option>Wyoming</option>
                </select>
                <input
                  type="number"
                  ref={zipcodeInput}
                  value={zipcode}
                  name="zipcode"
                  placeholder="ZIP code"
                  onChange={(e) => {
                    setZipcode(e.target.value);
                  }}
                />
              </div>
              <div className="checkout-phone-div">
                <input
                  type="tel"
                  ref={phoneInput}
                  value={phone}
                  name="phone"
                  placeholder="phone (optional)"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </div>
              <div className="two-column-div">
                <button onClick={handleCheckout}>continue to shipping</button>
                <a href="/cart">
                  <p>return to cart</p>
                </a>
              </div>
            </div>
          </div>
        </form>
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

export default CheckoutC;
