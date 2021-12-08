import React, { useState, useRef, useEffect } from "react";
import CollectionAPI from "../apis/collectionAPI";
import CartModalC from "./cartModal";
import HeaderC from "./header";
import FooterC from "./footer";

const ContactC = () => {
  const [, setCart] = useState([]);
  const [cartState, setCartState] = useState(false);
  const [cartQty, setCartQty] = useState(0);
  const [cartCost, setCartCost] = useState(0);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const nameInput = useRef(null);
  const emailInput = useRef(null);
  const subjectInput = useRef(null);
  const messageInput = useRef(null);

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
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await CollectionAPI.post("/contact", {
        name: name,
        email: email,
        subject: subject,
        message: message,
      });

      nameInput.current.value = "";
      emailInput.current.value = "";
      subjectInput.current.value = "";
      messageInput.current.value = "";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <CartModalC cartState={cartState} cartQty={cartQty} cartCost={cartCost} />
      <HeaderC />
      <div className="main-body">
        <div className="center">
          <p className="title">contact</p>
        </div>
        <div className="form-div">
          <form className="contact-form" method="POST" action="/contact">
            <div className="subject-line">
              <label className="form-label">name</label>
              <input
                type="text"
                ref={nameInput}
                onChange={(e) => setName(e.target.value)}
                name="name"
                className="form-control"
              />
            </div>
            <div className="subject-line">
              <label className="form-label">email</label>
              <input
                type="email"
                ref={emailInput}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                className="form-control"
                required
              />
            </div>
            <div className="subject-line">
              <label className="form-label">subject</label>
              <input
                type="text"
                ref={subjectInput}
                onChange={(e) => setSubject(e.target.value)}
                name="subject"
                className="form-control"
                required
              />
            </div>
            <div className="subject-line">
              <label className="form-label">message</label>
              <textarea
                name="message"
                ref={messageInput}
                onChange={(e) => setMessage(e.target.value)}
                rows="10"
                required
              ></textarea>
            </div>
            <div className="form-button-div text-center">
              <button
                onClick={handleSubmit}
                type="submit"
                className="btn form-button"
              >
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <FooterC />
    </div>
  );
};

export default ContactC;
