import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions, Image } from 'react-native';
import { ChevronRight, TrendingUp, ShieldCheck, Zap } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const Onboarding = ({ navigation, onFinish }: any) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: 'Secure Trading',
      desc: 'Execute trades directly on the NGX with institutional-grade security.',
      icon: <ShieldCheck size={120} color="#0D224C" />,
    },
    {
      title: 'Real-time Analytics',
      desc: 'Access live L2 data and expert research anytime, anywhere.',
      icon: <TrendingUp size={120} color="#0D224C" />,
    },
    {
      title: 'Fast Settlement',
      desc: 'Seamless funding and withdrawals with T+3 settlement cycle.',
      icon: <Zap size={120} color="#0D224C" />,
    },
  ];

  const handleNext = () => {
    if (activeSlide < slides.length - 1) setActiveSlide(activeSlide + 1);
    else {
      onFinish?.();
      navigation.navigate('Welcome');
    }
  };

  const handleSkip = () => {
    onFinish?.();
    navigation.navigate('Welcome');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity 
        style={styles.skipBtn}
        onPress={handleSkip}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <View style={styles.slideContainer}>
        <View style={styles.iconBox}>
          {slides[activeSlide].icon}
        </View>
        <Text style={styles.title}>{slides[activeSlide].title}</Text>
        <Text style={styles.desc}>{slides[activeSlide].desc}</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {slides.map((_, i) => (
            <View 
              key={i} 
              style={[styles.dot, activeSlide === i && styles.activeDot]} 
            />
          ))}
        </View>

        <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
          <Text style={styles.nextText}>{activeSlide === slides.length - 1 ? 'Get Started' : 'Next'}</Text>
          <ChevronRight size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  skipBtn: {
    padding: 20,
    alignSelf: 'flex-end',
  },
  skipText: {
    color: '#999',
    fontWeight: '600',
    fontSize: 16,
  },
  slideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  iconBox: {
    marginBottom: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0D224C',
    textAlign: 'center',
    marginBottom: 16,
  },
  desc: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    padding: 40,
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#eee',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#0D224C',
    width: 24,
  },
  nextBtn: {
    width: '100%',
    height: 56,
    backgroundColor: '#0D224C',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
});

export default Onboarding;