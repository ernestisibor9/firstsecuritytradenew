import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, TextInput } from 'react-native';
import { ChevronLeft, TrendingUp, TrendingDown, Wallet, Eye, EyeOff, Calendar, Download, Filter } from 'lucide-react-native';

import BottomNavigation from './BottomNavigation';
import TransactionDetailsModal from './TransactionDetailsModal';

const PortfolioScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState<'holdings' | 'history'>('holdings');
  const [showBalance, setShowBalance] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const holdings = [
    { symbol: 'MTNN', name: 'MTN Nigeria', qty: 5000, avgPrice: 230.25, currentPrice: 245.50, val: 1227500, gain: 76250, gainPct: 6.62, up: true },
    { symbol: 'DANGCEM', name: 'Dangote Cement', qty: 1000, avgPrice: 440.00, currentPrice: 450.00, val: 450000, gain: 10000, gainPct: 2.27, up: true },
    { symbol: 'GUARANTY', name: 'GT Bank', qty: 15000, avgPrice: 33.10, currentPrice: 32.50, val: 487500, gain: -9000, gainPct: -1.81, up: false },
  ];

  const transactionHistory = [
    { id: 'ORD-001', symbol: 'MTNN', type: 'Buy', qty: 1000, price: 245.50, status: 'Executed', date: '2025-08-12' },
    { id: 'ORD-002', symbol: 'ZENITHBANK', type: 'Buy', qty: 5000, price: 35.20, status: 'Executed', date: '2025-08-11' },
    { id: 'ORD-003', symbol: 'DANGCEM', type: 'Sell', qty: 500, price: 460.00, status: 'Cancelled', date: '2025-08-10' },
  ];

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredTransactions = transactionHistory.filter(t => {
    if (startDate && t.date < startDate) return false;
    if (endDate && t.date > endDate) return false;
    if (statusFilter !== 'All' && t.status !== statusFilter) return false;
    return true;
  });

  const renderHoldingItem = ({ item }: any) => (
    <TouchableOpacity 
      style={styles.holdingCard} 
      onPress={() => navigation.navigate('Trade', { symbol: item.symbol, action: 'sell' })}
    >
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.symbolText}>{item.symbol}</Text>
          <Text style={styles.qtyText}>{item.qty.toLocaleString()} Shares</Text>
        </View>
        <View style={styles.rightAlign}>
          <Text style={[styles.valText, !showBalance && styles.balanceHiddenSmall]}>
             {showBalance ? `₦${item.val.toLocaleString()}` : '₦ •••••'}
          </Text>
          <Text style={[styles.gainText, { color: item.up ? '#22C55E' : '#EF4444' }]}>
            {item.up ? '+' : ''}{item.gainPct}%
          </Text>
        </View>
      </View>
      <View style={styles.cardFooter}>
        <View style={styles.footerCol}>
          <Text style={styles.footerLabel}>Avg Cost</Text>
          <Text style={styles.footerVal}>₦{item.avgPrice.toFixed(2)}</Text>
        </View>
        <View style={styles.footerCol}>
          <Text style={styles.footerLabel}>Current</Text>
          <Text style={styles.footerVal}>₦{item.currentPrice.toFixed(2)}</Text>
        </View>
        <View style={styles.footerCol}>
          <Text style={styles.footerLabel}>P&L</Text>
          <Text style={[styles.footerVal, { color: item.up ? '#22C55E' : '#EF4444' }]}>
            ₦{Math.abs(item.gain).toLocaleString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleTransactionClick = (item: any) => {
    setSelectedTransaction(item);
    setModalVisible(true);
  };

  const renderHistoryItem = ({ item }: any) => (
    <TouchableOpacity style={styles.historyCard} onPress={() => handleTransactionClick(item)}>
      <View style={styles.historyTop}>
        <View>
          <Text style={styles.historySymbol}>{item.symbol}</Text>
          <Text style={styles.historyDate}>{item.date}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: item.status === 'Executed' ? '#D1FAE5' : '#F3F4F6' }]}>
          <Text style={[styles.statusText, { color: item.status === 'Executed' ? '#065F46' : '#6B7280' }]}>
            {item.status}
          </Text>
        </View>
      </View>
      <View style={styles.historyBody}>
        <Text style={styles.historyType}>{item.type} {item.qty.toLocaleString()} units</Text>
        <Text style={styles.historyPrice}>@ ₦{item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={28} color="#0D224C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Portfolio</Text>
        <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
          {showBalance ? <Eye size={22} color="#4b5563" /> : <EyeOff size={22} color="#4b5563" />}
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'holdings' && styles.activeTab]} 
          onPress={() => setActiveTab('holdings')}
        >
          <Text style={[styles.tabText, activeTab === 'holdings' && styles.activeTabText]}>Holdings</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'history' && styles.activeTab]} 
          onPress={() => setActiveTab('history')}
        >
          <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>Portfolio Transaction History</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {activeTab === 'holdings' ? (
          <>
            {/* Account Info Card - SYNCED WITH HTML */}
            <View style={styles.accountCard}>
              <View style={styles.accountItem}>
                <Text style={styles.accountLabel}>Asset Available</Text>
                <Text style={[styles.accountValLarge, !showBalance && styles.balanceHidden]}>
                  {showBalance ? '₦250,000.00' : '₦ •••••••'}
                </Text>
              </View>
              <View style={styles.accountDivider} />
              <View style={styles.accountItem}>
                <Text style={styles.accountLabel}>Cash Balance</Text>
                <Text style={[styles.accountValSmall, !showBalance && styles.balanceHidden]}>
                  {showBalance ? '₦85,000.00' : '₦ •••••••'}
                </Text>
              </View>
            </View>

            {/* Historical Performance - SYNCED WITH HTML */}
            <View style={styles.performanceCard}>
              <Text style={styles.sectionTitle}>Historical Performance</Text>
              <View style={styles.performanceRow}>
                <Text style={styles.performanceLabel}>Current Market Value:</Text>
                <Text style={[styles.performanceVal, !showBalance && styles.balanceHidden]}>
                    {showBalance ? '₦2,165,000.00' : '₦ •••••••'}
                </Text>
              </View>
              <View style={styles.performanceRow}>
                <Text style={styles.performanceLabel}>Total Gain/Loss:</Text>
                <Text style={[styles.performanceVal, { color: '#22C55E' }]}>₦77,250.00</Text>
              </View>
              <View style={styles.performanceRow}>
                <Text style={styles.performanceLabel}>Total Gain/Loss(%):</Text>
                <Text style={[styles.performanceVal, { color: '#22C55E' }]}>3.7%</Text>
              </View>
            </View>

            {/* Asset Allocation - SYNCED WITH HTML */}
            <View style={styles.allocationCard}>
              <Text style={styles.sectionTitle}>Asset Allocation</Text>
              <View style={styles.donutContainer}>
                 <View style={styles.donutPlaceholder}>
                    <Text style={styles.donutAmount}>₦2.16M</Text>
                    <Text style={styles.donutLabel}>Total</Text>
                 </View>
              </View>
              <View style={styles.legendContainer}>
                 <View style={styles.legendItem}>
                   <View style={[styles.legendColor, {backgroundColor: '#3b82f6'}]}/>
                   <Text style={styles.legendText}>MTNN (57%)</Text>
                 </View>
                 <View style={styles.legendItem}>
                   <View style={[styles.legendColor, {backgroundColor: '#10b981'}]}/>
                   <Text style={styles.legendText}>DANGCEM (21%)</Text>
                 </View>
                 <View style={styles.legendItem}>
                   <View style={[styles.legendColor, {backgroundColor: '#f59e0b'}]}/>
                   <Text style={styles.legendText}>GUARANTY (22%)</Text>
                 </View>
              </View>
            </View>

            {/* Current Holdings List - SYNCED WITH HTML */}
            <View style={styles.holdingsSection}>
              <Text style={styles.sectionTitle}>Current Holdings</Text>
              <FlatList 
                data={holdings}
                renderItem={renderHoldingItem}
                keyExtractor={item => item.symbol}
                scrollEnabled={false}
              />
            </View>
          </>
        ) : (
          /* Portfolio History Content - SYNCED WITH HTML */
          <View style={styles.historySection}>
            <View style={styles.historyHeader}>
               <View>
                  <Text style={styles.historyTitle}>Portfolio Transaction History</Text>
                  <Text style={styles.historySub}>All your orders with various statuses</Text>
               </View>
               <TouchableOpacity style={styles.downloadBtn}>
                  <Download size={20} color="#fff" />
                  <Text style={styles.downloadText}>Executed</Text>
               </TouchableOpacity>
            </View>

            {/* Filters */}
            <View style={styles.filterRow}>
              <View style={styles.filterItem}>
                <Text style={styles.filterLabel}>Start Date (YYYY-MM-DD)</Text>
                <View style={styles.filterInput}>
                   <TextInput 
                     style={styles.dateText} 
                     value={startDate} 
                     onChangeText={setStartDate}
                     placeholder="2025-08-01"
                   />
                   <Calendar size={16} color="#999" />
                </View>
              </View>
              <View style={styles.filterItem}>
                <Text style={styles.filterLabel}>End Date (YYYY-MM-DD)</Text>
                <View style={styles.filterInput}>
                   <TextInput 
                     style={styles.dateText} 
                     value={endDate} 
                     onChangeText={setEndDate}
                     placeholder="2025-08-31"
                   />
                   <Calendar size={16} color="#999" />
                </View>
              </View>
            </View>

            <TouchableOpacity 
               style={styles.statusFilter}
               activeOpacity={0.7}
               onPress={() => {
                 const states = ['All', 'Executed', 'Cancelled'];
                 const next = states[(states.indexOf(statusFilter) + 1) % states.length];
                 setStatusFilter(next);
               }}
            >
               <Text style={styles.filterLabel}>Status Filter: {statusFilter}</Text>
               <View style={styles.filterInputFull}>
                  <Text style={styles.dateText}>{statusFilter === 'All' ? 'All Transactions' : statusFilter}</Text>
                  <Filter size={16} color="#999" />
               </View>
            </TouchableOpacity>

            <FlatList 
              data={filteredTransactions}
              renderItem={renderHistoryItem}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              contentContainerStyle={{ marginTop: 20 }}
            />
          </View>
        )}
      </ScrollView>
      <BottomNavigation navigation={navigation} activeRoute="Portfolio" />
      
      <TransactionDetailsModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
        transaction={selectedTransaction} 
      />
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0D224C',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#0D224C',
  },
  tabText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '600',
    textAlign: 'center',
  },
  activeTabText: {
    color: '#0D224C',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  accountCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 24,
  },
  accountItem: {
    gap: 4,
  },
  accountLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  accountValLarge: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0D224C',
  },
  accountValSmall: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
  },
  accountDivider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0D224C',
    marginBottom: 16,
  },
  performanceCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  performanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  performanceLabel: {
    fontSize: 14,
    color: '#4b5563',
  },
  performanceVal: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  allocationCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  donutContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  donutPlaceholder: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 20,
    borderColor: '#3b82f6',
    borderTopColor: '#10b981',
    borderRightColor: '#f59e0b',
    borderBottomColor: '#f59e0b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  donutAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0D224C',
  },
  donutLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 3,
  },
  legendText: {
    fontSize: 12,
    color: '#4b5563',
  },
  holdingsSection: {
    marginBottom: 20,
  },
  holdingCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  symbolText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0D224C',
  },
  qtyText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  rightAlign: {
    alignItems: 'flex-end',
  },
  valText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  gainText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f9f9f9',
  },
  footerCol: {
    flex: 1,
  },
  footerLabel: {
    fontSize: 10,
    color: '#999',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  footerVal: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginTop: 2,
  },
  historySection: {
    paddingTop: 10,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0D224C',
  },
  historySub: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 4,
  },
  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0D224C',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  downloadText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  filterItem: {
    flex: 1,
    gap: 6,
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
  },
  filterInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
  },
  filterInputFull: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    marginTop: 6,
  },
  dateText: {
    fontSize: 13,
    color: '#333',
  },
  statusFilter: {
    marginBottom: 20,
  },
  historyCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    marginBottom: 12,
  },
  historyTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historySymbol: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#111827',
  },
  historyDate: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  historyBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f9fafb',
  },
  historyType: {
    fontSize: 13,
    color: '#4b5563',
    fontWeight: '500',
  },
  historyPrice: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#111827',
  },
  balanceHidden: {
    fontSize: 20,
    opacity: 0.7,
  },
  balanceHiddenSmall: {
    fontSize: 13,
    opacity: 0.5,
  },
});

export default PortfolioScreen;