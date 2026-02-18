import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Platform, StyleSheet, SafeAreaView, Dimensions, StatusBar, Image } from 'react-native';
import { 
  Bell, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  BookOpen, 
  RefreshCw, 
  ArrowUpRight,
  User,
  Eye,
  EyeOff,
  Star,
  ChevronRight,
  LogOut,
  LifeBuoy
} from 'lucide-react-native';
import { useAuth } from '../context/AuthContext';
import { useMarket } from '../context/MarketContext';
import BottomNavigation from './BottomNavigation';
import AppStatusBar from './AppStatusBar';

const Dashboard = ({ navigation }: any) => {
  const { user, logout } = useAuth();
  const { stocks, watchlist } = useMarket();
  const [showBalance, setShowBalance] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = async () => {
    setShowMenu(false);
    await logout();
  };

  const topGainers = stocks.filter(s => s.up).sort((a, b) => b.change - a.change).slice(0, 3);
  const topLosers = stocks.filter(s => !s.up).sort((a, b) => a.change - b.change).slice(0, 3);

  return (
    <SafeAreaView style={styles.container}>
      <AppStatusBar />
      
      {/* 6. DASHBOARD SCREEN HEADER - SYNCED WITH HTML */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerWelcome}>Welcome, {user?.name?.split(' ')[0] || 'Fiona'}</Text>
          <Text style={styles.headerLogin}>Last login: Today, 09:45 AM</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            onPress={() => setShowMenu(!showMenu)}
            style={styles.headerIconButton}
          >
            <User size={24} color="#374151" />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => navigation.navigate('Notifications')}
            style={styles.headerIconButton}
          >
            <Bell size={24} color="#374151" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Menu Dropdown */}
      {showMenu && (
        <>
          <TouchableOpacity 
            style={styles.menuOverlay} 
            activeOpacity={1} 
            onPress={() => setShowMenu(false)}
          />
          <View style={styles.profileMenu}>
            <View style={styles.profileHeader}>
              <View style={styles.profileAvatar}>
                <User size={20} color="#0D224C" />
              </View>
              <View>
                <Text style={styles.profileName}>{user?.name || 'Fiona Ahimie'}</Text>
                <Text style={styles.profileId}>ID: {user?.customerId || 'CUST001'}</Text>
              </View>
            </View>
            <View style={styles.menuDivider} />
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => { setShowMenu(false); navigation.navigate('ProfileDetails'); }}
            >
              <User size={18} color="#6B7280" />
              <Text style={styles.menuText}>My Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => { setShowMenu(false); navigation.navigate('Support'); }}
            >
              <LifeBuoy size={18} color="#6B7280" />
              <Text style={styles.menuText}>Support</Text>
            </TouchableOpacity>
            <View style={styles.menuDivider} />
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={handleLogout}
            >
              <LogOut size={18} color="#EF4444" />
              <Text style={[styles.menuText, { color: '#EF4444' }]}>Logout</Text>
            </TouchableOpacity>
            <View style={styles.menuFooter}>
               <Text style={styles.menuFooterText}>First Securities v1.2</Text>
            </View>
          </View>
        </>
      )}

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Portfolio Summary Card - SYNCED WITH HTML */}
        <View style={styles.portfolioSummarySection}>
           <TouchableOpacity 
             style={styles.portfolioCard} 
             onPress={() => navigation.navigate('Portfolio')}
             activeOpacity={0.9}
           >
              <View style={styles.summaryTop}>
                 <View>
                    <Text style={styles.summaryLabel}>Total Portfolio Value</Text>
                    <Text style={[styles.summaryBalance, !showBalance && styles.balanceHidden]}>
                       {showBalance ? '₦9,875,450.50' : '₦ ••••••••'}
                    </Text>
                 </View>
                 <TouchableOpacity onPress={() => setShowBalance(!showBalance)} style={styles.eyeBtn}>
                    {showBalance ? <Eye size={24} color="#fff" opacity={0.8} /> : <EyeOff size={24} color="#fff" opacity={0.8} />}
                 </TouchableOpacity>
              </View>
              <View style={styles.summaryBottom}>
                 <View>
                    <View style={styles.gainRow}>
                       <TrendingUp size={16} color="#4ADE80" />
                       <Text style={styles.gainText}>+3.45% (₦330,000)</Text>
                    </View>
                    <Text style={styles.gainLabel}>Today's Gain</Text>
                 </View>
                 <TouchableOpacity 
                    style={styles.viewDetailsBtn}
                    onPress={() => navigation.navigate('Portfolio')}
                 >
                    <Text style={styles.viewDetailsText}>View Details</Text>
                    <ChevronRight size={14} color="#fff" />
                 </TouchableOpacity>
              </View>
           </TouchableOpacity>
        </View>

        {/* Quick Actions - 3 Column Grid - SYNCED WITH HTML */}
        <View style={styles.quickActionsGrid}>
           <TouchableOpacity style={styles.actionItem} onPress={() => navigation.navigate('Funding')}>
              <View style={styles.actionIconCircle}>
                 <Plus size={24} color="#0D224C" />
              </View>
              <Text style={styles.actionLabel}>Cash Mgmt</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.actionItem} onPress={() => navigation.navigate('Trade')}>
              <View style={styles.actionIconCircle}>
                 <RefreshCw size={24} color="#0D224C" />
              </View>
              <Text style={styles.actionLabel}>Trade</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.actionItem} onPress={() => navigation.navigate('OrderBook')}>
              <View style={styles.actionIconCircle}>
                 <BookOpen size={24} color="#0D224C" />
              </View>
              <Text style={styles.actionLabel}>Order Book</Text>
           </TouchableOpacity>
        </View>

        {/* Watchlist Section - LIVE REFLECTION */}
        {watchlist.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
               <Text style={styles.sectionTitle}>My Watchlist</Text>
               <TouchableOpacity onPress={() => navigation.navigate('Market')} style={styles.addStocksBtn}>
                  <Text style={styles.addStocksText}>Add Stocks</Text>
               </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.watchlistScroll}>
               {watchlist.map((item, idx) => (
                 <TouchableOpacity key={idx} style={styles.watchCard} onPress={() => navigation.navigate('Trade', { symbol: item.symbol })}>
                    <View style={styles.watchHeader}>
                       <Text style={styles.watchSymbol}>{item.symbol}</Text>
                       <Star size={14} color="#F59E0B" fill="#F59E0B" />
                    </View>
                    <Text style={[styles.watchPrice, !showBalance && styles.balanceHiddenSmall]}>
                        ₦{item.price.toFixed(2)}
                    </Text>
                    <Text style={[styles.watchChange, { color: item.up ? '#22C55E' : '#EF4444' }]}>
                       {item.up ? '+' : ''}{item.change}%
                    </Text>
                 </TouchableOpacity>
               ))}
            </ScrollView>
          </View>
        )}

        {/* Market Overview / Pulse - ASI - SYNCED WITH HTML */}
        <View style={styles.section}>
           <Text style={styles.sectionTitle}>Market Pulse (NSE)</Text>
           <TouchableOpacity 
             style={styles.marketPulseCard}
             onPress={() => navigation.navigate('OrderBook')}
           >
              <Text style={styles.pulseLabel}>Nigerian All-Share Index (ASI)</Text>
              <View style={styles.pulseMain}>
                 <Text style={styles.pulseValue}>53,240.71</Text>
                 <View style={styles.pulseChangeRow}>
                    <TrendingDown size={20} color="#EF4444" />
                    <Text style={styles.pulseChangeText}>-0.85%</Text>
                 </View>
              </View>
              <Text style={styles.viewRealtimeBtn}>View Real-time Data</Text>
           </TouchableOpacity>
        </View>

        {/* Top Gainers - SYNCED WITH HTML */}
        <View style={styles.section}>
           <Text style={styles.sectionTitle}>Top Gainers</Text>
           <View style={styles.moverList}>
              {topGainers.map((item, idx) => (
                <TouchableOpacity key={idx} style={[styles.moverCard, styles.gainerCard]} onPress={() => navigation.navigate('Trade', { symbol: item.symbol })}>
                   <View>
                      <Text style={styles.moverSymbol}>{item.symbol}</Text>
                      <Text style={styles.moverName}>{item.name}</Text>
                   </View>
                   <View style={styles.moverPriceCol}>
                      <Text style={styles.moverPrice}>₦{item.price.toFixed(2)}</Text>
                      <Text style={styles.moverChangeTextGreen}>+{item.change}%</Text>
                   </View>
                </TouchableOpacity>
              ))}
           </View>
        </View>

        {/* Top Losers - SYNCED WITH HTML */}
        <View style={styles.section}>
           <Text style={styles.sectionTitle}>Top Losers</Text>
           <View style={styles.moverList}>
              {topLosers.map((item, idx) => (
                <TouchableOpacity key={idx} style={[styles.moverCard, styles.loserCard]} onPress={() => navigation.navigate('Trade', { symbol: item.symbol })}>
                   <View>
                      <Text style={styles.moverSymbol}>{item.symbol}</Text>
                      <Text style={styles.moverName}>{item.name}</Text>
                   </View>
                   <View style={styles.moverPriceCol}>
                      <Text style={styles.moverPrice}>₦{item.price.toFixed(2)}</Text>
                      <Text style={styles.moverChangeTextRed}>{item.change}%</Text>
                   </View>
                </TouchableOpacity>
              ))}
           </View>
        </View>

        {/* Your Next Step - SYNCED WITH HTML */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Next Step</Text>
          <View style={styles.nextStepGrid}>
            <TouchableOpacity 
              style={styles.nextStepCard}
              onPress={() => navigation.navigate('MarketResearch')}
            >
              <View style={styles.nextStepHeader}>
                <Text style={styles.nextStepTitle}>Market Research</Text>
                <View style={[styles.tag, { backgroundColor: '#DBEAFE' }]}>
                   <Text style={[styles.tagText, { color: '#2563EB' }]}>View More</Text>
                </View>
              </View>
              <View style={styles.nextStepList}>
                 <Text style={styles.nextStepItem}>• GTCO Q3 Earnings Report</Text>
                 <Text style={styles.nextStepItem}>• Inflation Data Aug 2025</Text>
                 <Text style={styles.nextStepItem}>• Oil Price Analysis</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.nextStepCard}
              onPress={() => navigation.navigate('Education')}
            >
               <View style={styles.nextStepHeader}>
                 <Text style={styles.nextStepTitle}>Education</Text>
                  <View style={[styles.tag, { backgroundColor: '#F3F4F6' }]}>
                   <Text style={[styles.tagText, { color: '#4B5563' }]}>Learn</Text>
                </View>
               </View>
               <View style={styles.nextStepList}>
                  <Text style={styles.nextStepItem}>• Beginners Guide to Stocks</Text>
                  <Text style={styles.nextStepItem}>• Understanding P/E Ratio</Text>
                  <Text style={styles.nextStepItem}>• Risk Management 101</Text>
               </View>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
      <BottomNavigation navigation={navigation} activeRoute="Dashboard" />
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
  headerWelcome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0D224C',
  },
  headerLogin: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerIconButton: {
    padding: 8,
    borderRadius: 99,
    backgroundColor: '#f3f4f6',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFC72C',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 120,
  },
  portfolioSummarySection: {
    padding: 20,
  },
  portfolioCard: {
    backgroundColor: '#0D224C',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  summaryTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  summaryLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  summaryBalance: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 4,
  },
  balanceHidden: {
    fontSize: 24,
    opacity: 0.7,
  },
  eyeBtn: {
    padding: 4,
  },
  summaryBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 24,
  },
  gainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  gainText: {
    color: '#4ADE80',
    fontSize: 14,
    fontWeight: '600',
  },
  gainLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginTop: 2,
  },
  viewDetailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  viewDetailsText: {
    color: '#fff',
    fontSize: 12,
    marginRight: 4,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  actionItem: {
    alignItems: 'center',
    gap: 8,
  },
  actionIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    fontSize: 12,
    color: '#4b5563',
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0D224C',
    marginBottom: 16,
  },
  addStocksBtn: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 99,
  },
  addStocksText: {
    color: '#2563EB',
    fontSize: 12,
    fontWeight: '600',
  },
  watchlistScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  watchCard: {
    backgroundColor: '#fff',
    width: 140,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#eee',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  watchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  watchSymbol: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0D224C',
  },
  watchPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  balanceHiddenSmall: {
    fontSize: 14,
    opacity: 0.5,
  },
  watchChange: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  marketPulseCard: {
    backgroundColor: '#f9fafb',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },
  pulseLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  pulseMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  pulseValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  pulseChangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pulseChangeText: {
    color: '#EF4444',
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewRealtimeBtn: {
    color: '#0D224C',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 12,
  },
  moverList: {
    gap: 12,
  },
  moverCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  gainerCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#22C55E',
  },
  loserCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
  },
  moverSymbol: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  moverName: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  moverPriceCol: {
    alignItems: 'flex-end',
  },
  moverPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  moverChangeTextGreen: {
    fontSize: 14,
    color: '#22C55E',
    fontWeight: 'bold',
    marginTop: 2,
  },
  moverChangeTextRed: {
    fontSize: 14,
    color: '#EF4444',
    fontWeight: 'bold',
    marginTop: 2,
  },
  menuOverlay: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 99,
  },
  profileMenu: {
    position: 'absolute',
    top: 60,
    right: 16,
    width: 250,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 100,
    padding: 8,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
  },
  profileId: {
    fontSize: 12,
    color: '#6B7280',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
    borderRadius: 8,
  },
  menuText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  menuFooter: {
    padding: 8,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    marginTop: 4,
  },
  menuFooterText: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  nextStepGrid: {
    gap: 16,
  },
  nextStepCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  nextStepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  nextStepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0D224C',
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 99,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '600',
  },
  nextStepList: {
    gap: 8,
  },
  nextStepItem: {
    fontSize: 13,
    color: '#4B5563',
  },
});

export default Dashboard;