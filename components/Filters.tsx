// Import necessary dependencies and types
import { Filter } from "@/interfaces/Filter";
import React, { useEffect, useState } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

// Define props interface for the Filters component
interface FilterProps {
  onApplyFilters: (filters: Filter) => void; // Callback when filters are applied
  onCancel: () => void; // Callback when filtering is cancelled
  initialFilters: Filter; // Initial filter values
}

// Main Filters component
const Filters: React.FC<FilterProps> = ({
  onApplyFilters,
  onCancel,
  initialFilters,
}) => {
  // State for property type dropdown
  const [openPropertyType, setOpenPropertyType] = useState(false);
  const [propertyType, setPropertyType] = useState<string | null>(null);
  const [propertyTypes] = useState([
    { label: "Bungalow", value: "Bungalow" },
    { label: "Cottage", value: "Cottage" },
    { label: "2 Level", value: "2 Level" },
    { label: "Mobile Home", value: "Mobile Home" },
  ]);

  // State for bedrooms dropdown
  const [openBedrooms, setOpenBedrooms] = useState(false);
  const [bedrooms, setBedrooms] = useState<number | null>(null);
  const [bedroomOptions] = useState([
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
  ]);

  // Set initial filter values when component mounts or initialFilters change
  useEffect(() => {
    setPropertyType(initialFilters.ArchitecturalStyle || null);
    setBedrooms(initialFilters.BedroomsTotal || null);
  }, [initialFilters]);

  // Reset all filters to default values
  const clearFilters = () => {
    setPropertyType(null);
    setBedrooms(null);
    onApplyFilters({ ArchitecturalStyle: undefined, BedroomsTotal: undefined });
    onCancel();
  };

  // Apply current filter selections
  const applyFilters = () =>
    onApplyFilters({
      ArchitecturalStyle: propertyType || "",
      BedroomsTotal: bedrooms || 3,
    });

  // Close all dropdown menus
  const closeAllDropdowns = () => {
    setOpenPropertyType(false);
    setOpenBedrooms(false);
  };

  return (
    <View style={styles.container}>
      {/* Overlay to close dropdowns when clicking outside */}
      {(openPropertyType || openBedrooms) && (
        <TouchableWithoutFeedback onPress={closeAllDropdowns}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}

      <Text style={styles.title}>Filter Listings</Text>

      {/* Property Type dropdown section */}
      <View
        style={[
          styles.dropdownContainer,
          openPropertyType ? { zIndex: 1000 } : { zIndex: 1 },
        ]}
      >
        <Text style={styles.label}>Property Type:</Text>
        <DropDownPicker
          open={openPropertyType}
          value={propertyType}
          items={propertyTypes}
          setOpen={setOpenPropertyType}
          setValue={setPropertyType}
          placeholder="Select Property Type"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownMenu}
        />
      </View>

      {/* Bedrooms dropdown section */}
      <View
        style={[
          styles.dropdownContainer,
          openBedrooms ? { zIndex: 1000 } : { zIndex: 1 },
        ]}
      >
        <Text style={styles.label}>Bedrooms:</Text>
        <DropDownPicker
          open={openBedrooms}
          value={bedrooms}
          items={bedroomOptions}
          setOpen={setOpenBedrooms}
          setValue={setBedrooms}
          placeholder="Select Bedrooms"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownMenu}
        />
      </View>

      {/* Clear filters button */}
      <View style={styles.clearButtonContainer}>
        <Button
          title="Clear Filters"
          color="#585858"
          onPress={clearFilters}
        />
      </View>

      {/* Action buttons container */}
      <View style={styles.buttonContainer}>
        <Button title="Cancel" onPress={onCancel} color="#FF3B30" />
        <Button title="Apply Filters" onPress={applyFilters} />
      </View>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    position: "relative", // Creates a stacking context
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999, // Ensures overlay sits below dropdown
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 16,
  },
  dropdownContainer: {
    marginBottom: 15,
    position: "relative",
  },
  dropdown: {
    borderColor: "#ccc",
  },
  dropdownMenu: {
    borderColor: "#ccc",
  },
  clearButtonContainer: {
    marginBottom: 15,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Filters;
