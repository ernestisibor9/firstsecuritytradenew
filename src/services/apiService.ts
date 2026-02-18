import AsyncStorage from '@react-native-async-storage/async-storage';

class ApiService {
  private async getHeaders(): Promise<HeadersInit> {
    const userString = await AsyncStorage.getItem('firstSecuritiesUser');
    const user = userString ? JSON.parse(userString) : {};
    const token = user?.token ? `Bearer ${user.token}` : '';
    return {
      'Content-Type': 'application/json',
      'Authorization': token,
    };
  }

  async login(credentials: any) {
    // Mock implementation
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.customerId && credentials.password) {
          resolve({
            id: credentials.customerId,
            name: 'Demo Investor',
            email: 'investor@example.com',
            token: 'mock-jwt-token-' + Math.random().toString(36).substring(7)
          });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1500);
    });
  }

  async getPortfolioSummary(customerId: string) {
    return {
      totalValue: 1227500,
      todaysGain: 76250,
      gainPercentage: 6.62,
      cashBalance: 85000.00,
      marginAvailable: 250000.00
    };
  }
}

export default new ApiService();