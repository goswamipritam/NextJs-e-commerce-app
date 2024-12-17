import React from 'react';
import SearchResults from '../../components/SearchResults';
import { useRouter } from 'next/router';

export default function SearchPage() {
  const router = useRouter();
  const { query } = router.query;

  return <SearchResults query={query} />;
}
