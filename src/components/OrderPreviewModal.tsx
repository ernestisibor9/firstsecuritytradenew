import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { X } from 'lucide-react-native';

interface OrderPreviewModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  orderData: {
    symbol: string;
    action: string;
    type: string;
    qty: string;
    price: string;
  };
}

const OrderPreviewModal = ({ visible, onClose, onConfirm, orderData }: OrderPreviewModalProps) => {
  if (!visible || !orderData) return null;

  const quantity = parseInt(orderData.qty) || 0;
  const price = parseFloat(orderData.price) || 0;
  const action = orderData.action;

  // Calculation Logic matched with HTML
  const consideration = quantity * price;
  const commission = consideration * 0.0135; // 1.35%
  const vat = commission * 0.075; // 7.5% of commission
  const regulatoryFees = consideration * 0.003; // 0.3%
  const stampDuty = consideration * 0.001; // 0.1%
  const totalFees = commission + vat + regulatoryFees + stampDuty;
  
  const total = action.toLowerCase() === 'buy' 
    ? consideration + totalFees 
    : consideration - totalFees;

  const formatCurrency = (val: number) => {
    return `₦${val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Order Preview</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.body}>
            <View style={styles.row}>
              <Text style={styles.label}>Security:</Text>
              <Text style={styles.value}>{orderData.symbol}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Order Type:</Text>
              <Text style={styles.value}>{orderData.type}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Action:</Text>
              <Text style={[styles.value, { color: action.toLowerCase() === 'buy' ? '#22C55E' : '#EF4444' }]}>
                {action.toUpperCase()}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Quantity:</Text>
              <Text style={styles.value}>{quantity.toLocaleString()} units</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Price:</Text>
              <Text style={styles.value}>{orderData.type.toLowerCase() === 'market' ? 'Market Price' : formatCurrency(price)}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.row}>
              <Text style={styles.label}>Consideration:</Text>
              <Text style={styles.value}>{formatCurrency(consideration)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Commission (1.35%):</Text>
              <Text style={styles.value}>{formatCurrency(commission)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>VAT (7.5%):</Text>
              <Text style={styles.value}>{formatCurrency(vat)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Regulatory Fees (0.3%):</Text>
              <Text style={styles.value}>{formatCurrency(regulatoryFees)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Stamp Duty (0.1%):</Text>
              <Text style={styles.value}>{formatCurrency(stampDuty)}</Text>
            </View>

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>{action.toLowerCase() === 'buy' ? 'Total Cost' : 'Estimated Proceeds'}:</Text>
              <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelBtnText}>Edit Order</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmBtn} onPress={onConfirm}>
              <Text style={styles.confirmBtnText}>Confirm Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: '100%',
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0D224C',
  },
  body: {
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#6B7280',
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0D224C',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0D224C',
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    gap: 12,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  cancelBtnText: {
    color: '#374151',
    fontWeight: '600',
  },
  confirmBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#0D224C',
    alignItems: 'center',
  },
  confirmBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default OrderPreviewModal;
