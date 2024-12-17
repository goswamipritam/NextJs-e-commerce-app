import React from 'react';
import { AppBar, Toolbar, Typography, Button, Badge } from '@mui/material';
import { useSelector } from 'react-redux';
import Link from 'next/link';

const Navbar = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  return (
    <AppBar position="static" sx={{backgroundColor:'black', color:'white'}}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          E-Commerce
        </Typography>
        <Button color="inherit" component={Link} href="/">
          Home
        </Button>
        <Button color="inherit" component={Link} href="/cart">
        <Badge badgeContent={totalQuantity} color="error">
          Cart
          </Badge>
          
        </Button>
        <Button color="inherit" component={Link} href="/product/category">
          Categories
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
