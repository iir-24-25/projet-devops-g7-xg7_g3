import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const ChangePassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleContinue = () => {
    if (email.trim()) {
      navigation.navigate('CodeVerif', { email: email.trim() });
    } else {
      // You can add validation message here
      console.log('Please enter an email');
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
        <Text style={styles.mainTitle}>Forget Password</Text>

        {/* Subtitle */}
        <Text style={styles.subTitle}>Please enter your email to reset your password</Text>
        <Image source={require('../Images/pass.png')} style={styles.image} />

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Icon name="email" type="material" size={28} color="gray" />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email"
            placeholderTextColor="gray"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Continue Button */}
        <TouchableOpacity onPress={handleContinue} style={styles.continueButton}>
          <LinearGradient
            colors={['#f9fb7f', '#78ffc9']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.continueButtonWrapper}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Cancel Button */}
        <TouchableOpacity onPress={handleGoBack} style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
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
  attendanceTitle: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: width * -0.02,
  },
  header: {
    position: 'absolute',
    left: width * 0.05,
    top: width * 0.05,
    zIndex: 1,
  },
  backButton: {
    position: 'absolute',
    left: width * -0.03, // Décalage du bouton depuis le bord gauche
    top: width * -0.01,  // Décalage du bouton depuis le bord supérieur
  },
  circleButton: {
    backgroundColor: '#ccc',
    borderRadius: width * 0.08,
    width: width * 0.12,
    height: width * 0.12,
    justifyContent: 'center',
    alignItems: 'center',
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: height * 0.02,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    width: '100%',
    marginTop: '-10%',
    paddingVertical: height * 0.015,
  },
  textInput: {
    flex: 1,
    fontSize: width * 0.05,
    paddingHorizontal: width * 0.03,
    height: height * 0.06,
  },
  image: {
    width: width * 1,
    height: height * 0.5,
    resizeMode: 'contain',
    marginTop: height * -0.09,
  },
  continueButton: {
    marginTop: height * 0.05,
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
});

export default ChangePassword;
