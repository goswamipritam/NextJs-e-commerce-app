import React from 'react';
import { Pagination } from '@mui/material';

const PaginationComponent = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <Pagination
      count={totalPages}
      page={currentPage}
      onChange={(event, page) => onPageChange(page)}
      color='primary'
    />
  );
};

export default PaginationComponent;
