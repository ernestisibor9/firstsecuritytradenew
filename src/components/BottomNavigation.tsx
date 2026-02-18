import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { Home, TrendingUp, Briefcase, RefreshCw, User, BookOpen } from 'lucide-react-native';

const BottomNavigation = ({ navigation, activeRoute }: any) => {
  // Helper for PlusCircle
  const PlusCircle = ({ size }: any) => (
    <View style={{ backgroundColor: '#0D224C', borderRadius: 15, padding: 4 }}>
       <TrendingUp size={size} color="#fff" />
    </View>
  );

  const tabs = [
    { name: 'Dashboard', icon: <Home size={22} />, label: 'Home' },
    { name: 'Market', icon: <TrendingUp size={22} />, label: 'Market' },
    { name: 'Trade', icon: <PlusCircle size={22} />, label: 'Trade' },
    { name: 'Portfolio', icon: <Briefcase size={22} />, label: 'Portfolio' },
    { name: 'Orders', icon: <BookOpen size={22} />, label: 'Orders' },
  ];

  return (
    <View style={styles.navContainer}>
      {tabs.map((tab, index) => {
        const isActive = activeRoute === tab.name;
        return (
          <TouchableOpacity 
            key={index} 
            style={styles.navItem}
            onPress={() => navigation.navigate(tab.name)}
          >
            <View style={[styles.iconBox, isActive && styles.activeIconBox]}>
              {React.cloneElement(tab.icon as React.ReactElement, { color: isActive ? '#0D224C' : '#999' })}
            </View>
            <Text style={[styles.navLabel, isActive && styles.activeNavLabel]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingBottom: Platform.OS === 'ios' ? 25 : 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  iconBox: {
    padding: 4,
    borderRadius: 8,
  },
  activeIconBox: {
    // backgroundColor: '#F3F4F6',
  },
  navLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#999',
    marginTop: 4,
  },
  activeNavLabel: {
    color: '#0D224C',
  },
});

export default BottomNavigation;