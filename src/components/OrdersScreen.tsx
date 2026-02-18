import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, Alert, Modal, StatusBar, Platform  } from 'react-native';
import { ChevronLeft, Clock, CheckCircle2, AlertCircle, FileText, XCircle, Trash2 } from 'lucide-react-native';
import BottomNavigation from './BottomNavigation';

const OrdersScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState<'open' | 'executed' | 'cancelled'>('open');
  const [showContractNote, setShowContractNote] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const initialOrders = [
    { 
      id: 'ORD-2025-001', 
      symbol: 'MTNN', 
      type: 'Limit Buy', 
      qty: 2500, 
      price: 245.20, 
      status: 'Open',
      orderDate: '2025-08-12 10:15 AM',
      executionDate: null,
      fees: 8275.50
    },
    { 
      id: 'ORD-2025-002', 
      symbol: 'ZENITHBANK', 
      type: 'Market Buy', 
      qty: 5000, 
      price: 35.20, 
      status: 'Executed',
      orderDate: '2025-08-11 02:30 PM',
      executionDate: '2025-08-11 02:35 PM',
      fees: 2376.00
    },
    { 
      id: 'ORD-2025-003', 
      symbol: 'DANGCEM', 
      type: 'Limit Sell', 
      qty: 1000, 
      price: 460.00, 
      status: 'Cancelled',
      orderDate: '2025-08-10 09:00 AM',
      executionDate: null,
      fees: 0
    }
  ];

  const [orders, setOrders] = useState(initialOrders);

  const filteredOrders = orders.filter(o => o.status.toLowerCase() === activeTab);

  const handleCancelOrder = (id: string) => {
    Alert.alert('Cancel Order', 'Are you sure you want to cancel this open order?', [
      { text: 'No', style: 'cancel' },
      { 
        text: 'Yes, Cancel', 
        style: 'destructive', 
        onPress: () => {
          setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'Cancelled' } : o));
          Alert.alert('Order Cancelled', 'Your order has been successfully removed from the NGX queue.');
        } 
      }
    ]);
  };

  const openContractNote = (order: any) => {
    setSelectedOrder(order);
    setShowContractNote(true);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open': return '#3B82F6';
      case 'executed': return '#22C55E';
      case 'cancelled': return '#EF4444';
      default: return '#666';
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.orderCard}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.symbolText}>{item.symbol}</Text>
          <Text style={styles.orderTypeText}>{item.type}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '15' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>{item.status}</Text>
        </View>
      </View>
      <View style={styles.cardBody}>
        <View style={styles.infoRow}>
           <Text style={styles.infoLabel}>Quantity</Text>
           <Text style={styles.infoValue}>{item.qty.toLocaleString()}</Text>
        </View>
        <View style={styles.infoRow}>
           <Text style={styles.infoLabel}>Price</Text>
           <Text style={styles.infoValue}>₦{item.price.toFixed(2)}</Text>
        </View>
        <View style={styles.infoRow}>
           <Text style={styles.infoLabel}>Order Date</Text>
           <Text style={styles.infoValue}>{item.orderDate}</Text>
        </View>
        {item.executionDate && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Execution Date</Text>
            <Text style={styles.infoValue}>{item.executionDate}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.actionRow}>
        {item.status === 'Open' && (
          <>
            <TouchableOpacity 
              style={[styles.actionBtn, styles.cancelBtn]}
              onPress={() => handleCancelOrder(item.id)}
            >
              <Trash2 size={16} color="#EF4444" />
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionBtn, styles.amendBtn]}
              onPress={() => navigation.navigate('Trade', { symbol: item.symbol, price: item.price.toString(), action: item.type.toLowerCase().includes('buy') ? 'buy' : 'sell' })}
            >
              <Text style={styles.amendBtnText}>Amend</Text>
            </TouchableOpacity>
          </>
        )}
        {item.status === 'Executed' && (
          <TouchableOpacity 
            style={[styles.actionBtn, styles.noteBtn]}
            onPress={() => openContractNote(item)}
          >
            <FileText size={16} color="#0D224C" />
            <Text style={styles.noteBtnText}>Contract Note</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={28} color="#0D224C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order History</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'open' && styles.activeTab]}
          onPress={() => setActiveTab('open')}
        >
          <Text style={[styles.tabText, activeTab === 'open' && styles.activeTabText]}>Open</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'executed' && styles.activeTab]}
          onPress={() => setActiveTab('executed')}
        >
          <Text style={[styles.tabText, activeTab === 'executed' && styles.activeTabText]}>Executed</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'cancelled' && styles.activeTab]}
          onPress={() => setActiveTab('cancelled')}
        >
          <Text style={[styles.tabText, activeTab === 'cancelled' && styles.activeTabText]}>Cancelled</Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={filteredOrders}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Clock size={48} color="#ddd" />
            <Text style={styles.emptyText}>No {activeTab} orders found.</Text>
          </View>
        }
      />

      {/* Contract Note Modal */}
      <Modal visible={showContractNote} animationType="slide" transparent={true}>
         <View style={styles.modalOverlay}>
            <View style={styles.noteContainer}>
               <View style={styles.noteHeader}>
                  <Text style={styles.noteTitle}>Contract Note</Text>
                  <TouchableOpacity onPress={() => setShowContractNote(false)}>
                     <XCircle size={24} color="#999" />
                  </TouchableOpacity>
               </View>
               <ScrollView style={styles.noteBody}>
                  <Text style={styles.brokerName}>FIRST SECURITIES LIMITED</Text>
                  <Text style={styles.brokerAddress}>Tapa House, Imam Dauda Street, Lagos</Text>
                  
                  <View style={styles.noteDivider} />
                  
                  <View style={styles.noteRow}>
                     <Text style={styles.noteLabel}>Reference:</Text>
                     <Text style={styles.noteVal}>{selectedOrder?.id}</Text>
                  </View>
                  <View style={styles.noteRow}>
                     <Text style={styles.noteLabel}>Security:</Text>
                     <Text style={styles.noteVal}>{selectedOrder?.symbol}</Text>
                  </View>
                  <View style={styles.noteRow}>
                     <Text style={styles.noteLabel}>Quantity:</Text>
                     <Text style={styles.noteVal}>{selectedOrder?.qty.toLocaleString()}</Text>
                  </View>
                  <View style={styles.noteRow}>
                     <Text style={styles.noteLabel}>Price:</Text>
                     <Text style={styles.noteVal}>₦{selectedOrder?.price.toFixed(2)}</Text>
                  </View>
                  
                  <View style={styles.noteDivider} />
                  
                  <View style={styles.noteRow}>
                     <Text style={styles.noteLabel}>Gross Value:</Text>
                     <Text style={styles.noteVal}>₦{(selectedOrder?.qty * selectedOrder?.price).toLocaleString()}</Text>
                  </View>
                  <View style={styles.noteRow}>
                     <Text style={styles.noteLabel}>Total Fees:</Text>
                     <Text style={styles.noteVal}>₦{selectedOrder?.fees.toLocaleString()}</Text>
                  </View>
                  <View style={[styles.noteRow, { marginTop: 8 }]}>
                     <Text style={[styles.noteLabel, { fontWeight: 'bold', color: '#0D224C' }]}>Net Amount:</Text>
                     <Text style={[styles.noteVal, { fontWeight: 'bold', color: '#0D224C' }]}>
                        ₦{((selectedOrder?.qty * selectedOrder?.price) + selectedOrder?.fees).toLocaleString()}
                     </Text>
                  </View>
                  
                  <View style={styles.noteFooter}>
                     <Text style={styles.noteFooterText}>This is an electronic contract note and does not require a signature.</Text>
                  </View>
               </ScrollView>
               <TouchableOpacity style={styles.downloadBtn} onPress={() => Alert.alert("Download", "PDF Downloaded")}>
                  <Text style={styles.downloadBtnText}>Download PDF</Text>
               </TouchableOpacity>
            </View>
         </View>
      </Modal>

      <BottomNavigation navigation={navigation} activeRoute="Orders" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0D224C',
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#0D224C',
  },
  tabText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#0D224C',
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  symbolText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0D224C',
  },
  orderTypeText: {
    fontSize: 12,
    color: '#999',
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  cardBody: {
    gap: 8,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoLabel: {
    fontSize: 12,
    color: '#999',
  },
  infoValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  cancelBtn: {
    borderColor: '#FEE2E2',
    backgroundColor: '#FEF2F2',
  },
  cancelBtnText: {
    color: '#EF4444',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  amendBtn: {
    borderColor: '#eee',
    backgroundColor: '#F9FAFB',
  },
  amendBtnText: {
    color: '#0D224C',
    fontSize: 12,
    fontWeight: 'bold',
  },
  noteBtn: {
    borderColor: '#0D224C',
    backgroundColor: '#fff',
  },
  noteBtnText: {
    color: '#0D224C',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  emptyText: {
    marginTop: 16,
    color: '#9ca3af',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  noteContainer: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    maxHeight: '80%',
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  noteTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0D224C',
  },
  noteBody: {
    marginBottom: 20,
  },
  brokerName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#111',
  },
  brokerAddress: {
    fontSize: 11,
    textAlign: 'center',
    color: '#666',
    marginBottom: 16,
  },
  noteDivider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 12,
  },
  noteRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  noteLabel: {
    fontSize: 13,
    color: '#666',
  },
  noteVal: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111',
  },
  noteFooter: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
  },
  noteFooterText: {
    fontSize: 10,
    color: '#999',
    textAlign: 'center',
  },
  downloadBtn: {
    backgroundColor: '#0D224C',
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  downloadBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default OrdersScreen;
