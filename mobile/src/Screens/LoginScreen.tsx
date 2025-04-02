import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Platform, Dimensions, Image, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestBluetoothPermission, getMacAddress } from '../services/BluetoothService';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

// Tester email et mot de passe
const TEST_EMAIL = 'ouiam@etudiant.com';
const TEST_PASSWORD = '123456789';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureEntry, setSecureEntry] = useState(true);
  const [macAddress, setMacAddress] = useState(null);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const handleGoBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    headerShown: false, // Masquer la navbar

    requestBluetoothPermission(); // Demander la permission Bluetooth dès l'entrée de l'écran
  }, []);

  // Fonction pour récupérer la liste des adresses MAC enregistrées
  const getStoredMacs = async () => {
    try {
      const storedMacs = await AsyncStorage.getItem('registeredMacs');
      return storedMacs ? JSON.parse(storedMacs) : [];
    } catch (error) {
      console.error('Erreur lors de la lecture du stockage local', error);
      return [];
    }
  };

  // Fonction pour enregistrer une nouvelle adresse MAC
  const storeMacAddress = async (mac: string) => {
    try {
      const macList = await getStoredMacs();
      if (!macList.includes(mac)) {
        macList.push(mac);
        await AsyncStorage.setItem('registeredMacs', JSON.stringify(macList));
        Alert.alert('Succès', `Adresse MAC ${mac} enregistrée avec succès.`);
      }
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de l\'adresse MAC', error);
    }
  };

  // Fonction de gestion du login
  const handleLogin = async () => {
    if (email !== TEST_EMAIL || password !== TEST_PASSWORD) {
      Alert.alert('Erreur', 'Email ou mot de passe incorrect');
      return;
    }

    const mac = await getMacAddress();
    if (!mac) {
      Alert.alert('Erreur', 'Impossible de récupérer l\'adresse MAC');
      return;
    }

    setMacAddress(mac);

    const storedMacs = await getStoredMacs();
    if (storedMacs.includes(mac)) {
      Alert.alert('Succès', 'Adresse MAC déjà enregistrée, redirection...');
    } else {
      await storeMacAddress(mac);
    }

    // Rediriger vers l'écran principal
    navigation.replace('InterfacePrincipale');
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
      <View style={styles.header}>
  <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
    <View style={styles.circleButton}>
      <Icon name="arrow-back" type="material" size={28} color="white" />
    </View>
  </TouchableOpacity>
  <Image source={require('../Images/dd.png')} style={styles.logo} />
</View>

        <Text style={styles.welcomeText}>Welcome back</Text>
        <Text style={styles.subtitle}>Manage your school attendance efficiently</Text>

        <View style={styles.inputContainer}>
          <Icon name="email" type="material" size={28} color="gray" />
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your email"
              placeholderTextColor="gray"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => setIsEmailFocused(false)}
            />
            <View style={styles.underlineWrapper}>
              {isEmailFocused ? (
                <LinearGradient colors={['#f9fb7f', '#78ffc9']} style={styles.gradientUnderline} />
              ) : (
                <View style={styles.defaultUnderline} />
              )}
            </View>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Icon name="lock" type="material" size={28} color="gray" />
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your password"
              placeholderTextColor="gray"
              secureTextEntry={secureEntry}
              value={password}
              onChangeText={setPassword}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
            />
            <TouchableOpacity onPress={() => setSecureEntry((prev) => !prev)} style={styles.iconWrapper}>
              <Icon name={secureEntry ? 'visibility-off' : 'visibility'} type="material" size={20} color="gray" />
            </TouchableOpacity>
            <View style={styles.underlineWrapper}>
              {isPasswordFocused ? (
                <LinearGradient colors={['#f9fb7f', '#78ffc9']} style={styles.gradientUnderline} />
              ) : (
                <View style={styles.defaultUnderline} />
              )}
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ForgetPass')}>
  <View style={styles.forgotPasswordButton}>
    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
  </View>
</TouchableOpacity>
        <TouchableOpacity onPress={handleLogin}>
          <LinearGradient
            colors={['#f9fb7f', '#78ffc9']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.loginButtonWrapper}
          >
            <Text style={styles.loginText}>Login</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Images en zigzag sous le bouton Login */}
        <View style={styles.imageRow}>
          <View style={styles.imageWrapper}></View>
          <View style={styles.imageWrapperr}></View>
          <View style={styles.imageWrapper}>
            <Image source={require('../Images/b2.png')} style={styles.smallImage} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', paddingHorizontal: width * 0.05, paddingTop: height * 0.08 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: height * 0.0 },
  logo: { width: width * 0.30, height: height * 0.15, marginTop: height * -0.05, marginBottom: height * 0.02 },
  welcomeText: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: height * 0.01 },
  subtitle: { fontSize: 16, textAlign: 'center', color: 'gray', marginBottom: height * 0.03 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: height * 0.01, marginTop: height * 0.04 },
  textInput: { flex: 1, paddingHorizontal: width * 0.03, height: height * 0.06 },
  focusedInput: { transform: [{ scale: 1.05 }] },
  inputUnderline: { height: 2, backgroundColor: 'gray', marginTop: 5 },
  focusedUnderline: { backgroundColor: '#78ffc9' },
  loginButtonWrapper: { backgroundColor: '#c7fceb', borderRadius: height * 0.03, marginTop: height * 0.1 },
  loginText: { color: 'white', fontSize: height * 0.03, textAlign: 'center', paddingVertical: height * 0.015, fontWeight: 'bold' },
  imageRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: height * 0.05 },
  imageWrapper: { marginHorizontal: width * 0.03, marginTop: width * -0.02 },
  smallImage: { width: width * 0.5, height: height * 0.2, resizeMode: 'contain' },
  imageWrapperr: { marginTop: width * 0.05 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: height * 0.015,
    marginTop: height * 0.04,
  },
  inputWrapper: {
    flex: 1,
    borderBottomWidth: 0, // Supprime toute bordure par défaut
  },
  textInput: {
    paddingHorizontal: width * 0.03,
    height: height * 0.06,
    fontSize: 16,
  },
  iconWrapper: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  underlineWrapper: {
    height: 2,
    marginLeft: width*-0.08,
    width: '110%',
    marginTop: 0, // Ajuste pour que ce soit directement sous le TextInput
  },
  defaultUnderline: {
    height: 2,
    backgroundColor: 'gray',
    width: '100%',
  },
  gradientUnderline: {
    height: 2,
    width: '100%',
  },

  forgotPasswordButton: {
    alignItems: 'center',
    marginLeft: width * 0.58,
    marginTop: 10, // Espace entre le champ de mot de passe et le bouton
  },
  forgotPasswordText: {
    color: '#ccc', // Couleur du texte
    fontSize: 14, // Taille de la police
    fontWeight: 'bold', // Gras
  },
  backButton: {
    position: 'absolute',
    left: width * -0.03, // Décalage du bouton depuis le bord gauche
    top: width * -0.13,  // Décalage du bouton depuis le bord supérieur
  },
  
  circleButton: {
    backgroundColor: '#ccc', // Couleur du cercle
    borderRadius: width*0.08, // Pour rendre le bouton rond
    width: width*0.12, // Taille du cercle
    height: width*0.12, // Taille du cercle
    justifyContent: 'center',
    alignItems: 'center', // Centrer l'icône dans le cercle
  }
  
  
});

export default LoginScreen;
