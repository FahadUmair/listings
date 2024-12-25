import React from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import Filters from '@/components/Filters';
import { Filter } from '@/interfaces/Filter';

interface FiltersModalProps {
  visible: boolean;
  onApplyFilters: (newFilters: Filter) => void;
  onCancel: () => void;
  initialFilters: Filter;
}

const FiltersModal: React.FC<FiltersModalProps> = ({
  visible,
  onApplyFilters,
  onCancel,
  initialFilters,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Filters
            onApplyFilters={onApplyFilters}
            onCancel={onCancel}
            initialFilters={initialFilters}
          />
        </View>
      </View>
    </Modal>
  );
};

export default FiltersModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
});