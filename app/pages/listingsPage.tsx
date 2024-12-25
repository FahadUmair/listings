import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import useListings from "@/hooks/useListings";
import { Filter } from "@/interfaces/Filter";
import TopBar from "@/components/TopBar";
import FiltersModal from "@/components/FiltersModal";
import ListingsCardList from "@/components/ListingsCardList";

const ListingsPage = () => {
  const [filtersVisible, setFiltersVisible] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const {
    listings,
    loading,
    error,
    filters,
    setFilters,
    loadMore,
    hasMore,
    noResults,
  } = useListings({}, setLoadingMore);

  // For the FiltersModal
  const openFilters = () => {
    setFiltersVisible(true);
  };
  const closeFilters = () => {
    setFiltersVisible(false);
  };
  const applyFilters = (newFilters: Filter) => {
    setFilters(newFilters);
    closeFilters();
  };

  // Handle loading more listings
  const handleEndReached = useCallback(() => {
    if (!loadingMore && hasMore) {
      setLoadingMore(true);
      loadMore();
    }
  }, [loadMore, hasMore]);

  // Initial loading indication when page loads
  if (loading && listings.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.page}>
      {/* Top Bar */}
      <TopBar openFilters={openFilters} />

      {/* Filters Modal */}
      <FiltersModal
        visible={filtersVisible}
        onApplyFilters={applyFilters}
        onCancel={closeFilters}
        initialFilters={filters}
      />

      {/* Listings */}
      <ListingsCardList
        listings={listings}
        loadingMore={loadingMore}
        noResults={noResults}
        handleEndReached={handleEndReached}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ListingsPage;
