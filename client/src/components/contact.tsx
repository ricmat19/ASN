import React, { useRef, useEffect, FC, useState } from "react";
import CollectionAPI from "../apis/collectionAPI";
import CartModalC from "./cartModal";
import AccountHeaderC from "./standard/accountNav";
import MenuHeaderC from "./standard/menuNav";
import FooterC from "./standard/footer";
import { ICart } from "../interfaces";

const ContactC: FC = () => {
  const [, setCart] = useState<ICart[]>([]);
  const [cartState, setCartState] = useState<boolean>(false);
  const [cartQty, setCartQty] = useState<number>(0);
  const [cartCost, setCartCost] = useState<number>(0);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const nameInput = useRef<any>(null);
  const emailInput = useRef<any>(null);
  const subjectInput = useRef<any>(null);
  const messageInput = useRef<any>(null);

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
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
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
      <AccountHeaderC />
      <MenuHeaderC/>
      <div className="main-body">
        <div className="center">
          <h1>contact</h1>
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
                rows={10}
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
