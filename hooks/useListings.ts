import { useState, useEffect } from "react";
import { getListings } from "@/api/listingsApi";
import { Listing } from "@/interfaces/Listing";
import { Filter } from "@/interfaces/Filter"; 

// Hook takes initial filters and a callback for loading state
const useListings = (
  initialFilters: Filter = {},
  externalSetLoadingMore: (value: boolean) => void
) => {
  // State for managing listings data and UI state
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filter>(initialFilters);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [noResults, setNoResults] = useState<boolean>(false);

  // Fetches listings data based on current filters and page number
  const fetchListings = async (currentFilters: Filter, currentPage: number) => {
    try {
      setLoading(true);
      // Get listings with pagination (5 items per page)
      const data: Listing[] | undefined = await getListings( currentFilters, currentPage, 5);

      // Handle case when no data is returned - for displaying Alternate Card
      if (!data) {
        setNoResults(true);
        setLoading(false);
        externalSetLoadingMore(false);
        setHasMore(false);
        console.log("comes here")
        return;
      }

      // Parse data if it's a string, otherwise use as-is
      const parsedData = typeof data === "string" ? JSON.parse(data) : data;
      setNoResults(false);
      setListings((prevListings) => [...prevListings, ...parsedData]); // Append fetched listings to the previous ones
      setHasMore(data.length > 0); // If data is empty, set hasMore to false
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
      externalSetLoadingMore(false);
    }
  };

  // Reset listings and page when filters change
  useEffect(() => {
    setListings([]);
    setPage(1);
  }, [filters]);

  // Fetch listings whenever filters or page changes
  useEffect(() => {
    fetchListings(filters, page);
  }, [filters, page]);

  // Load more listings by incrementing the page number
  const loadMore = async () => {
    if (hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  return {
    listings,
    loading,
    error,
    filters,
    setFilters,
    loadMore,
    hasMore,
    noResults,
  };
};

export default useListings;
