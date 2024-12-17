import React from 'react';
import { Card, CardContent, Typography, CardMedia, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <Card style={{ margin: '20px' }}>
      <CardMedia component="img" height="140" image={product.thumbnail} alt={product.title} />
      <CardContent>
        <Typography variant="h6">{product.title}</Typography>
        <Typography variant="body2">${product.price}</Typography>
        <Button variant="contained" sx={{mt: 2,mr:1, color:'white', backgroundColor:'black',fontFamily:'poppins'}} onClick={handleAddToCart}>
          Add to Cart
        </Button>
        <Button
          variant="contained"
          style={{ marginTop: '12px', color:'white', backgroundColor:'black', fontFamily:'poppins' }}
          component={Link}
          href={`/product/${product.id}`}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
