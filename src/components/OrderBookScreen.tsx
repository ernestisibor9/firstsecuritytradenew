import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Modal, FlatList, TextInput } from 'react-native';
import { ChevronLeft, Info, ChevronDown, Search } from 'lucide-react-native';
import MarketStatusBadge from './MarketStatusBadge';

const OrderBookScreen = ({ navigation }: any) => {
  const [symbol, setSymbol] = useState('MTNN');
  const [showSelector, setShowSelector] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const securities = [
    { symbol: 'MTNN', name: 'MTN Nigeria' },
    { symbol: 'ZENITHBANK', name: 'Zenith Bank Plc' },
    { symbol: 'GUARANTY', name: 'GT Bank' },
    { symbol: 'DANGCEM', name: 'Dangote Cement' },
    { symbol: 'FBNH', name: 'First Bank Holdings' },
  ];

  const filteredSecurities = securities.filter(s => 
    s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sellOrders = [
    { price: 246.50, qty: '12,000', total: '2.95M' },
    { price: 246.20, qty: '8,500', total: '2.09M' },
    { price: 245.90, qty: '5,000', total: '1.22M' },
    { price: 245.70, qty: '2,500', total: '614K' },
  ];

  const buyOrders = [
    { price: 245.20, qty: '15,000', total: '3.67M' },
    { price: 245.00, qty: '22,400', total: '5.48M' },
    { price: 244.80, qty: '10,000', total: '2.44M' },
    { price: 244.50, qty: '18,500', total: '4.52M' },
  ];

  const selectSecurity = (sec: any) => {
    setSymbol(sec.symbol);
    setShowSelector(false);
    setSearchQuery('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeft size={28} color="#0D224C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Live Order Book</Text>
        </View>
        <View style={styles.liveBadge}>
           <View style={styles.dot} />
           <Text style={styles.liveText}>Live</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.securitySelector} onPress={() => setShowSelector(true)}>
          <View>
            <Text style={styles.selectorLabel}>Security</Text>
            <View style={styles.symbolRow}>
              <Text style={styles.selectorValue}>{symbol}</Text>
              <ChevronDown size={14} color="#0D224C" style={{ marginLeft: 4 }} />
            </View>
            <Text style={styles.secName}>{securities.find(s => s.symbol === symbol)?.name}</Text>
          </View>
        </TouchableOpacity>

        <MarketStatusBadge style={{ marginBottom: 16 }} />

        <View style={styles.section}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableLabel}>Sell Quantity</Text>
            <Text style={styles.tableLabel}>Ask Price (₦)</Text>
          </View>
          {sellOrders.map((o, i) => (
            <TouchableOpacity 
              key={i} 
              style={styles.row}
              onPress={() => navigation.navigate('Trade', { symbol, price: o.price.toString(), action: 'buy' })}
            >
               <Text style={[styles.qty, { color: '#EF4444' }]}>{o.qty}</Text>
               <Text style={[styles.price, { color: '#EF4444' }]}>{o.price.toFixed(2)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.marketPriceBox}>
           <Text style={styles.marketLabel}>Spread: 0.30 (0.12%)</Text>
           <Text style={styles.marketValue}>₦245.50</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableLabel}>Buy Quantity</Text>
            <Text style={styles.tableLabel}>Bid Price (₦)</Text>
          </View>
          {buyOrders.map((o, i) => (
            <TouchableOpacity 
              key={i} 
              style={styles.row}
              onPress={() => navigation.navigate('Trade', { symbol, price: o.price.toString(), action: 'sell' })}
            >
               <Text style={[styles.qty, { color: '#22C55E' }]}>{o.qty}</Text>
               <Text style={[styles.price, { color: '#22C55E' }]}>{o.price.toFixed(2)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.infoBox}>
           <Info size={18} color="#0D224C" />
           <Text style={styles.infoText}>
             Tap any price to quickly pre-fill your trade screen.
           </Text>
        </View>

        <TouchableOpacity 
          style={styles.tradeButton}
          onPress={() => navigation.navigate('Trade', { symbol })}
        >
          <Text style={styles.tradeButtonText}>Execute Trade</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Security Selector Modal */}
      <Modal visible={showSelector} animationType="slide" transparent={false}>
        <SafeAreaView style={styles.modalContainer}>
           <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setShowSelector(false)}>
                 <ChevronLeft size={28} color="#0D224C" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Select Security</Text>
              <View style={{ width: 28 }} />
           </View>
           <View style={styles.searchBar}>
              <Search size={20} color="#999" />
              <TextInput 
                style={styles.searchInput}
                placeholder="Search symbol or name..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
              />
           </View>
           <FlatList 
              data={filteredSecurities}
              keyExtractor={item => item.symbol}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.secItem} onPress={() => selectSecurity(item)}>
                   <View>
                      <Text style={styles.secModalSymbol}>{item.symbol}</Text>
                      <Text style={styles.secModalName}>{item.name}</Text>
                   </View>
                </TouchableOpacity>
              )}
           />
        </SafeAreaView>
      </Modal>
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
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0D224C',
    marginLeft: 8,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  dot: {
    width: 6,
    height: 6,
    backgroundColor: '#22C55E',
    borderRadius: 3,
    marginRight: 6,
  },
  liveText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#22C55E',
    textTransform: 'uppercase',
  },
  scrollContent: {
    padding: 20,
  },
  securitySelector: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#eee',
  },
  symbolRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectorLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#999',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  selectorValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0D224C',
  },
  secName: {
    fontSize: 11,
    color: '#666',
    marginTop: 2,
  },
  section: {
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  tableLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#999',
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    marginBottom: 4,
  },
  qty: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  marketPriceBox: {
    alignItems: 'center',
    paddingVertical: 24,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#eee',
    marginVertical: 12,
  },
  marketLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  marketValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0D224C',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#EFF6FF',
    padding: 16,
    borderRadius: 16,
    marginTop: 24,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 12,
    color: '#1E40AF',
    marginLeft: 10,
    flex: 1,
  },
  tradeButton: {
    backgroundColor: '#0D224C',
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },
  tradeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0D224C',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    margin: 16,
    paddingHorizontal: 16,
    height: 50,
    borderRadius: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  secItem: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  secModalSymbol: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  secModalName: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
});

export default OrderBookScreen;