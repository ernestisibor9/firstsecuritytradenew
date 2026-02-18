import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Footer = () => (
  <View style={styles.riskDisclaimer}>
    <Text style={styles.warningTitle}>Risk Disclaimer:</Text>
    <Text style={styles.warningText}>
      Trading involves substantial risk of loss. Past performance is not indicative of future results.
    </Text>
  </View>
)

const styles = StyleSheet.create({
  riskDisclaimer: {
    backgroundColor: '#FFFBEB',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FEF3C7',
    marginTop: 40
  },
  warningTitle: {
    fontWeight: 'bold',
    color: '#92400E',
    marginBottom: 4
  },
  warningText: {
    fontSize: 12,
    color: '#B45309'
  }
})

export default Footer
