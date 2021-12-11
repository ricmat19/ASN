import React, { useState, FC } from "react";
import ResetPasswordModalC from "./resetPasswordModal";
import SignInModalC from "./signinModal";
import SignUpModalC from "./signupModal";
// import CollectionAPI from "../apis/collectionAPI";

const HeaderC: FC = () => {

  // const [signinModal, setSigninModal] = useState<string>("sign-bg");
  // const [signupModal, setSignupModal] = useState<string>("sign-bg");
  // const [resetModal, setResetModal] = useState<string>("sign-bg");
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [email, ] = useState<string>("");
  const [password, ] = useState<string>("");
  const [passwordCopy, ] = useState<string>("");
  const [firstName, ] = useState<string>("");
  const [lastName, ] = useState<string>("");

  // const emailInput = useRef<HTMLInputElement>(null);
  // const passwordInput = useRef<HTMLInputElement>(null);
  // const firstNameInput = useRef<HTMLInputElement>(null);
  // const lastNameInput = useRef<HTMLInputElement>(null);
  // const passwordCopyInput = useRef<HTMLInputElement>(null);
  // const signinRef = useRef<HTMLDivElement>(null);
  // const signupRef = useRef<HTMLDivElement>(null);
  // const resetRef = useRef<HTMLDivElement>(null);

  // const displaySignin = (): void => {
  //   setSigninModal("sign-bg sign-active");
  //   setSignupModal("sign-bg");
  //   setResetModal("sign-bg");
  // };

  // const displaySignup = (): void => {
  //   setSignupModal("sign-bg sign-active");
  //   setSigninModal("sign-bg");
  //   setResetModal("sign-bg");
  // };

  // const displayReset = (): void => {
  //   setResetModal("sign-bg sign-active");
  //   setSignupModal("sign-bg");
  //   setSigninModal("sign-bg");
  // };

  // useEffect((): void => {
  //   document.addEventListener("mousedown", (event) => {
  //     if (signinRef.current !== null) {
  //       if (!signinRef.current.contains(event.target)) {
  //         setSigninModal("sign-bg");
  //       }
  //       if (!signupRef.current.contains(event.target)) {
  //         setSignupModal("sign-bg");
  //       }
  //       if (!resetRef.current.contains(event.target)) {
  //         setResetModal("sign-bg");
  //       }
  //     }
  //   });
  // }, []);

  // const handleSignin = async (e: ChangeEvent) => {
  //   e.preventDefault();
  //   try {
//       await CollectionAPI.post("/signin", {
//         email: email,
//         password: password,
//       });

//       // const request = await CollectionAPI.get("/signin", {
//       //     email: email,
//       //     password: password
//       // });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const handleSignup = async (e: ChangeEvent) => {
  //   e.preventDefault();
  //   try {
//       const response = await CollectionAPI.post("/signup", {
//         firstname: firstname,
//         lastname: lastname,
//         email: email,
//         password: password,
//         passwordCopy: passwordCopy,
//       });

//       createUser(response.data.data.user);

//       firstNameInput.current.value = "";
//       lastNameInput.current.value = "";
//       emailInput.current.value = "";
//       passwordInput.current.value = "";
//       passwordCopyInput.current.value = "";
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

//   async (e: ChangeEvent) => {
//     e.preventDefault();
//     try {
//       console.log("reset");
//     } catch (err) {
//       console.log(err);
//     }
//   };
  return (
    <header className="navbar-div">
      {/* Signin */}
      <SignInModalC 
        show={modalShow} 
        onHide={() => setModalShow(false)}
        email={email}
        password={password}
      />

      {/* signup */}
      <SignUpModalC 
        show={modalShow} 
        onHide={() => setModalShow(false)}
        firstName={firstName}
        lastName={lastName}
        email={email}
        password={password}
        passwordCopy={passwordCopy}
      />

      {/* reset */}
      <ResetPasswordModalC 
        show={modalShow} 
        onHide={() => setModalShow(false)}
      />

      <div>
        <input type="checkbox" id="nav-toggle" className="nav-toggle" />
        <label htmlFor="nav-toggle" className="nav-toggle-label">
          <a className="menu-toggle">
            <h1>menu</h1>
          </a>
        </label>
        <nav className="navbar">
          <a href="/">
            <h1>home</h1>
          </a>
          <a href="/collection/2D">
            <h1>store</h1>
          </a>
          <a href="/about">
            <h1>info</h1>
          </a>
          <a href="/contact">
            <h1>contact</h1>
          </a>
          <div>
            <h1 className="pointer" onClick={() => setModalShow(true)}>sign in</h1>
          </div>
        </nav>
      </div>
      <hr />
    </header>
  );
};

export default HeaderC;
