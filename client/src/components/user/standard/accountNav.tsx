import React, { useState, FC } from "react";
// import SignInModalC from "../auth/signinModal";
import {
  Grid,
  Menu
} from "@mui/material";
import UserModalC from "./userModal";
import EllipseModalC from "./ellipseModal";
import NotificationModalC from "./notificationModal";

// interface IModalState {
//   open: boolean,
//   onClose: boolean,
//   show: boolean,
//   onHide: () => void,
//   email: string,
//   password: string,
// }

const AccountNavC: FC = () => {
  const [, setDisplaySignInModal] = useState<boolean>(false);
  const [signedIn] = useState<boolean>(true);
  // const [email, ] = useState<string>("");
  // const [password, ] = useState<string>("");

  const handleOpen = () => setDisplaySignInModal(true);
  // const handleClose = () => setDisplaySignInModal(false);

  const [notificationOpen, setNotificationOpen] = useState(null);
  const [userOpen, setUserOpen] = useState(null);
  const [ellipseOpen, setEllipseOpen] = useState(null);

  const openNotificaition = Boolean(notificationOpen);
  const openUser = Boolean(userOpen);
  const openEllipse = Boolean(ellipseOpen);

  const handleNotificationClick = (event: any) => {
    setNotificationOpen(event.currentTarget);
  };
  const handleUserClick = (event: any) => {
    setUserOpen(event.currentTarget);
  };
  const handleEllipseClick = (event: any) => {
    setEllipseOpen(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationOpen(null);
  };
  const handleUserClose = () => {
    setUserOpen(null);
  };
  const handleEllipseClose = () => {
    setEllipseOpen(null);
  };

  if (signedIn) {
    return (
      <header>
        <nav>

          {/* Notification menu modal */}
          <Menu
            anchorEl={notificationOpen}
            open={openNotificaition}
            onClose={handleNotificationClose}
            onClick={handleNotificationClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <NotificationModalC/>
          </Menu>

          {/* User menu modal */}
          <Menu
            anchorEl={userOpen}
            open={openUser}
            onClose={handleUserClose}
            onClick={handleUserClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <UserModalC/>
          </Menu>

          {/* Ellipse menu modal */}
          <Menu
            anchorEl={ellipseOpen}
            open={openEllipse}
            onClose={handleEllipseClose}
            onClick={handleEllipseClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <EllipseModalC/>
          </Menu>

          {/* Account Navigation */}
          <Grid container>
            <Grid xs={1} sx={{ textAlign: "center", alignSelf: "center" }}>
              <h1>logo</h1>
            </Grid>
            <Grid xs={9} container sx={{ alignContent: "center" }}>
              <Grid xs={1} sx={{ textAlign: "center", alignSelf: "center" }}>
                <h1>search</h1>
              </Grid>
              <Grid xs={11} container sx={{ pt: "10px", pb: "10px" }}>
                <input
                  type="text"
                  placeholder="test"
                  className="search-field"
                />
              </Grid>
            </Grid>
            <Grid container xs={2} sx={{ alignContent: "center" }}>
              <Grid xs={2} container sx={{ justifyContent: "center" }}>
                <h1>
                  <i
                    className="far fa-bell account-menu-icon"
                    onClick={handleNotificationClick}
                  ></i>
                </h1>
              </Grid>
              <Grid xs={2} container sx={{ justifyContent: "center" }}>
                <a href="/inbox">
                  <h1>
                    <i className="far fa-paper-plane account-menu-icon"></i>
                  </h1>
                </a>
              </Grid>
              <Grid xs={2} container sx={{ justifyContent: "center" }}>
                <a href="/collection">
                  <h1>
                    <i className="far fa-heart account-menu-icon"></i>
                  </h1>
                </a>
              </Grid>
              <Grid xs={2} container sx={{ justifyContent: "center" }}>
                <a href="/cart">
                  <h1>
                    <i className="fas fa-shopping-cart account-menu-icon"></i>
                  </h1>
                </a>
              </Grid>
              <Grid xs={2} container sx={{ justifyContent: "center" }}>
                <h1>
                  <i
                    className="fas fa-user-circle account-menu-icon"
                    onClick={handleUserClick}
                  ></i>
                </h1>
              </Grid>
              <Grid xs={2} container sx={{ justifyContent: "center" }}>
                <h1>
                  <i
                    className="fas fa-ellipsis-v"
                    onClick={handleEllipseClick}
                  ></i>
                </h1>
              </Grid>
            </Grid>
          </Grid>
        </nav>
        <hr />
      </header>
    );
  } else {
    return (
      <header>
        {/* Signin */}
        {/* <SignInModalC 
          open={displaySigninModal}
          onClose={handleClose}
          email={email}
          password={password}
        /> */}

        <nav>
          <Grid container>
            <Grid xs={1} sx={{ textAlign: "center", alignSelf: "center" }}>
              <h1>logo</h1>
            </Grid>
            <Grid xs={9} container sx={{ alignContent: "center" }}>
              <Grid xs={1} sx={{ textAlign: "center", alignSelf: "center" }}>
                <h1>search</h1>
              </Grid>
              <Grid xs={11} container sx={{ pt: "10px", pb: "10px" }}>
                <input
                  type="text"
                  placeholder="test"
                  className="search-field"
                />
              </Grid>
            </Grid>
            <Grid container xs={2} sx={{ alignContent: "center" }}>
              <Grid
                xs={2}
                container
                sx={{ justifyContent: "center", alignSelf: "center" }}
              >
                <a href="/cart">
                  <i className="fas fa-shopping-cart account-menu-icon"></i>
                </a>
              </Grid>
              <Grid xs={5} container sx={{ justifyContent: "center" }}>
                <h2 className="pointer" onClick={() => handleOpen}>
                  sign up
                </h2>
              </Grid>
              <Grid xs={5} container sx={{ justifyContent: "center" }}>
                <h2 className="pointer" onClick={() => handleOpen}>
                  sign in
                </h2>
              </Grid>
            </Grid>
          </Grid>
        </nav>
        <hr />
      </header>
    );
  }
};

export default AccountNavC;
