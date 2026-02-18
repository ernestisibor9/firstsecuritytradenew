import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';

enableScreens(true);

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator } from 'react-native';

import { AuthProvider, useAuth } from './context/AuthContext';
import { MarketProvider } from './context/MarketContext';
import SplashScreen from './components/SplashScreen';
import WelcomeScreen from './components/WelcomeScreen';
import Dashboard from './components/Dashboard';
import MarketScreen from './components/MarketScreen';
import PortfolioScreen from './components/PortfolioScreen';
import TradeExecutionScreen from './components/TradeExecutionScreen';
import OrderBookScreen from './components/OrderBookScreen';
import FundingScreen from './components/FundingScreen';
import ExistingCustomerScreen from './components/ExistingCustomerScreen';
import NewCustomerScreen from './components/NewCustomerScreen';
import DisclaimerScreen from './components/DisclaimerScreen';
import BiometricScreen from './components/BiometricScreen';
import NotificationsScreen from './components/NotificationsScreen';
import MarketResearchScreen from './components/MarketResearchScreen';
import EducationScreen from './components/EducationScreen';
import SupportScreen from './components/SupportScreen';
import ProfileDetailsScreen from './components/ProfileDetailsScreen';
import OrdersScreen from './components/OrdersScreen';
import SettingsScreen from './components/SettingsScreen';
import ForgotPasswordScreen from './components/ForgotPasswordScreen';
import ForgotCustomerIdScreen from './components/ForgotCustomerIdScreen';

import Onboarding from './components/Onboarding';

const Stack = createStackNavigator();

function AppRoutes() {
  const { user } = useAuth();
  const [firstVisit, setFirstVisit] = useState(true);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <>
          {firstVisit ? (
            <Stack.Screen name="Onboarding">
              {(props) => <Onboarding {...props} onFinish={() => setFirstVisit(false)} />}
            </Stack.Screen>
          ) : null}
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="ExistingCustomer" component={ExistingCustomerScreen} />
          <Stack.Screen name="NewCustomer" component={NewCustomerScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="ForgotCustomerId" component={ForgotCustomerIdScreen} />
          <Stack.Screen name="Disclaimer" component={DisclaimerScreen} />
          <Stack.Screen name="Biometric" component={BiometricScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Market" component={MarketScreen} />
          <Stack.Screen name="Portfolio" component={PortfolioScreen} />
          <Stack.Screen name="Trade" component={TradeExecutionScreen} />
          <Stack.Screen name="OrderBook" component={OrderBookScreen} />
          <Stack.Screen name="Funding" component={FundingScreen} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
          <Stack.Screen name="MarketResearch" component={MarketResearchScreen} />
          <Stack.Screen name="Education" component={EducationScreen} />
          <Stack.Screen name="Support" component={SupportScreen} />
          <Stack.Screen name="ProfileDetails" component={ProfileDetailsScreen} />
          <Stack.Screen name="Orders" component={OrdersScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

function AppWithNavigation() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MarketProvider>
        <AppWithNavigation />
      </MarketProvider>
    </AuthProvider>
  );
}