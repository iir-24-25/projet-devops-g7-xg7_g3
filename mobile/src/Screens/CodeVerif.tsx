import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

interface RouteParams {
  email: string;
}

type RootStackParamList = {
  ChangePass: undefined;
};

const CodeVerif = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const email = (route.params as RouteParams)?.email || 'your email';
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleVerify = () => {
    if (isOtpComplete) {
      navigation.navigate('ChangePass');
    }
  };

  const isOtpComplete = otp.every(digit => digit !== '');

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus next input
    if (text && index < 4 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Image and Title Container */}
      <View style={styles.topContainer}>
        <Image 
          source={require('../Images/dd.png')} 
          style={styles.topImage}
        />
      </View>

      {/* Main Title */}
      <Text style={styles.mainTitle}>Enter Verification Code</Text>

      {/* Subtitle */}
      <Text style={styles.subTitle}>We have sent a code to <Text style={styles.emailText}>{email}</Text></Text>

      {/* OTP Input Container */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <View key={index} style={styles.otpBoxContainer}>
            <TextInput
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              style={styles.otpInput}
              maxLength={1}
              keyboardType="number-pad"
              value={digit}
              onChangeText={(text) => handleOtpChange(text, index)}
            />
            {!digit && <View style={styles.otpDot} />}
          </View>
        ))}
      </View>

      {/* Verify Button */}
      <TouchableOpacity 
        onPress={handleVerify} 
        style={styles.continueButton}
        disabled={!isOtpComplete}
      >
        <LinearGradient
          colors={isOtpComplete ? ['#f9fb7f', '#78ffc9'] : ['#e0e0e0', '#f5f5f5']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.continueButtonWrapper}
        >
          <Text style={styles.continueButtonText}>Verify</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Cancel Button */}
      <TouchableOpacity onPress={handleGoBack} style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>

      {/* Bottom Images */}
      <View style={styles.bottomImagesContainer}>
        <Image 
          source={require('../Images/ver1.png')} 
          style={[styles.bottomImage, styles.bottomImageLeft]}
        />
        <Image 
          source={require('../Images/ver2.png')} 
          style={[styles.bottomImage, styles.bottomImageCenter]}
        />
        <Image 
          source={require('../Images/ver3.png')} 
          style={[styles.bottomImage, styles.bottomImageRight]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.08,
    alignItems: 'center',
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
  mainTitle: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: height * -0.04,
    color: '#000',
  },
  subTitle: {
    fontSize: width * 0.04,
    textAlign: 'center',
    color: '#ccc',
    marginVertical: height * 0.03,
  },
  emailText: {
    color: '#666',
    fontWeight: '500',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    marginTop: height * 0.02,
    marginLeft: height * -0.03,

    paddingHorizontal: 0,
    gap: width * 0.02,
  },
  otpBoxContainer: {
    position: 'relative',
    width: width * 0.175,
    height: width * 0.18,
  },
  otpInput: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: width * 0.03,
    textAlign: 'center',
    fontSize: width * 0.1,
    fontWeight: 'bold',
    color: '#000',
  },
  otpDot: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -4 }, { translateY: -4 }],
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
  },
  continueButton: {
    marginTop: height * 0.15,
    width: '100%',
  },
  continueButtonWrapper: {
    borderRadius: height * 0.03,
    paddingVertical: height * 0.018,
    paddingHorizontal: width * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
  cancelButton: {
    marginTop: height * 0.02,
    width: '100%',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: height * 0.03,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  cancelButtonText: {
    color: '#000',
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
  zigzagContainer: {
    width: '100%',
    marginTop: height * 0.1,
    alignItems: 'center',
  },
  zigzagImage: {
    width: width * 0.12,
    height: width * 0.25,
    resizeMode: 'contain',
    marginVertical: height * 0.03,
  },
  zigzagLeft: {
    alignSelf: 'flex-start',
    marginLeft: width * 0.15,
  },
  zigzagRight: {
    alignSelf: 'flex-end',
    marginRight: width * 0.15,
  },
  bottomImagesContainer: {
    width: '100%',
    height: height * 0.3,
    marginTop: height * 0.02,
    position: 'relative',
  },
  bottomImage: {
    width: width * 0.25,
    height: width * 0.5,
    resizeMode: 'contain',
    position: 'absolute',
  },
  bottomImageLeft: {
    left: width * 0.02,
    top: height * 0.01,
    transform: [{ rotate: '-10deg' }],
  },
  bottomImageCenter: {
    left: width * 0.3,
    top: height * 0.01,
    transform: [{ rotate: '5deg' }],
  },
  bottomImageRight: {
    right: width * 0.05,
    top: height * 0.02,
    transform: [{ rotate: '-15deg' }],
  },
});

export default CodeVerif;
