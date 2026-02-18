import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, StatusBar, SafeAreaView, Alert, Platform } from 'react-native';
import { ChevronLeft, User, Briefcase, Landmark, CreditCard, Camera, Check } from 'lucide-react-native';

const NewCustomerScreen = ({ navigation }: any) => {
  const [step, setStep] = useState(1);
  const totalSteps = 7;
  const [formData, setFormData] = useState<any>({
    title: 'Mr',
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
    gender: 'Male',
    phone: '',
    maritalStatus: 'Single',
    motherMaidenName: '',
    nationality: 'Nigeria',
    stateOrigin: 'Lagos',
    lga: '',
    placeBirth: '',
    houseNo: '',
    street: '',
    city: '',
    resState: '',
    employmentStatus: '',
    occupation: '',
    employmentDate: '',
    employerName: '',
    employerAddress: '',
    employerCity: '',
    employerCountry: 'Nigeria',
    employerState: '',
    employerLga: '',
    annualIncome: '',
    officeNo: '',
    nokFirstName: '',
    nokMiddleName: '',
    nokLastName: '',
    nokEmail: '',
    nokRelationship: '',
    nokGender: '',
    nokPhone: '',
    bankName: '',
    bankAccName: '',
    bankAccNo: '',
    bankBvn: '',
    bankOpenedDate: '',
    idType: '',
    idNo: '',
    idExpiry: '',
    consent: false,
    attest: false,
    terms: false
  });

  const updateField = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
    else {
      if (!formData.attest || !formData.terms) {
        Alert.alert('Incomplete', 'Please accept the attestation and terms & conditions.');
        return;
      }
      Alert.alert('Application Submitted', 'Thank you for choosing First Securities. Our compliance team will review your documents and contact you within 48 hours.', [
        { text: 'Back to Home', onPress: () => navigation.navigate('Welcome') }
      ]);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
    else navigation.goBack();
  };

  const getStepName = () => {
    switch (step) {
      case 1: return 'Personal Details';
      case 2: return 'Employment Details';
      case 3: return 'Next of Kin';
      case 4: return 'Bank Information';
      case 5: return 'Identification';
      case 6: return 'Upload Documents';
      case 7: return 'Summary & Review';
      default: return '';
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <View style={styles.row}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} value={formData.title} onChangeText={(v) => updateField('title', v)} placeholder="Mr" />
              </View>
              <View style={{ flex: 2 }}>
                <Text style={styles.label}>First Name</Text>
                <TextInput style={styles.input} value={formData.firstName} onChangeText={(v) => updateField('firstName', v)} placeholder="John" />
              </View>
            </View>
            <View style={styles.row}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <Text style={styles.label}>Middle Name</Text>
                <TextInput style={styles.input} value={formData.middleName} onChangeText={(v) => updateField('middleName', v)} placeholder="Michael" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Last Name</Text>
                <TextInput style={styles.input} value={formData.lastName} onChangeText={(v) => updateField('lastName', v)} placeholder="Doe" />
              </View>
            </View>
            <Text style={styles.label}>Email Address</Text>
            <TextInput style={styles.input} value={formData.email} onChangeText={(v) => updateField('email', v)} placeholder="john.doe@example.com" keyboardType="email-address" />
            <View style={styles.row}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <Text style={styles.label}>Password</Text>
                <TextInput style={styles.input} value={formData.password} onChangeText={(v) => updateField('password', v)} placeholder="••••••••" secureTextEntry />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput style={styles.input} value={formData.confirmPassword} onChangeText={(v) => updateField('confirmPassword', v)} placeholder="••••••••" secureTextEntry />
              </View>
            </View>
            <View style={styles.row}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <Text style={styles.label}>Date of Birth</Text>
                <TextInput style={styles.input} value={formData.dob} onChangeText={(v) => updateField('dob', v)} placeholder="YYYY-MM-DD" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Gender</Text>
                <TextInput style={styles.input} value={formData.gender} onChangeText={(v) => updateField('gender', v)} placeholder="Male" />
              </View>
            </View>
            <View style={styles.row}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <Text style={styles.label}>Mobile Number</Text>
                <TextInput style={styles.input} value={formData.phone} onChangeText={(v) => updateField('phone', v)} placeholder="08012345678" keyboardType="phone-pad" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Marital Status</Text>
                <TextInput style={styles.input} value={formData.maritalStatus} onChangeText={(v) => updateField('maritalStatus', v)} placeholder="Single" />
              </View>
            </View>
            <Text style={styles.divider}>Residential Address</Text>
            <View style={styles.row}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <Text style={styles.label}>House No</Text>
                <TextInput style={styles.input} value={formData.houseNo} onChangeText={(v) => updateField('houseNo', v)} placeholder="10" />
              </View>
              <View style={{ flex: 2 }}>
                <Text style={styles.label}>Street</Text>
                <TextInput style={styles.input} value={formData.street} onChangeText={(v) => updateField('street', v)} placeholder="Broad Street" />
              </View>
            </View>
          </View>
        );
      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.label}>Employment Status</Text>
            <TextInput style={styles.input} value={formData.employmentStatus} onChangeText={(v) => updateField('employmentStatus', v)} placeholder="Employed" />
            <Text style={styles.label}>Occupation</Text>
            <TextInput style={styles.input} value={formData.occupation} onChangeText={(v) => updateField('occupation', v)} placeholder="Professional" />
            <Text style={styles.label}>Employer's Name</Text>
            <TextInput style={styles.input} value={formData.employerName} onChangeText={(v) => updateField('employerName', v)} placeholder="Employer Name" />
            <Text style={styles.label}>Annual Income</Text>
            <TextInput style={styles.input} value={formData.annualIncome} onChangeText={(v) => updateField('annualIncome', v)} placeholder="Less than 1M" />
          </View>
        );
      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.label}>First Name</Text>
            <TextInput style={styles.input} value={formData.nokFirstName} onChangeText={(v) => updateField('nokFirstName', v)} placeholder="First Name" />
            <Text style={styles.label}>Last Name</Text>
            <TextInput style={styles.input} value={formData.nokLastName} onChangeText={(v) => updateField('nokLastName', v)} placeholder="Last Name" />
            <Text style={styles.label}>Relationship</Text>
            <TextInput style={styles.input} value={formData.nokRelationship} onChangeText={(v) => updateField('nokRelationship', v)} placeholder="Spouse" />
            <Text style={styles.label}>Mobile Number</Text>
            <TextInput style={styles.input} value={formData.nokPhone} onChangeText={(v) => updateField('nokPhone', v)} placeholder="080..." keyboardType="phone-pad" />
          </View>
        );
      case 4:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.label}>Name of Bank</Text>
            <TextInput style={styles.input} value={formData.bankName} onChangeText={(v) => updateField('bankName', v)} placeholder="GTBank" />
            <Text style={styles.label}>Account Name</Text>
            <TextInput style={styles.input} value={formData.bankAccName} onChangeText={(v) => updateField('bankAccName', v)} placeholder="Account Name" />
            <Text style={styles.label}>Account Number</Text>
            <TextInput style={styles.input} value={formData.bankAccNo} onChangeText={(v) => updateField('bankAccNo', v)} placeholder="0123456789" keyboardType="numeric" maxLength={10} />
            <Text style={styles.label}>BVN Number</Text>
            <TextInput style={styles.input} value={formData.bankBvn} onChangeText={(v) => updateField('bankBvn', v)} placeholder="22212345678" keyboardType="numeric" maxLength={11} />
          </View>
        );
      case 5:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.label}>Form of Identification</Text>
            <TextInput style={styles.input} value={formData.idType} onChangeText={(v) => updateField('idType', v)} placeholder="National ID (NIN)" />
            <Text style={styles.label}>ID Number</Text>
            <TextInput style={styles.input} value={formData.idNo} onChangeText={(v) => updateField('idNo', v)} placeholder="ID Number" />
            <Text style={styles.label}>Date of Expiry</Text>
            <TextInput style={styles.input} value={formData.idExpiry} onChangeText={(v) => updateField('idExpiry', v)} placeholder="YYYY-MM-DD" />
          </View>
        );
      case 6:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.uploadInfo}>File extensions allowed are jpeg, jpg, png or pdf max file size is 2MB</Text>
            <TouchableOpacity style={styles.uploadBtn}>
              <Camera size={24} color="#666" />
              <Text style={styles.uploadText}>Passport Photo (required)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.uploadBtn}>
              <Camera size={24} color="#666" />
              <Text style={styles.uploadText}>ID (required)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.uploadBtn}>
               <Camera size={24} color="#666" />
               <Text style={styles.uploadText}>Signature (required)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.uploadBtn}>
               <Camera size={24} color="#666" />
               <Text style={styles.uploadText}>Utility Bill (required)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.checkboxRow} onPress={() => updateField('consent', !formData.consent)}>
              <View style={[styles.checkbox, formData.consent && styles.checkboxActive]}>
                {formData.consent && <Check size={12} color="#fff" />}
              </View>
              <Text style={styles.checkboxLabel}>I agree to electronic signature consent terms.</Text>
            </TouchableOpacity>
          </View>
        );
      case 7:
        return (
          <View style={styles.stepContainer}>
            <View style={styles.reviewBox}>
              <Text style={styles.reviewTitle}>Review Your Application</Text>
              <View style={styles.reviewRow}><Text style={styles.reviewLabel}>Full Name:</Text><Text style={styles.reviewValue}>{formData.firstName} {formData.lastName}</Text></View>
              <View style={styles.reviewRow}><Text style={styles.reviewLabel}>Email:</Text><Text style={styles.reviewValue}>{formData.email}</Text></View>
              <View style={styles.reviewRow}><Text style={styles.reviewLabel}>Bank:</Text><Text style={styles.reviewValue}>{formData.bankName}</Text></View>
              <View style={styles.reviewRow}><Text style={styles.reviewLabel}>Acc No:</Text><Text style={styles.reviewValue}>{formData.bankAccNo}</Text></View>
            </View>
            <TouchableOpacity style={styles.checkboxRow} onPress={() => updateField('attest', !formData.attest)}>
              <View style={[styles.checkbox, formData.attest && styles.checkboxActive]}>
                {formData.attest && <Check size={12} color="#fff" />}
              </View>
              <Text style={styles.checkboxLabel}>I attest that all information provided is true and correct.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.checkboxRow} onPress={() => updateField('terms', !formData.terms)}>
              <View style={[styles.checkbox, formData.terms && styles.checkboxActive]}>
                {formData.terms && <Check size={12} color="#fff" />}
              </View>
              <Text style={styles.checkboxLabel}>I agree to the Terms & Conditions and Privacy Policy.</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={prevStep}>
          <ChevronLeft size={28} color="#0D224C" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
           <Text style={styles.headerTitle}>Open New Account</Text>
        </View>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressLabels}>
          <Text style={styles.stepLabel}>Step {step} of {totalSteps}</Text>
          <Text style={styles.stepName}>{getStepName()}</Text>
        </View>
        <View style={styles.progressTrack}>
           <View style={[styles.progressFill, { width: `${(step / totalSteps) * 100}%` }]} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {renderStep()}
        
        <View style={styles.buttonRow}>
          {step > 1 && (
            <TouchableOpacity style={styles.secondaryButton} onPress={prevStep}>
              <Text style={styles.secondaryButtonText}>Previous</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={[styles.primaryButton, { flex: 1 }]} onPress={nextStep}>
            <Text style={styles.buttonText}>{step === totalSteps ? 'Submit' : 'Next'}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>Save Progress for Later</Text>
        </TouchableOpacity>
      </ScrollView>
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
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0D224C',
  },
  progressSection: {
    padding: 20,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  stepLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#9ca3af',
    textTransform: 'uppercase',
  },
  stepName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#9ca3af',
    textTransform: 'uppercase',
  },
  progressTrack: {
    height: 6,
    backgroundColor: '#f3f4f6',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#22C55E',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  stepContainer: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 4,
  },
  divider: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    marginTop: 16,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    paddingBottom: 4,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  uploadInfo: {
    fontSize: 10,
    color: '#ef4444',
    marginBottom: 16,
  },
  uploadBtn: {
    height: 60,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9fafb',
    marginBottom: 12,
  },
  uploadText: {
    marginLeft: 10,
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: '#0D224C',
    borderColor: '#0D224C',
  },
  checkboxLabel: {
    fontSize: 12,
    color: '#4b5563',
    flex: 1,
  },
  reviewBox: {
    backgroundColor: '#f9fafb',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  reviewTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 12,
  },
  reviewRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  reviewLabel: {
    fontSize: 12,
    color: '#6b7280',
    width: 80,
  },
  reviewValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1f2937',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  primaryButton: {
    backgroundColor: '#0D224C',
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#4b5563',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveBtn: {
    marginTop: 16,
    alignItems: 'center',
  },
  saveBtnText: {
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: '600',
  },
});

export default NewCustomerScreen;
