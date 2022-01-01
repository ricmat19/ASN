import React, { useRef, useEffect, FC, useState } from "react";
import IndexAPI from "../../../../apis/indexAPI";
import CartModalC from "../../cart/cartModal";
import AccountHeaderC from "../accountNav";
import MenuHeaderC from "../menuNav";
import FooterC from "../footer";
import { ICart } from "../../../../interfaces";
import { Grid } from "@mui/material";

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

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await IndexAPI.post("/contact", {
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
      <Grid className="main-body">
        <Grid className="center" sx={{paddingTop: "30px"}}>
          <h1>contact</h1>
        </Grid>
        <Grid className="form-div">
          <Grid className="form-container">
            <form className="contact-form" method="POST" action="/contact">
              <Grid className="subject-line">
                <label className="form-label">name</label>
                <input
                  type="text"
                  ref={nameInput}
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                  className="form-control"
                />
              </Grid>
              <Grid className="subject-line">
                <label className="form-label">email</label>
                <input
                  type="email"
                  ref={emailInput}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  className="form-control"
                  required
                />
              </Grid>
              <Grid className="subject-line">
                <label className="form-label">subject</label>
                <input
                  type="text"
                  ref={subjectInput}
                  onChange={(e) => setSubject(e.target.value)}
                  name="subject"
                  className="form-control"
                  required
                />
              </Grid>
              <Grid className="subject-line">
                <label className="form-label">message</label>
                <textarea
                  name="message"
                  ref={messageInput}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={10}
                  required
                ></textarea>
              </Grid>
              <Grid className="form-button-div text-center">
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="btn form-button"
                >
                  submit
                </button>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>
      <FooterC />
    </div>
  );
};

export default ContactC;
