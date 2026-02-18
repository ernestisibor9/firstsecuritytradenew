import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { ChevronLeft, PlayCircle, BookOpen, GraduationCap, Award } from 'lucide-react-native';

const EducationScreen = ({ navigation }: any) => {
  const courses = [
    { id: '1', title: 'Stock Market 101', modules: 6, level: 'Beginner', duration: '45m' },
    { id: '2', title: 'Fundamental Analysis', modules: 12, level: 'Intermediate', duration: '2.5h' },
    { id: '3', title: 'Trading Strategies', modules: 15, level: 'Advanced', duration: '4h' },
    { id: '4', title: 'Risk Management', modules: 8, level: 'Beginner', duration: '1h' },
  ];

  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.courseCard}>
      <View style={styles.courseIconBox}>
         <PlayCircle size={28} color="#0D224C" />
      </View>
      <View style={styles.courseContent}>
        <View style={styles.courseHeader}>
           <Text style={styles.levelText}>{item.level}</Text>
           <Text style={styles.durationText}>{item.duration}</Text>
        </View>
        <Text style={styles.courseTitle}>{item.title}</Text>
        <Text style={styles.moduleCount}>{item.modules} Modules</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={28} color="#0D224C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Academy</Text>
        <TouchableOpacity>
           <Award size={24} color="#F59E0B" />
        </TouchableOpacity>
      </View>

      <FlatList 
        data={courses}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={() => (
           <View style={styles.hero}>
              <GraduationCap size={48} color="#0D224C" />
              <Text style={styles.heroTitle}>Level Up Your Trading</Text>
              <Text style={styles.heroSub}>Master the markets with our structured courses</Text>
              <View style={styles.progressBox}>
                 <View style={styles.progressInfo}>
                    <Text style={styles.progressLabel}>Overall Progress</Text>
                    <Text style={styles.progressVal}>40%</Text>
                 </View>
                 <View style={styles.progressLineBg}>
                    <View style={[styles.progressLineFill, { width: '40%' }]} />
                 </View>
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
  listContent: {
    padding: 16,
  },
  hero: {
    backgroundColor: '#F9FAFB',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#eee',
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0D224C',
    marginTop: 16,
  },
  heroSub: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 24,
  },
  progressBox: {
    width: '100%',
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#666',
    textTransform: 'uppercase',
  },
  progressVal: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0D224C',
  },
  progressLineBg: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressLineFill: {
    height: '100%',
    backgroundColor: '#0D224C',
  },
  courseCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
  },
  courseIconBox: {
    width: 60,
    height: 60,
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  courseContent: {
    flex: 1,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  levelText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#3B82F6',
    textTransform: 'uppercase',
  },
  durationText: {
    fontSize: 10,
    color: '#999',
    fontWeight: '600',
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  moduleCount: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
});

export default EducationScreen;
