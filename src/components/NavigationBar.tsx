import React, { useContext, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import blueGrey from '@material-ui/core/colors/blueGrey';
import { providerTwitter } from '../firebase';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AuthContext from '../contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  progress: {
    color: blueGrey[50],
  },
}));

const NavigationBar = () => {
  const { info, login, logout } = useContext(AuthContext);
  const classes = useStyles();

  const [anchorElLogin, setanchorElLogin] = useState<null | HTMLElement>(null);
  const openLoginMenu = Boolean(anchorElLogin);

  const handleLoginMenu = (event: React.MouseEvent<HTMLElement>) => {
    setanchorElLogin(event.currentTarget);
  };

  const handleLoginClose = () => {
    setanchorElLogin(null);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            RTA Charts builder
          </Typography>
          {!info.isLoaded && (
            <div>
              <CircularProgress className={classes.progress} aria-controls="menu-appbar" />
            </div>
          )}
          {info.isLoaded && info.currentUser && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={logout}>ログアウト</MenuItem>
              </Menu>
            </div>
          )}
          {info.isLoaded && info.currentUser == null && (
            <div>
              <Button color="inherit" onClick={handleLoginMenu}>
                ログイン
              </Button>
              <Menu
                id="menu-login"
                anchorEl={anchorElLogin}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={openLoginMenu}
                onClose={handleLoginClose}
              >
                <MenuItem onClick={() => login(providerTwitter)}>Twitterでログイン</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavigationBar;
