import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../../redux/slices/productSlice';
import { useRouter } from 'next/router';
import { Card, CardContent, Typography, CardMedia, Button, CircularProgress } from '@mui/material';
import { addToCart } from '../../redux/slices/cartSlice';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { singleProduct, status } = useSelector((state) => state.products);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, [dispatch, id]);

  if (status === 'loading') {
    return <CircularProgress />;
  }

  if (!singleProduct) {
    return <Typography variant="h6">Product not found</Typography>;
  }

  return (
    <Card style={{ margin: '20px', display: 'flex' }}>
      <CardMedia
        component="img"
        height="300"
        image={singleProduct.thumbnail}
        alt={singleProduct.title}
      />
      <CardContent>
        <Typography variant="h5">{singleProduct.title}</Typography>
        <Typography variant="body1">{singleProduct.description}</Typography>
        <Typography variant="h6">${singleProduct.price}</Typography>
        <Button
          variant="contained"
          style={{ marginTop: '20px', backgroundColor:'black',color:'white' }}
          onClick={() => dispatch(addToCart(singleProduct))}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductDetails;
