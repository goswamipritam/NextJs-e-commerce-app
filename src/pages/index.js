import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchProducts,
  searchProducts,
  sortProducts,
  fetchCategories,
  fetchProductsByCategory,
} from '../redux/slices/productSlice';
import ProductCard from '../components/ProductCard';
import PaginationComponent from '../components/Pagination';
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
} from '@mui/material';

const Home = () => {
  const dispatch = useDispatch();
  const {
    items,
    totalItems,
    searchResults,
    sortedItems,
    status,
    categories,
    categoryStatus,
  } = useSelector((state) => state.products);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [order, setOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');

  const productsPerPage = 10;
  const skip = (currentPage - 1) * productsPerPage;

  // Fetch all products with pagination
  useEffect(() => {
    if (!selectedCategory) {
      dispatch(
        fetchProducts({
          limit: productsPerPage,
          skip,
          select: 'title,price,thumbnail,rating',
        })
      );
    }
  }, [dispatch, currentPage, selectedCategory]);

  // Fetch categories on mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Fetch products by selected category
  useEffect(() => {
    if (selectedCategory) {
      dispatch(fetchProductsByCategory(selectedCategory));
    }
  }, [dispatch, selectedCategory]);

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

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1); // Reset to first page on category change
  };

  const productsToDisplay = searchQuery
    ? searchResults
    : sortedItems.length > 0
    ? sortedItems
    : items;

  return (
    <div>
      <h1>Products</h1>
      <div style={{ display: 'flex', gap: '20px', margin: '20px 0' }}>
        {/* Search Input */}
        <TextField
          label="Search Products"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ flex: 1 }}
        />

        {/* Category Dropdown */}
        <FormControl style={{ minWidth: '150px' }}>
          <InputLabel>Category</InputLabel>
          {categoryStatus === 'loading' ? (
            <CircularProgress size={24} />
          ) : (
            <Select value={selectedCategory} onChange={handleCategoryChange}>
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.slug} value={category.slug}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          )}
        </FormControl>

        {/* Sort Dropdown */}
        <FormControl style={{ minWidth: '150px' }}>
          <InputLabel>Sort By</InputLabel>
          <Select value={sortBy} onChange={handleSortChange}>
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="price">Price</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
          </Select>
        </FormControl>

        {/* Order Dropdown */}
        <FormControl style={{ minWidth: '150px' }}>
          <InputLabel>Order</InputLabel>
          <Select value={order} onChange={handleOrderChange}>
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* Product Grid */}
      <div>
        {status === 'loading' ? (
          <CircularProgress />
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
            {productsToDisplay.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

    

{!searchQuery && !selectedCategory && (
        <PaginationComponent
        totalItems={totalItems} // Use the total count from API
          itemsPerPage={productsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Home;

