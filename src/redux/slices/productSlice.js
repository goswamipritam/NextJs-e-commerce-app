import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ limit, skip, select }) => {
    const query = `?limit=${limit}&skip=${skip}&select=${select}`;
    const res = await fetch(`https://dummyjson.com/products${query}`);
    const data = await res.json();
    // return data.products;
    return { products: data.products, total: data.total }; 
  }
);

export const fetchProduct = createAsyncThunk('products/fetchProduct', async (id) => {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  return res.json();
});

export const searchProducts = createAsyncThunk('products/searchProducts', async (query) => {
  const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
  const data = await res.json();
  return data.products;
});

export const sortProducts = createAsyncThunk('products/sortProducts', async ({ sortBy, order }) => {
  const res = await fetch(`https://dummyjson.com/products?sortBy=${sortBy}&order=${order}`);
  const data = await res.json();
  return data.products;
});

export const fetchCategories = createAsyncThunk('products/fetchCategories', async () => {
  const response = await fetch('https://dummyjson.com/products/categories');
  const data = await response.json();
  return data;
});

export const fetchCategoryList = createAsyncThunk('products/fetchCategoryList', async () => {
  const res = await fetch('https://dummyjson.com/products/category-list');
 
  const data = await res.json();
  return data; 
});

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (category) => {
    const res = await fetch(`https://dummyjson.com/products/category/${category}`);
    const data = await res.json();
    return data.products;
  }
);



const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    totalItems: 0,
    singleProduct: null,
    searchResults: [],
    sortedItems: [],
    categories: [],
    categoryStatus: 'idle',
    // categoryList: [],
    filteredItems: [],
    status: 'idle',
   
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
  
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload.products; // Store current products
        state.totalItems = action.payload.total;
        state.status = 'idle';
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.singleProduct = action.payload; // storing the single product
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.searchResults = action.payload;
      })
      .addCase(sortProducts.fulfilled, (state, action) => {
        state.sortedItems = action.payload;
      })
      // .addCase(fetchCategories.fulfilled, (state, action) => {
      //   state.categories = action.payload;
      // })
      
      // .addCase(fetchCategoryList.pending, (state) => {
      //   state.status = 'loading';
      // })
      // .addCase(fetchCategoryList.fulfilled, (state, action) => {
      //   state.status = 'succeeded';
      //   state.categoryList = action.payload; // Save the category list
      // })
      // .addCase(fetchCategoryList.rejected, (state) => {
      //   state.status = 'failed';
      // })
      // .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
      //   state.filteredItems = action.payload;
      // });
      .addCase(fetchCategories.pending, (state) => {
        state.categoryStatus = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoryStatus = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.categoryStatus = 'failed';
        state.error = action.error.message;
      })
      // Fetch products by category
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
      
  },
});

export default productSlice.reducer;
