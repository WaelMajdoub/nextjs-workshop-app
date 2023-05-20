import React from 'react';
import { useRouter } from 'next/router';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LockIcon from '@mui/icons-material/Lock';
import PeopleIcon from '@mui/icons-material/People';
import StoreIcon from '@mui/icons-material/Store';
import { useMediaQuery } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAuth } from '@/context/AuthContext';

function Navbar() {
  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();

  const handleHomeClick = () => {
    router.push('/');
  };

  const handleProductsClick = () => {
    router.push('/admin/products/');
  };

  const handleLoginClick = () => {
    router.push('/login');
  };

  const handleShopClick = () => {
    router.push('/shop');
  };

  const handleClientsClick = () => {
    router.push('/clients');
  };

  const handleLogoutClick = () => {
    logout();
    router.push('/login');
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isSmallScreen = useMediaQuery((theme: any) => theme.breakpoints.down('md'));

  return (
    <AppBar position="static" sx={{ backgroundColor: '#424272' }}>
      <Toolbar>
        {isSmallScreen ? (
          <>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuClick}>
              <MenuIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={() => {
                handleMenuClose();
                handleHomeClick();
              }}>
                <HomeIcon /> Home
              </MenuItem>
              <MenuItem onClick={() => {
                handleMenuClose();
                handleProductsClick();
              }}>
                <StoreIcon /> Products
              </MenuItem>
              {isLoggedIn ? (
                <>
                  <MenuItem onClick={() => {
                    handleMenuClose();
                    handleLogoutClick();
                  }}>
                    <LockIcon /> Logout
                  </MenuItem>
                  <MenuItem onClick={() => {
                    handleMenuClose();
                    handleShopClick();
                  }}>
                    <ShoppingBasketIcon /> Shop
                  </MenuItem>
                  <MenuItem onClick={() => {
                    handleMenuClose();
                    handleClientsClick();
                  }}>
                    <PeopleIcon /> Client Management
                  </MenuItem>
                </>
              ) : (
                <MenuItem onClick={() => {
                  handleMenuClose();
                  handleLoginClick();
                }}>
                  <LockIcon /> Login
                </MenuItem>
              )}
            </Menu>
          </>
        ) : (
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Website
          </Typography>
        )}
        {!isSmallScreen && (
          <>
            <Button color="inherit" startIcon={<HomeIcon />} onClick={handleHomeClick}>
              Home
            </Button>
            <Button color="inherit" startIcon={<StoreIcon />} onClick={handleProductsClick}>
              Products
            </Button>
            {isLoggedIn ? (
              <>
                <Button color="inherit" startIcon={<LockIcon />} onClick={handleLogoutClick}>
                  Logout
                </Button>
                <Button color="inherit" startIcon={<ShoppingBasketIcon />} onClick={handleShopClick}>
                  Shop
                </Button>
                <Button color="inherit" startIcon={<PeopleIcon />} onClick={handleClientsClick}>
                  Client Management
                </Button>
              </>
            ) : (
              <Button color="inherit" startIcon={<LockIcon />} onClick={handleLoginClick}>
                Login
              </Button>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
