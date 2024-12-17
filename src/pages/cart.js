// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { removeFromCart, clearCart, hydrateCart } from '../redux/slices/cartSlice';
// import { Button, List, ListItem, ListItemText, Typography } from '@mui/material';

// const Cart = () => {
//   const [hydrated, setHydrated] = useState(false); // Track hydration state
//   const dispatch = useDispatch();
//   const { items, totalQuantity, totalAmount } = useSelector((state) => state.cart);

//   // Hydrate Redux store from localStorage
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const storedCart = localStorage.getItem('cart');
//       if (storedCart) {
//         dispatch(hydrateCart(JSON.parse(storedCart)));
//       }
//       setHydrated(true); // Mark hydration as complete
//     }
//   }, [dispatch]);

//   if (!hydrated) {
//     // Avoid rendering mismatched content during hydration
//     return <div>Loading...</div>;
//   }

//   const handleRemoveFromCart = (productId) => {
//     dispatch(removeFromCart(productId));
//   };

//   const handleClearCart = () => {
//     dispatch(clearCart());
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <Typography variant="h4" gutterBottom>
//         Your Cart
//       </Typography>
//       <List>
//         {items.length > 0 ? (
//           items.map((item) => (
//             <ListItem key={item.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
//               <ListItemText
//                 primary={item.title}
//                 secondary={`Quantity: ${item.quantity} | Price: $${item.price.toFixed(
//                   2
//                 )} | Total: $${item.totalPrice.toFixed(2)}`}
//               />
//               <Button
//                 variant="contained"
//                 color="error"
//                 onClick={() => handleRemoveFromCart(item.id)}
//               >
//                 Remove
//               </Button>
//             </ListItem>
//           ))
//         ) : (
//           <Typography variant="body1">Your cart is empty.</Typography>
//         )}
//       </List>
//       {items.length > 0 && (
//         <div style={{ marginTop: '20px' }}>
//           <Typography variant="h6">Total Quantity: {totalQuantity}</Typography>
//           <Typography variant="h6">Total Amount: ${totalAmount.toFixed(2)}</Typography>
//           <Button variant="contained" color="secondary" onClick={handleClearCart}>
//             Clear Cart
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   removeFromCart,
//   clearCart,
//   hydrateCart,
//   increaseQuantity,
//   decreaseQuantity,
// } from '../redux/slices/cartSlice';
// import { Button, List, ListItem, ListItemText, Typography, Box } from '@mui/material';

// const Cart = () => {
//   const [hydrated, setHydrated] = useState(false); // Track hydration state
//   const dispatch = useDispatch();
//   const { items, totalQuantity, totalAmount } = useSelector((state) => state.cart);

//   // Hydrate Redux store from localStorage
//   useEffect(() => {
//     const storedCart = localStorage.getItem('cart');
//     if (storedCart) {
//       dispatch(hydrateCart(JSON.parse(storedCart)));
//     }
//     setHydrated(true); // Mark hydration as complete
//   }, [dispatch]);

//   if (!hydrated) {
//     // Avoid rendering mismatched content during hydration
//     return <div>Loading...</div>;
//   }

//   const handleIncreaseQuantity = (id) => {
//     dispatch(increaseQuantity(id));
//   };

//   const handleDecreaseQuantity = (id) => {
//     dispatch(decreaseQuantity(id));
//   };

//   const handleRemoveFromCart = (id) => {
//     dispatch(removeFromCart(id));
//   };

//   const handleClearCart = () => {
//     dispatch(clearCart());
//   };

//   return (
//     <Box sx={{ padding: '20px' }}>
//       <Typography variant="h4" gutterBottom>
//         Your Cart
//       </Typography>
//       <List>
//         {items.length > 0 ? (
//           items.map((item) => (
//             <ListItem key={item.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
//               <ListItemText
//                 primary={item.title}
//                 secondary={`Price: $${item.price.toFixed(
//                   2
//                 )} | Total: $${item.totalPrice.toFixed(2)}`}
//               />
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//                 <Button
//                   variant="contained"
//                   size="small"
//                   onClick={() => handleDecreaseQuantity(item.id)}
//                 >
//                   -
//                 </Button>
//                 <Typography>{item.quantity}</Typography>
//                 <Button
//                   variant="contained"
//                   size="small"
//                   onClick={() => handleIncreaseQuantity(item.id)}
//                 >
//                   +
//                 </Button>
//               </Box>
//               <Button
//                 variant="contained"
//                 size="small"
//                 color="error"
//                 onClick={() => handleRemoveFromCart(item.id)}
//               >
//                 Remove
//               </Button>
//             </ListItem>
//           ))
//         ) : (
//           <Typography variant="body1">Your cart is empty.</Typography>
//         )}
//       </List>
//       {items.length > 0 && (
//         <Box sx={{ marginTop: '20px' }}>
//           <Typography variant="h6">Total Quantity: {totalQuantity}</Typography>
//           <Typography variant="h6">Total Amount: ${totalAmount.toFixed(2)}</Typography>
//           <Button variant="contained" color="secondary" onClick={handleClearCart}>
//             Clear Cart
//           </Button>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default Cart;


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeFromCart,
  clearCart,
  hydrateCart,
  increaseQuantity,
  decreaseQuantity,
} from '../redux/slices/cartSlice';
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  TextField,
  Grid,
  Paper,
} from '@mui/material';

const Cart = () => {
  const [hydrated, setHydrated] = useState(false);
  const [checkoutMode, setCheckoutMode] = useState(false); // Tracks if the user is in checkout mode
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const dispatch = useDispatch();
  const { items, totalQuantity, totalAmount } = useSelector((state) => state.cart);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      dispatch(hydrateCart(JSON.parse(storedCart)));
    }
    setHydrated(true);
  }, [dispatch]);

  if (!hydrated) {
    return <div>Loading...</div>;
  }

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckout = () => {
    // Simulate order submission
    alert(
      `Order placed successfully!\nName: ${formData.name}\nEmail: ${formData.email}\nTotal Amount: $${totalAmount.toFixed(
        2
      )}`
    );
    setFormData({
      name: '',
      address: '',
      email: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    });
    setCheckoutMode(false);
    dispatch(clearCart());
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      {checkoutMode ? (
        // Checkout Form
        <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h5" gutterBottom>
            Checkout
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Card Number"
                name="cardNumber"
                type="number"
                value={formData.cardNumber}
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                label="Expiry Date"
                name="expiryDate"
                type="text"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth
                label="CVV"
                name="cvv"
                type="password"
                value={formData.cvv}
                onChange={handleFormChange}
                required
              />
            </Grid>
          </Grid>
          <Box sx={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
            <Button variant="contained" color="primary" onClick={handleCheckout} sx={{backgroundColor:'black'}}>
              Submit Order
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setCheckoutMode(false)}
              sx={{backgroundColor:'black', color:'white'}}
            >
              Cancel
            </Button>
          </Box>
        </Paper>
      ) : (
        <>
          <List>
            {items.length > 0 ? (
              items.map((item) => (
                <ListItem key={item.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <ListItemText
                    primary={item.title}
                    secondary={`Price: $${item.price.toFixed(
                      2
                    )} | Total: $${item.totalPrice.toFixed(2)}`}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleDecreaseQuantity(item.id)}
                    >
                      -
                    </Button>
                    <Typography>{item.quantity}</Typography>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleIncreaseQuantity(item.id)}
                    >
                      +
                    </Button>
                  </Box>
                  <Button
                    variant="contained"
                    size="small"
                    color="error"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    Remove
                  </Button>
                </ListItem>
              ))
            ) : (
              <Typography variant="body1">Your cart is empty.</Typography>
            )}
          </List>
          {items.length > 0 && (
            <Box sx={{ marginTop: '20px' }}>
              <Typography variant="h6">Total Quantity: {totalQuantity}</Typography>
              <Typography variant="h6">Total Amount: ${totalAmount.toFixed(2)}</Typography>
              <Box sx={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setCheckoutMode(true)}
                  sx={{backgroundColor:'black'}}
                >
                  Proceed to Checkout
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleClearCart}
                  sx={{backgroundColor:'black'}}
                >
                  Clear Cart
                </Button>
              </Box>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default Cart;




