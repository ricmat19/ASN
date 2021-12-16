import React, { useState, FC } from "react";
import SignInModalC from "../signinModal";
import { Grid, Menu, Avatar, Divider, MenuItem, ListItemIcon } from '@mui/material';

const AccountHeaderC: FC = () => {

  const [displaySigninModal, setDisplaySignInModal] = useState<boolean>(false);
  const [signedIn,] = useState<boolean>(true);
  const [email, ] = useState<string>("");
  const [password, ] = useState<string>("");

  const handleOpen = () => setDisplaySignInModal(true);
  const handleClose = () => setDisplaySignInModal(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleAccountMenuClose = () => {
    setAnchorEl(null);
  };

  if(signedIn){
    return (
      <header>  
        <nav>
          <Grid container>
            <Grid xs={1} sx={{textAlign: 'center', alignSelf: "center"}}>
              <label className="example-logo">Logo</label>
            </Grid>
            <Grid xs={9} container sx={{alignContent: "center"}}>
              <Grid xs={1} sx={{ textAlign: 'center', alignSelf: "center"}}>
                <label>Search</label>
              </Grid>
              <Grid xs={11} container>
                <input type="text" placeholder="test" className="search-field test-border"/>
              </Grid>
            </Grid>
            <Grid container xs={2} sx={{alignContent: "center"}}>
              <Grid xs={2} sx={{ textAlign: 'center', alignSelf: "center"}}>
                <h1><i className="far fa-bell account-menu-icon"></i></h1>
              </Grid>
              <Grid xs={2} sx={{ textAlign: 'center', alignSelf: "center" }}>
                <h1><i className="far fa-paper-plane account-menu-icon"></i></h1>
              </Grid>
              <Grid xs={2} sx={{ textAlign: 'center', alignSelf: "center" }}>
                <h1><i className="far fa-heart account-menu-icon"></i></h1>
              </Grid>
              <Grid xs={2} sx={{ textAlign: 'center', alignSelf: "center" }}>
                <h1><i className="fas fa-shopping-cart account-menu-icon"></i></h1>
              </Grid>
              <Grid xs={3} sx={{ textAlign: 'center', alignSelf: "center" }}>
                <h1><i className="fas fa-user-circle account-menu-icon" onClick={handleClick}></i></h1>
              </Grid>
              <Grid xs={1} sx={{ textAlign: 'center', alignSelf: "center" }}>
                <h1><i className="fas fa-ellipsis-v" onClick={handleClick}></i></h1>
              </Grid>
            </Grid>
          </Grid>
          <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleAccountMenuClose}
          onClick={handleAccountMenuClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem>
            <Avatar /> Profile
          </MenuItem>
          <MenuItem>
            <Avatar /> My account
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <i className="fas fa-cog account-menu-icon"></i>
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <i className="fas fa-sign-out-alt account-menu-icon"></i>
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
        </nav>
        <hr/>
      </header>
    );
  }else{
    return(
      <header>
  
        {/* Signin */}
        <SignInModalC 
          open={displaySigninModal}
          onClose={handleClose}
          email={email}
          password={password}
        />
  
        <nav>
          <Grid container>
            <Grid xs={1} sx={{textAlign: 'center', alignSelf: "center"}}>
              <label className="example-logo">Logo</label>
            </Grid>
            <Grid xs={9} container sx={{alignContent: "center"}}>
              <Grid xs={1} sx={{ textAlign: 'center', alignSelf: "center"}}>
                <label>Search</label>
              </Grid>
              <Grid xs={11} container>
                <input type="text" placeholder="test" className="search-field test-border"/>
              </Grid>
            </Grid>
            <Grid container xs={2} sx={{alignContent: "center"}}>
              <Grid xs={4} sx={{ textAlign: 'center', alignSelf: "center" }}>
                <i className="fas fa-shopping-cart account-menu-icon"></i>
              </Grid>
              <Grid xs={4} sx={{ textAlign: 'center', alignSelf: "center" }}>
                <h1 className="pointer" onClick={() => handleOpen}>sign up</h1>
              </Grid>
              <Grid xs={4} container>
                <Grid xs={2} sx={{ textAlign: 'center', alignSelf: "center" }}>
                  <i className="fas fa-sign-out-alt"></i>
                </Grid>
                <Grid xs={10} sx={{ textAlign: 'center', alignSelf: "center" }}>
                  <h1 className="pointer" onClick={() => handleOpen}>sign in</h1>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </nav>
        <hr/>
      </header>
    );
  }

};

export default AccountHeaderC;
