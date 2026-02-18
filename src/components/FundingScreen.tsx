import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Platform, StatusBar, SafeAreaView, TextInput, Alert, Dimensions } from 'react-native';
import { ChevronLeft, CreditCard, Landmark, Plus, ArrowUpRight, Download, Send, Wallet } from 'lucide-react-native';
import BottomNavigation from './BottomNavigation';

const FundingScreen = ({ navigation }: any) => {
  const [mode, setMode] = useState<'deposit' | 'withdraw'>('deposit');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState<'transfer' | 'card'>('transfer');
  const [bank, setBank] = useState('Zenith Bank - 1234567890');

  const handleAction = () => {
    if (!amount) {
      Alert.alert('Error', `Please enter an amount to ${mode}.`);
      return;
    }
    
    if (mode === 'deposit') {
      Alert.alert('Deposit Initialized', `A funding request for ₦${parseFloat(amount).toLocaleString()} has been sent. Please follow the instructions on the next screen.`, [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } else {
      Alert.alert('Withdrawal Requested', `Your request to withdraw ₦${parseFloat(amount).toLocaleString()} to ${bank} has been received and will be processed within 24-48 hours.`, [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={28} color="#0D224C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cash Management</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, mode === 'deposit' && styles.activeTab]} 
          onPress={() => setMode('deposit')}
        >
          <Text style={[styles.tabText, mode === 'deposit' && styles.activeTabText]}>Deposit</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, mode === 'withdraw' && styles.activeTab]} 
          onPress={() => setMode('withdraw')}
        >
          <Text style={[styles.tabText, mode === 'withdraw' && styles.activeTabText]}>Withdraw</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.balanceCard}>
           <View style={styles.balanceItem}>
              <Text style={styles.balanceLabel}>Trading Balance</Text>
              <Text style={styles.balanceVal}>₦85,000.00</Text>
           </View>
           <View style={styles.divider} />
           <View style={styles.balanceItem}>
              <Text style={styles.balanceLabel}>Withdrawable</Text>
              <Text style={styles.balanceVal}>₦82,450.00</Text>
           </View>
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.label}>Amount to {mode === 'deposit' ? 'Add' : 'Withdraw'}</Text>
          <View style={styles.amountInputBox}>
             <Text style={styles.currency}>₦</Text>
             <TextInput 
               style={styles.amountInput}
               placeholder="0.00"
               keyboardType="numeric"
               value={amount}
               onChangeText={setAmount}
             />
          </View>
        </View>

        {mode === 'deposit' ? (
          <View style={styles.methodSection}>
             <Text style={styles.label}>Select Payment Method</Text>
             <TouchableOpacity 
               style={[styles.methodCard, method === 'transfer' && styles.activeMethod]} 
               onPress={() => setMethod('transfer')}
             >
                <View style={[styles.methodIcon, { backgroundColor: '#EFF6FF' }]}>
                   <Landmark size={24} color="#3B82F6" />
                </View>
                <View style={styles.methodInfo}>
                   <Text style={styles.methodName}>Bank Transfer</Text>
                   <Text style={styles.methodDesc}>Direct transfer to our trust account</Text>
                </View>
                <View style={[styles.radio, method === 'transfer' && styles.radioActive]} />
             </TouchableOpacity>

             <TouchableOpacity 
               style={[styles.methodCard, method === 'card' && styles.activeMethod]} 
               onPress={() => setMethod('card')}
             >
                <View style={[styles.methodIcon, { backgroundColor: '#F0FDF4' }]}>
                   <CreditCard size={24} color="#22C55E" />
                </View>
                <View style={styles.methodInfo}>
                   <Text style={styles.methodName}>Debit Card / USSD</Text>
                   <Text style={styles.methodDesc}>Instant funding via Paystack/Flutterwave</Text>
                </View>
                <View style={[styles.radio, method === 'card' && styles.radioActive]} />
             </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.methodSection}>
             <Text style={styles.label}>Settlement Bank Account</Text>
             <View style={styles.bankCard}>
                <View style={[styles.methodIcon, { backgroundColor: '#F9FAFB' }]}>
                   <Landmark size={24} color="#0D224C" />
                </View>
                <View style={styles.methodInfo}>
                   <Text style={styles.methodName}>{bank}</Text>
                   <Text style={styles.methodDesc}>Standard T+3 settlement period applies</Text>
                </View>
             </View>
             <TouchableOpacity style={styles.changeBankBtn}>
                <Text style={styles.changeBankText}>Use different account</Text>
             </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={styles.actionBtn} onPress={handleAction}>
           {mode === 'deposit' ? <Download size={20} color="#fff" /> : <Send size={20} color="#fff" />}
           <Text style={styles.actionBtnText}>{mode === 'deposit' ? 'Confirm Deposit' : 'Request Withdrawal'}</Text>
        </TouchableOpacity>

        <View style={styles.tipBox}>
           <Text style={styles.tipTitle}>Helpful Information</Text>
           <Text style={styles.tipText}>
             {mode === 'deposit' 
               ? "Funding your account allows you to take advantage of market opportunities immediately. Most deposits reflect within 10 minutes." 
               : "Withdrawals are only processed to your linked bank account for security. Standard settlement for stock sales is T+3, which must be completed before funds are withdrawable."}
           </Text>
        </View>
      </ScrollView>
      <BottomNavigation navigation={navigation} activeRoute="Funding" />
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
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    paddingVertical: 12,
    marginRight: 24,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#0D224C',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
  },
  activeTabText: {
    color: '#0D224C',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
  },
  balanceCard: {
    backgroundColor: '#0D224C',
    borderRadius: 24,
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  balanceItem: {
    flex: 1,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: 20,
  },
  balanceLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  balanceVal: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputSection: {
    marginBottom: 32,
  },
  label: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#999',
    textTransform: 'uppercase',
    marginBottom: 12,
    marginLeft: 4,
  },
  amountInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#eee',
    paddingBottom: 8,
  },
  currency: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0D224C',
    marginRight: 8,
  },
  amountInput: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  methodSection: {
    marginBottom: 32,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 12,
  },
  bankCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#eee',
  },
  activeMethod: {
    borderColor: '#0D224C',
    backgroundColor: '#F9FAFB',
  },
  methodIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  methodInfo: {
    flex: 1,
  },
  methodName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  methodDesc: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
  },
  changeBankBtn: {
    marginTop: 12,
    alignItems: 'center',
  },
  changeBankText: {
    fontSize: 13,
    color: '#2563EB',
    fontWeight: '600',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#eee',
  },
  radioActive: {
    borderColor: '#0D224C',
    backgroundColor: '#0D224C',
  },
  actionBtn: {
    backgroundColor: '#0D224C',
    height: 56,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  actionBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  tipBox: {
    padding: 20,
    backgroundColor: '#F9FAFB',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#eee',
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
});

export default FundingScreen;