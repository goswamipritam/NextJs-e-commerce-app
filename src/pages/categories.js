import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, fetchProductsByCategory } from '../redux/slices/productSlice';
import ProductCard from '../Component/ProductCard';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const Categories = () => {
  const dispatch = useDispatch();
  const { categories, filteredItems, status } = useSelector((state) => state.products);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    dispatch(fetchProductsByCategory(category.slug)); // Use the appropriate key for the API call
  };

  return (
    <div>
      <Typography variant="h4" style={{ margin: '20px' }}>
        Product Categories
      </Typography>
      <div style={{ display: 'flex' }}>
        <List style={{ width: '20%', marginRight: '20px' }}>
          {categories.map((category) => (
            <ListItem
              button
              key={category.slug} // Use a unique key like `slug` or `name`
              selected={category === selectedCategory}
              onClick={() => handleCategoryClick(category)}
            >
              <ListItemText primary={category.name} /> {/* Access `name` to display */}
            </ListItem>
          ))}
        </List>
        <div style={{ width: '80%' }}>
          {status === 'loading' ? (
            <Typography>Loading products...</Typography>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {filteredItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;