import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

type RootStackParamList = {
  ChangePass: undefined;
  Home: undefined;
};

const ChangePass = () => {
  const navigation = useNavigation<any>();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);

  const handleGoBack = () => {
    navigation.goBack();
  };

  // Password validation checks
  const hasEightChars = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasBothCases = /[a-z]/.test(password) && /[A-Z]/.test(password);
  const passwordsMatch = password === confirmPassword && password !== '';

  const handleSave = () => {
    if (hasEightChars && hasNumber && hasBothCases && passwordsMatch) {
      Alert.alert(
        "Success",
        "Password changed successfully!",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate('LoginScreen')
          }
        ]
      );
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {/* Top Image and Title Container */}
        <View style={styles.topContainer}>
          <Image 
            source={require('../Images/dd.png')} 
            style={styles.topImage}
          />
        </View>

        {/* Main Title */}
        <Text style={styles.title}>Change Password</Text>
        <Text style={styles.subtitle}>Please enter a new password</Text>

        {/* Password Inputs Container */}
        <View style={styles.passwordContainer}>
          {/* Password Input */}
          <View style={[styles.inputContainer, isPasswordFocused && styles.inputContainerFocused]}>
            <Icon name="lock" type="material" size={24} color={isPasswordFocused ? "#78ffc9" : "#ccc"} />
            <TextInput
              style={styles.input}
              placeholder="Enter your new password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon 
                name={showPassword ? "visibility" : "visibility-off"} 
                type="material" 
                size={24} 
                color={isPasswordFocused ? "#78ffc9" : "#ccc"} 
              />
            </TouchableOpacity>
          </View>

          {/* Confirm Password Input */}
          <View style={[styles.inputContainer, isConfirmPasswordFocused && styles.inputContainerFocused]}>
            <Icon name="lock" type="material" size={24} color={isConfirmPasswordFocused ? "#78ffc9" : "#ccc"} />
            <TextInput
              style={styles.input}
              placeholder="Confirm your new password"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              onFocus={() => setIsConfirmPasswordFocused(true)}
              onBlur={() => setIsConfirmPasswordFocused(false)}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Icon 
                name={showConfirmPassword ? "visibility" : "visibility-off"} 
                type="material" 
                size={24} 
                color={isConfirmPasswordFocused ? "#78ffc9" : "#ccc"} 
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Validation Rules */}
        <View style={styles.validationContainer}>
          <View style={styles.validationRow}>
            <Icon
              name={hasEightChars ? "check-circle" : "cancel"}
              type="material"
              size={20}
              color={hasEightChars ? "#4CAF50" : "#FF0000"}
            />
            <Text style={[styles.validationText, hasEightChars ? styles.validText : styles.invalidText]}>
              At least 8 characters
            </Text>
          </View>

          <View style={styles.validationRow}>
            <Icon
              name={hasNumber ? "check-circle" : "cancel"}
              type="material"
              size={20}
              color={hasNumber ? "#4CAF50" : "#FF0000"}
            />
            <Text style={[styles.validationText, hasNumber ? styles.validText : styles.invalidText]}>
              At least 1 number
            </Text>
          </View>

          <View style={styles.validationRow}>
            <Icon
              name={hasBothCases ? "check-circle" : "cancel"}
              type="material"
              size={20}
              color={hasBothCases ? "#4CAF50" : "#FF0000"}
            />
            <Text style={[styles.validationText, hasBothCases ? styles.validText : styles.invalidText]}>
              Both upper and lower case are important
            </Text>
          </View>
        </View>

        {!passwordsMatch && password !== '' && confirmPassword !== '' && (
          <Text style={styles.errorText}>Passwords do not match</Text>
        )}

        {/* Save Button */}
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSave}
          disabled={!hasEightChars || !hasNumber || !hasBothCases || !passwordsMatch}
        >
          <LinearGradient
            colors={['#f9fb7f', '#78ffc9']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.08,
    alignItems: 'center',
    minHeight: height,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * -0.1,
  },
  topImage: {
    width: width * 0.2,
    height: width * 0.4,
    resizeMode: 'contain',
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: height * -0.04,
    color: '#000',
  },
  subtitle: {
    fontSize: width * 0.04,
    color: '#999',
    textAlign: 'center',
    marginVertical: height * 0.03,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: height * 0.015,
    marginBottom: height * 0.02,
    width: '100%',
  },
  inputContainerFocused: {
    borderBottomColor: '#78ffc9',
  },
  input: {
    flex: 1,
    marginLeft: width * 0.03,
    fontSize: width * 0.05,
    height: height * 0.06,
  },
  validationContainer: {
    marginTop: height * 0.02,
  },
  validationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.015,
  },
  validationText: {
    marginLeft: width * 0.02,
    fontSize: width * 0.04,
  },
  validText: {
    color: '#999',
  },
  invalidText: {
    color: '#999',
  },
  errorText: {
    color: '#FF0000',
    fontSize: width * 0.04,
    marginTop: height * 0.01,
    textAlign: 'center',
  },
  saveButton: {
    marginTop: height * 0.04,
    width: '100%',
  },
  gradientButton: {
    borderRadius: height * 0.03,
    paddingVertical: height * 0.02,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
  passwordContainer: {
    width: '100%',
    marginTop: height * 0.1,
  },
});

export default ChangePass;
