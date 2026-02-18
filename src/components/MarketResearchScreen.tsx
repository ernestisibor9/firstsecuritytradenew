import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Platform, StatusBar, SafeAreaView, Image } from 'react-native';
import { ChevronLeft, FileText, Download, Calendar, Clock } from 'lucide-react-native';

const MarketResearchScreen = ({ navigation }: any) => {
  const reports = [
    { id: '1', title: 'Banking Sector Q3 Review', category: 'Sector Report', date: 'Oct 15, 2025', readTime: '5 min' },
    { id: '2', title: 'Macroeconomic Outlook 2026', category: 'Macro Report', date: 'Oct 12, 2025', readTime: '12 min' },
    { id: '3', title: 'MTN Nigeria: Buy Rating maintained', category: 'Equity Pick', date: 'Oct 10, 2025', readTime: '8 min' },
    { id: '4', title: 'Fixed Income Strategy', category: 'Strategy', date: 'Oct 08, 2025', readTime: '10 min' },
  ];

  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.reportCard}>
      <View style={styles.reportHeader}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        <TouchableOpacity>
           <Download size={18} color="#0D224C" />
        </TouchableOpacity>
      </View>
      <Text style={styles.reportTitle}>{item.title}</Text>
      <View style={styles.reportFooter}>
        <View style={styles.footerItem}>
           <Calendar size={14} color="#999" />
           <Text style={styles.footerText}>{item.date}</Text>
        </View>
        <View style={[styles.footerItem, { marginLeft: 16 }]}>
           <Clock size={14} color="#999" />
           <Text style={styles.footerText}>{item.readTime} read</Text>
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
        <Text style={styles.headerTitle}>Research</Text>
        <View style={{ width: 28 }} />
      </View>

      <FlatList 
        data={reports}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={() => (
           <View style={styles.featuredBox}>
              <View style={styles.featuredContent}>
                 <Text style={styles.featuredLabel}>Featured Report</Text>
                 <Text style={styles.featuredTitle}>Nigeria's ASI Index: Journey to 100,000 Points</Text>
                 <TouchableOpacity style={styles.readBtn}>
                    <Text style={styles.readBtnText}>Read Full Analysis</Text>
                 </TouchableOpacity>
              </View>
           </View>
        )}
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
  listContent: {
    padding: 16,
  },
  featuredBox: {
    backgroundColor: '#0D224C',
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    overflow: 'hidden',
  },
  featuredContent: {
    zIndex: 1,
  },
  featuredLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 8,
  },
  featuredTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 28,
    marginBottom: 20,
  },
  readBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  readBtnText: {
    color: '#0D224C',
    fontSize: 12,
    fontWeight: 'bold',
  },
  reportCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    backgroundColor: '#E0E7FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    color: '#4338CA',
    fontSize: 10,
    fontWeight: 'bold',
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    lineHeight: 22,
    marginBottom: 16,
  },
  reportFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 6,
  },
});

export default MarketResearchScreen;
