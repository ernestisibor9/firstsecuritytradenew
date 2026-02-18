import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { ChevronLeft, FileText, Download, Calendar } from 'lucide-react-native';

const ContractNoteScreen = ({ navigation }: any) => {
  const notes = [
    { id: '1', date: 'Oct 15, 2025', ref: 'FSB/2025/10/001', amount: '250,450.00', type: 'Buy' },
    { id: '2', date: 'Oct 12, 2025', ref: 'FSB/2025/10/002', amount: '85,000.00', type: 'Sell' },
    { id: '3', date: 'Oct 05, 2025', ref: 'FSB/2025/10/003', amount: '1,200,000.00', type: 'Buy' },
    { id: '4', date: 'Sep 28, 2025', ref: 'FSB/2025/09/045', amount: '45,200.00', type: 'Sell' },
  ];

  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.noteCard}>
      <View style={styles.noteHeader}>
        <View style={styles.refBox}>
           <Text style={styles.refLabel}>Ref NO.</Text>
           <Text style={styles.refValue}>{item.ref}</Text>
        </View>
        <TouchableOpacity style={styles.downloadBtn}>
           <Download size={18} color="#0D224C" />
        </TouchableOpacity>
      </View>
      <View style={styles.noteBody}>
         <View style={styles.infoCol}>
            <Text style={styles.infoLabel}>Date</Text>
            <Text style={styles.infoVal}>{item.date}</Text>
         </View>
         <View style={styles.infoCol}>
            <Text style={styles.infoLabel}>Type</Text>
            <Text style={[styles.infoVal, { color: item.type === 'Buy' ? '#22C55E' : '#EF4444' }]}>{item.type}</Text>
         </View>
         <View style={[styles.infoCol, { alignItems: 'flex-end' }]}>
            <Text style={styles.infoLabel}>Amount</Text>
            <Text style={styles.infoVal}>₦{item.amount}</Text>
         </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={28} color="#0D224C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contract Notes</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.filterBox}>
         <TouchableOpacity style={styles.filterBtn}>
            <Calendar size={16} color="#666" />
            <Text style={styles.filterBtnText}>October 2025</Text>
         </TouchableOpacity>
      </View>

      <FlatList 
        data={notes}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0D224C',
  },
  filterBox: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  filterBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginLeft: 8,
  },
  listContent: {
    padding: 16,
  },
  noteCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f9f9f9',
  },
  refBox: {
    flex: 1,
  },
  refLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#999',
    textTransform: 'uppercase',
  },
  refValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 2,
  },
  downloadBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoCol: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 10,
    color: '#999',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  infoVal: {
    fontSize: 13,
    fontWeight: '700',
    color: '#444',
  },
});

export default ContractNoteScreen;
