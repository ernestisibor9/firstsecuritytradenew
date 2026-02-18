import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, Alert, Modal, FlatList, StatusBar, Platform } from 'react-native';
import { ChevronLeft, Info, Search, ShieldCheck, ChevronDown } from 'lucide-react-native';
import BottomNavigation from './BottomNavigation';
import MarketStatusBadge from './MarketStatusBadge';
import OrderPreviewModal from './OrderPreviewModal';

const TradeExecutionScreen = ({ navigation, route }: any) => {
  const [symbol, setSymbol] = useState(route?.params?.symbol || 'MTNN');
  const [marketPrice, setMarketPrice] = useState(245.50);
  const [action, setAction] = useState<'buy' | 'sell'>(route?.params?.action || 'buy');
  const [orderType, setOrderType] = useState<'market' | 'limit'>(route?.params?.price ? 'limit' : 'market');
  const [qty, setQty] = useState('');
  const [price, setPrice] = useState(route?.params?.price || '245.50');
  const [showSelector, setShowSelector] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [previewVisible, setPreviewVisible] = useState(false);

  const securities = [
    { symbol: 'MTNN', name: 'MTN Nigeria', price: 245.50, change: -0.85 },
    { symbol: 'ZENITHBANK', name: 'Zenith Bank Plc', price: 35.20, change: 4.46 },
    { symbol: 'GUARANTY', name: 'GT Bank', price: 32.50, change: 3.25 },
    { symbol: 'DANGCEM', name: 'Dangote Cement', price: 460.00, change: 0.00 },
    { symbol: 'FBNH', name: 'First Bank Holdings', price: 22.15, change: -1.20 },
    { symbol: 'ACCESSCORP', name: 'Access Holdings', price: 18.90, change: 2.15 },
    { symbol: 'UBA', name: 'United Bank for Africa', price: 15.40, change: 1.50 },
    { symbol: 'SEPLAT', name: 'Seplat Energy', price: 1200.00, change: 5.00 },
  ];

  const filteredSecurities = securities.filter(s => 
    s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (route?.params?.symbol) {
      const s = securities.find(sec => sec.symbol === route.params.symbol);
      if (s) {
        setSymbol(s.symbol);
        setMarketPrice(s.price);
        if (!route.params.price) setPrice(s.price.toString());
      }
    }
    if (route?.params?.price) {
      setPrice(route.params.price);
      setOrderType('limit');
    }
    if (route?.params?.action) {
      setAction(route.params.action);
    }
  }, [route?.params]);

  const selectSecurity = (sec: any) => {
    setSymbol(sec.symbol);
    setMarketPrice(sec.price);
    setPrice(sec.price.toString());
    setShowSelector(false);
    setSearchQuery('');
  };

  const handleConfirm = () => {
    if (!qty) {
      Alert.alert('Error', 'Please enter a quantity.');
      return;
    }

    const tradePrice = parseFloat(price);
    const upperLimit = marketPrice * 1.1;
    const lowerLimit = marketPrice * 0.9;

    if (orderType === 'limit' && (tradePrice > upperLimit || tradePrice < lowerLimit)) {
      Alert.alert(
        'Circuit Breaker Triggered', 
        `Your price (₦${tradePrice.toFixed(2)}) is outside the 10% daily range (₦${lowerLimit.toFixed(2)} - ₦${upperLimit.toFixed(2)}). NGX regulations prevent trades outside this range.`
      );
      return;
    }

    setPreviewVisible(true);
  };

  const executeTrade = () => {
    setPreviewVisible(false);
    
    // Simulate API call and success
    setTimeout(() => {
      Alert.alert('Trade Confirmed', `Your ${action.toUpperCase()} order for ${qty} shares of ${symbol} has been submitted to the NGX.`, [
        { text: 'View Order Book', onPress: () => navigation.navigate('OrderBook') },
        { text: 'Back to Dashboard', onPress: () => navigation.navigate('Dashboard') }
      ]);
    }, 500);
  };

  const totalValue = parseFloat(qty || '0') * parseFloat(price || '0');
  const estimatedFees = totalValue * 0.0135;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={28} color="#0D224C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trade Execution</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.securitySelector} onPress={() => setShowSelector(true)}>
           <View>
              <View style={styles.symbolRow}>
                <Text style={styles.symbolText}>{symbol}</Text>
                <ChevronDown size={18} color="#0D224C" style={{ marginLeft: 4, marginTop: 4 }} />
              </View>
              <Text style={styles.marketName}>{securities.find(s => s.symbol === symbol)?.name} • NGX</Text>
           </View>
           <View style={styles.priceBox}>
              <Text style={styles.currentPrice}>₦{marketPrice.toFixed(2)}</Text>
              <Text style={[styles.priceChange, { color: (securities.find(s => s.symbol === symbol)?.change || 0) >= 0 ? '#22C55E' : '#EF4444' }]}>
                {(securities.find(s => s.symbol === symbol)?.change || 0) >= 0 ? '+' : ''}{securities.find(s => s.symbol === symbol)?.change}%
              </Text>
           </View>
        </TouchableOpacity>

        <MarketStatusBadge style={{ marginBottom: 16 }} />

        <View style={styles.tabContainer}>
           <TouchableOpacity 
             style={[styles.tab, action === 'buy' && styles.buyActive]}
             onPress={() => setAction('buy')}
           >
              <Text style={[styles.tabText, action === 'buy' && styles.activeTabText]}>BUY</Text>
           </TouchableOpacity>
           <TouchableOpacity 
             style={[styles.tab, action === 'sell' && styles.sellActive]}
             onPress={() => setAction('sell')}
           >
              <Text style={[styles.tabText, action === 'sell' && styles.activeTabText]}>SELL</Text>
           </TouchableOpacity>
        </View>

        <View style={styles.form}>
           <View style={styles.inputGroup}>
              <Text style={styles.label}>Order Type</Text>
              <View style={styles.modeSelector}>
                 <TouchableOpacity 
                   style={[styles.modeBtn, orderType === 'market' && styles.activeMode]}
                   onPress={() => setOrderType('market')}
                 >
                    <Text style={[styles.modeText, orderType === 'market' && styles.activeModeText]}>Market</Text>
                 </TouchableOpacity>
                 <TouchableOpacity 
                   style={[styles.modeBtn, orderType === 'limit' && styles.activeMode]}
                   onPress={() => setOrderType('limit')}
                 >
                    <Text style={[styles.modeText, orderType === 'limit' && styles.activeModeText]}>Limit</Text>
                 </TouchableOpacity>
              </View>
           </View>

           <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                 <Text style={styles.label}>Quantity</Text>
                 <TextInput 
                   style={styles.input}
                   placeholder="0"
                   keyboardType="numeric"
                   value={qty}
                   onChangeText={setQty}
                 />
              </View>
              <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
                 <Text style={styles.label}>Price (₦)</Text>
                 <TextInput 
                   style={[styles.input, orderType === 'market' && { color: '#999', backgroundColor: '#F3F4F6' }]}
                   placeholder="0.00"
                   keyboardType="numeric"
                   value={orderType === 'market' ? marketPrice.toString() : price}
                   onChangeText={setPrice}
                   editable={orderType === 'limit'}
                 />
              </View>
           </View>

           <View style={styles.summaryBox}>
              <View style={styles.summaryRow}>
                 <Text style={styles.summaryLabel}>Estimated Value</Text>
                 <Text style={styles.summaryVal}>₦{totalValue.toLocaleString()}</Text>
              </View>
              <View style={styles.summaryRow}>
                 <Text style={styles.summaryLabel}>Trading Fees (1.35%)</Text>
                 <Text style={styles.summaryVal}>₦{estimatedFees.toLocaleString()}</Text>
              </View>
              <View style={[styles.summaryRow, styles.totalRow]}>
                 <Text style={styles.totalLabel}>Total Estimated Cost</Text>
                 <Text style={styles.totalVal}>₦{(totalValue + estimatedFees).toLocaleString()}</Text>
              </View>
           </View>

           <TouchableOpacity 
             style={[styles.confirmBtn, action === 'buy' ? styles.bgBuy : styles.bgSell]} 
             onPress={handleConfirm}
           >
              <ShieldCheck size={20} color="#fff" />
              <Text style={styles.confirmText}>Confirm {action.toUpperCase()} Order</Text>
           </TouchableOpacity>

           <View style={styles.buyingPowerBox}>
              <Info size={16} color="#999" />
              <Text style={styles.bpText}>Available Buying Power: ₦85,000.00</Text>
           </View>
        </View>
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
                      <Text style={styles.secSymbol}>{item.symbol}</Text>
                      <Text style={styles.secName}>{item.name}</Text>
                   </View>
                   <View style={{ alignItems: 'flex-end' }}>
                      <Text style={styles.secPrice}>₦{item.price.toFixed(2)}</Text>
                      <Text style={[styles.secChange, { color: item.change >= 0 ? '#22C55E' : '#EF4444' }]}>
                        {item.change >= 0 ? '+' : ''}{item.change}%
                      </Text>
                   </View>
                </TouchableOpacity>
              )}
           />
        </SafeAreaView>
      </Modal>

      <OrderPreviewModal 
        visible={previewVisible} 
        onClose={() => setPreviewVisible(false)} 
        onConfirm={executeTrade}
        orderData={{ 
          symbol, 
          action, 
          type: orderType === 'market' ? 'Market Order' : 'Limit Order', 
          qty, 
          price 
        }}
      />
      <BottomNavigation navigation={navigation} activeRoute="Trade" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // header: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   paddingHorizontal: 16,
  //   paddingVertical: 12,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0D224C',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  securitySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  symbolRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  symbolText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0D224C',
  },
  marketName: {
    fontSize: 10,
    color: '#999',
    fontWeight: '600',
    marginTop: 2,
  },
  priceBox: {
    alignItems: 'flex-end',
  },
  currentPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  priceChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 14,
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  buyActive: {
    backgroundColor: '#22C55E',
  },
  sellActive: {
    backgroundColor: '#EF4444',
  },
  tabText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
  },
  form: {
    gap: 20,
  },
  label: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#999',
    textTransform: 'uppercase',
    marginBottom: 8,
    marginLeft: 4,
  },
  modeSelector: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    padding: 4,
  },
  modeBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeMode: {
    backgroundColor: '#0D224C',
  },
  modeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  activeModeText: {
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
  },
  inputGroup: {
    marginBottom: 10,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#F9FAFB',
    color: '#333',
  },
  summaryBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#eee',
    marginTop: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 13,
    color: '#999',
  },
  summaryVal: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  totalRow: {
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0D224C',
  },
  totalVal: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0D224C',
  },
  confirmBtn: {
    height: 56,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  bgBuy: {
    backgroundColor: '#22C55E',
  },
  bgSell: {
    backgroundColor: '#EF4444',
  },
  confirmText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  buyingPowerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  bpText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 6,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  secSymbol: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  secName: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  secPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  secChange: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 2,
  },
});

export default TradeExecutionScreen;