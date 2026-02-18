import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  StyleSheet,
  Alert,
  Platform,
  StatusBar
} from 'react-native'
import { useAuth } from '../context/AuthContext'
import apiService from '../services/apiService'
import AppStatusBar from '../components/AppStatusBar'
import Footer from '../components/Footer'

const WelcomeScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')
  const [formData, setFormData] = useState({
    customerId: '',
    password: '',
    rememberMe: false
  })
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()

  const handleLogin = async () => {
    if (!formData.customerId || !formData.password) {
      Alert.alert('Error', 'Please enter your customer ID and password')
      return
    }

    setLoading(true)
    try {
      const userData = await apiService.login({
        customerId: formData.customerId,
        password: formData.password,
        brokerCode: 'FIRST_SECURITIES'
      })

      await login(userData as any)
    } catch (err) {
      Alert.alert('Login Failed', 'Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppStatusBar />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={{
              uri: 'https://first-securities.com/wp-content/uploads/2025/02/cropped-favicon-192x192.png'
            }}
            style={styles.logo}
          />
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Sign in to manage your portfolio</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => setActiveTab('login')}
            style={[styles.tab, activeTab === 'login' && styles.activeTab]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'login' && styles.activeTabText
              ]}
            >
              Log In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('register')}
            style={[styles.tab, activeTab === 'register' && styles.activeTab]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'register' && styles.activeTabText
              ]}
            >
              Register
            </Text>
          </TouchableOpacity>
        </View>

        {/* Form Content */}
        {activeTab === 'login' ? (
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Customer ID</Text>
              <TextInput
                style={styles.input}
                placeholder='Enter Customer ID'
                value={formData.customerId}
                onChangeText={text =>
                  setFormData({ ...formData, customerId: text })
                }
                autoCapitalize='none'
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder='Enter Password'
                secureTextEntry
                value={formData.password}
                onChangeText={text =>
                  setFormData({ ...formData, password: text })
                }
              />
            </View>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Text>
            </TouchableOpacity>

            <View style={styles.forgotContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}
              >
                <Text style={styles.linkText}>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotCustomerId')}
              >
                <Text style={styles.linkText}>Forgot ID?</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.registerContainer}>
            <Text style={styles.registerTitle}>New Account</Text>
            <Text style={styles.registerDescription}>
              Registering for online access requires KYC verification. Choose
              your account type to proceed.
            </Text>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => navigation.navigate('NewCustomer')}
            >
              <Text style={styles.secondaryButtonText}>Open New Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.secondaryButton, { marginTop: 12 }]}
              onPress={() => navigation.navigate('ExistingCustomer')}
            >
              <Text style={styles.secondaryButtonText}>
                I'm an Existing Client
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginTop: 24 }}
              onPress={() => setActiveTab('login')}
            >
              <Text style={styles.linkText}>
                Already have an account? Log In
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Footer */}
        <Footer />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 48 // extra bottom spacing
  },
  header: {
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 15
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 16
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0D224C'
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center'
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#0D224C'
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#999'
  },
  activeTabText: {
    color: '#0D224C'
  },
  form: {
    width: '100%'
  },
  warningBox: {
    backgroundColor: '#FFFBEB',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FEF3C7',
    borderBottomWidth: 2, // thicker bottom
    marginBottom: 20,
    overflow: 'hidden'
  },
  inputGroup: {
    marginBottom: 16
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#999',
    textTransform: 'uppercase',
    marginBottom: 8,
    marginLeft: 4
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#F9FAFB'
  },
  primaryButton: {
    backgroundColor: '#0D224C',
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  forgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24
  },
  linkText: {
    color: '#666',
    fontSize: 14
  },
  registerContainer: {
    alignItems: 'center'
  },
  registerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0D224C',
    marginBottom: 12
  },
  registerDescription: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 24,
    lineHeight: 20
  },
  secondaryButton: {
    width: '100%',
    height: 56,
    borderWidth: 2,
    borderColor: '#0D224C',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  secondaryButtonText: {
    color: '#0D224C',
    fontSize: 16,
    fontWeight: 'bold'
  }
})

export default WelcomeScreen
