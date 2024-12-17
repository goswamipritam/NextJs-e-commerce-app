import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, searchProducts, sortProducts } from '../store/productsSlice';
import ProductCard from '../components/ProductCard';
import { TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import PaginationComponent from '../components/Pagination';

const Home = () => {
  const dispatch = useDispatch();
  const { items, searchResults, sortedItems, status } = useSelector((state) => state.products);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [order, setOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 10;
  const skip = (currentPage - 1) * productsPerPage;

  useEffect(() => {
    dispatch(fetchProducts({ limit: productsPerPage, skip, select: 'title,price,thumbnail' }));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    dispatch(searchProducts(e.target.value));
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    dispatch(sortProducts({ sortBy: e.target.value, order }));
  };

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
    dispatch(sortProducts({ sortBy, order: e.target.value }));
  };

  const productsToDisplay = searchQuery
    ? searchResults
    : sortedItems.length > 0
    ? sortedItems
    : items;

  return (
    <div>
      <div style={{ display: 'flex', margin: '20px' }}>
        <TextField
          label="Search Products"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ marginRight: '20px' }}
        />
        <FormControl style={{ marginRight: '20px' }}>
          <InputLabel>Sort By</InputLabel>
          <Select value={sortBy} onChange={handleSortChange} label="Sort By">
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="price">Price</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Order</InputLabel>
          <Select value={order} onChange={handleOrderChange} label="Order">
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div>
        {status === 'loading' ? (
          <h2>Loading...</h2>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {productsToDisplay.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        <PaginationComponent
          currentPage={currentPage}
          totalPages={Math.ceil(items.length / productsPerPage)}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Home;
