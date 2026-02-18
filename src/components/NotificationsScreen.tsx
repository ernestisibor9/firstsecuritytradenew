import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { ChevronLeft, Bell, CreditCard, TrendingUp, AlertCircle } from 'lucide-react-native';

const NotificationsScreen = ({ navigation }: any) => {
  const notifications = [
    { id: '1', title: 'Order Executed', desc: 'Your buy order for 1,000 MTNN has been executed.', time: '10m ago', type: 'trade' },
    { id: '2', title: 'Cash Deposit', desc: '₦50,000 deposit has been confirmed.', time: '2h ago', type: 'cash' },
    { id: '3', title: 'Price Alert', desc: 'ZENITHBANK has reached your target price of ₦35.00', time: '5h ago', type: 'alert' },
    { id: '4', title: 'Login Successful', desc: 'A new login was detected from iPhone 15 Pro.', time: 'Yesterday', type: 'security' },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'trade': return <TrendingUp size={20} color="#22C55E" />;
      case 'cash': return <CreditCard size={20} color="#3B82F6" />;
      case 'alert': return <AlertCircle size={20} color="#F59E0B" />;
      default: return <Bell size={20} color="#666" />;
    }
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.notificationItem}>
      <View style={styles.iconBox}>
        {getIcon(item.type)}
      </View>
      <View style={styles.content}>
        <View style={styles.itemHeader}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Text style={styles.desc}>{item.desc}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={28} color="#0D224C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity>
           <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={notifications}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
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
  clearText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f9f9f9',
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  time: {
    fontSize: 10,
    color: '#999',
  },
  desc: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
});

export default NotificationsScreen;
