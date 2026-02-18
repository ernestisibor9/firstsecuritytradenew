import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, StatusBar, Platform } from 'react-native';
import { X, Share2, Printer } from 'lucide-react-native';

interface TransactionDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  transaction: any;
}

const TransactionDetailsModal: React.FC<TransactionDetailsModalProps> = ({ visible, onClose, transaction }) => {
  if (!transaction) return null;

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'executed': return '#065F46';
      case 'cancelled': return '#991B1B';
      default: return '#1E40AF';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'executed': return '#D1FAE5';
      case 'cancelled': return '#FEE2E2';
      default: return '#DBEAFE';
    }
  };

  const totalValue = transaction.price * transaction.qty;
  const fees = totalValue * 0.0135; // Approx 1.35% fees
  const netAmount = transaction.type === 'Buy' ? totalValue + fees : totalValue - fees;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Transaction Details</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.body}>
            <View style={styles.statusSection}>
              <View style={[styles.statusBadge, { backgroundColor: getStatusBg(transaction.status) }]}>
                <Text style={[styles.statusText, { color: getStatusColor(transaction.status) }]}>
                  {transaction.status.toUpperCase()}
                </Text>
              </View>
              <Text style={styles.dateText}>{transaction.date || 'N/A'}</Text>
            </View>

            <View style={styles.amountSection}>
              <Text style={styles.amountLabel}>Net Amount</Text>
              <Text style={[styles.amountValue, { color: transaction.type === 'Buy' ? '#EF4444' : '#22C55E' }]}>
                {transaction.type === 'Buy' ? '-' : '+'}₦{netAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Text>
            </View>

            <View style={styles.detailsCard}>
              <View style={styles.row}>
                <Text style={styles.label}>Order ID</Text>
                <Text style={styles.value}>{transaction.id}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.row}>
                <Text style={styles.label}>Symbol</Text>
                <Text style={styles.valueBold}>{transaction.symbol}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Type</Text>
                <Text style={[styles.value, { color: transaction.type === 'Buy' ? '#22C55E' : '#EF4444' }]}>
                  {transaction.type}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Quantity</Text>
                <Text style={styles.value}>{transaction.qty.toLocaleString()}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Price</Text>
                <Text style={styles.value}>₦{transaction.price.toFixed(2)}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.row}>
                <Text style={styles.label}>Gross Value</Text>
                <Text style={styles.value}>₦{totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Commission & Fees</Text>
                <Text style={styles.value}>₦{fees.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
              </View>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity style={styles.actionBtn}>
                <Share2 size={18} color="#0D224C" />
                <Text style={styles.actionText}>Share Receipt</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <Printer size={18} color="#0D224C" />
                <Text style={styles.actionText}>Download PDF</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '85%',
  },
  // header: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   padding: 16,
  //   borderBottomWidth: 1,
  //   borderBottomColor: '#F3F4F6',
  // },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 15,
    paddingBottom: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  closeBtn: {
    padding: 4,
  },
  body: {
    padding: 20,
    paddingBottom: 40,
  },
  statusSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  dateText: {
    color: '#6B7280',
    fontSize: 14,
  },
  amountSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  amountLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  amountValue: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  detailsCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  label: {
    color: '#6B7280',
    fontSize: 14,
  },
  value: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
  },
  valueBold: {
    fontSize: 14,
    color: '#111827',
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  actionText: {
    color: '#0D224C',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default TransactionDetailsModal;
