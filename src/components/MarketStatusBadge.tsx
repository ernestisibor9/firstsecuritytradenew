import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Clock } from 'lucide-react-native';

interface MarketStatusBadgeProps {
  style?: any;
}

const MarketStatusBadge: React.FC<MarketStatusBadgeProps> = ({ style }) => {
  const getMarketStatus = () => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    
    // NSE trading hours: 10:00 AM - 2:30 PM (WAT)
    const isOpen = (hour === 10 && minute >= 0) || 
                   (hour > 10 && hour < 14) || 
                   (hour === 14 && minute <= 30);
    
    return {
      isOpen,
      label: isOpen ? 'Market Open' : 'Market Closed',
      color: isOpen ? '#065f46' : '#991b1b',
      bgColor: isOpen ? '#d1fae5' : '#fee2e2'
    };
  };

  const status = getMarketStatus();

  return (
    <View style={[styles.badge, { backgroundColor: status.bgColor }, style]}>
      <Clock size={16} color={status.color} />
      <Text style={[styles.badgeText, { color: status.color }]}>
        {status.label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default MarketStatusBadge;
