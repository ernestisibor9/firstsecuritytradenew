import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Platform, StatusBar, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { Search, ChevronLeft, TrendingUp, TrendingDown, Star, Filter } from 'lucide-react-native';
import { useMarket } from '../context/MarketContext';
import BottomNavigation from './BottomNavigation';

const MarketScreen = ({ navigation }: any) => {
  const { stocks, toggleFavorite } = useMarket();
  const [activeCategory, setActiveCategory] = useState<'all' | 'watchlist' | 'gainers' | 'losers'>('all');
  const [search, setSearch] = useState('');

  const filteredStocks = stocks.filter(s => {
    const matchesSearch = s.symbol.toUpperCase().includes(search.toUpperCase()) || s.name.toUpperCase().includes(search.toUpperCase());
    if (activeCategory === 'watchlist') return matchesSearch && s.isFavorite;
    if (activeCategory === 'gainers') return matchesSearch && s.up;
    if (activeCategory === 'losers') return matchesSearch && !s.up;
    return matchesSearch;
  });

  const renderItem = ({ item }: any) => (
    <TouchableOpacity 
      style={styles.stockItem}
      onPress={() => navigation.navigate('Trade', { symbol: item.symbol })}
    >
      <View style={styles.stockInfo}>
        <TouchableOpacity onPress={() => toggleFavorite(item.symbol)} style={styles.starBtn}>
           <Star size={20} color={item.isFavorite ? '#F59E0B' : '#ccc'} fill={item.isFavorite ? '#F59E0B' : 'transparent'} />
        </TouchableOpacity>
        <View style={[styles.symbolBadge, { backgroundColor: item.up ? '#F0FDF4' : '#FEF2F2' }]}>
          <Text style={[styles.symbolText, { color: item.up ? '#22C55E' : '#EF4444' }]}>{item.symbol[0]}</Text>
        </View>
        <View>
          <Text style={styles.symbolName}>{item.symbol}</Text>
          <Text style={styles.companyName}>{item.name}</Text>
        </View>
      </View>
      <View style={styles.priceInfo}>
        <Text style={styles.priceText}>₦{item.price.toFixed(2)}</Text>
        <Text style={[styles.changeText, { color: item.up ? '#22C55E' : '#EF4444' }]}>
          {item.up ? '+' : ''}{item.change}%
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={28} color="#0D224C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Market Monitor</Text>
        <TouchableOpacity>
           <Filter size={22} color="#0D224C" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#999" />
          <TextInput 
            style={styles.searchInput}
            placeholder="Search symbol or company..."
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      <View style={styles.filterWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContainer}>
          <TouchableOpacity 
            style={[styles.filterTab, activeCategory === 'all' && styles.activeFilter]}
            onPress={() => setActiveCategory('all')}
          >
            <Text style={[styles.filterText, activeCategory === 'all' && styles.activeFilterText]}>All Stocks</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterTab, activeCategory === 'watchlist' && styles.activeFilter]}
            onPress={() => setActiveCategory('watchlist')}
          >
            <Star size={14} color={activeCategory === 'watchlist' ? '#fff' : '#666'} style={{ marginRight: 6 }} />
            <Text style={[styles.filterText, activeCategory === 'watchlist' && styles.activeFilterText]}>Watchlist</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterTab, activeCategory === 'gainers' && styles.activeFilter]}
            onPress={() => setActiveCategory('gainers')}
          >
            <TrendingUp size={14} color={activeCategory === 'gainers' ? '#fff' : '#666'} style={{ marginRight: 6 }} />
            <Text style={[styles.filterText, activeCategory === 'gainers' && styles.activeFilterText]}>Gainers</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterTab, activeCategory === 'losers' && styles.activeFilter]}
            onPress={() => setActiveCategory('losers')}
          >
            <TrendingDown size={14} color={activeCategory === 'losers' ? '#fff' : '#666'} style={{ marginRight: 6 }} />
            <Text style={[styles.filterText, activeCategory === 'losers' && styles.activeFilterText]}>Losers</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <FlatList 
        data={filteredStocks}
        renderItem={renderItem}
        keyExtractor={item => item.symbol}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No matching securities found.</Text>
          </View>
        }
      />
      <BottomNavigation navigation={navigation} activeRoute="Market" />
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
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    height: 50,
    borderRadius: 14,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
  },
  filterWrapper: {
    paddingVertical: 12,
  },
  filterContainer: {
    paddingHorizontal: 16,
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#eee',
  },
  activeFilter: {
    backgroundColor: '#0D224C',
    borderColor: '#0D224C',
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  activeFilterText: {
    color: '#fff',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  stockItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  stockInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starBtn: {
    padding: 8,
    marginRight: 4,
  },
  symbolBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  symbolText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  symbolName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#111827',
  },
  companyName: {
    fontSize: 11,
    color: '#999',
    marginTop: 1,
  },
  priceInfo: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#111827',
  },
  changeText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 2,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    color: '#999',
    fontSize: 14,
  },
});

export default MarketScreen;