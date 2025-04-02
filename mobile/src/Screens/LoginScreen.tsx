import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Platform, Dimensions, Image, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestBluetoothPermission, getMacAddress } from '../services/BluetoothService';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');
const TEST_EMAIL = 'ouiam@etudiant.com';
const TEST_PASSWORD = '123456789';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureEntry, setSecureEntry] = useState(true);
  const [macAddress, setMacAddress] = useState<string | null>(null);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  useEffect(() => {
    requestBluetoothPermission();
  }, []);

  const getStoredMacs = async () => {
    try {
      const storedMacs = await AsyncStorage.getItem('registeredMacs');
      return storedMacs ? JSON.parse(storedMacs) : [];
    } catch (error) {
      console.error('Erreur lors de la lecture du stockage local', error);
      return [];
    }
  };

  const storeMacAddress = async (mac: string) => {
    try {
      const macList = await getStoredMacs();
      if (!macList.includes(mac)) {
        macList.push(mac);
        await AsyncStorage.setItem('registeredMacs', JSON.stringify(macList));
        Alert.alert('Succès', `Adresse MAC ${mac} enregistrée avec succès.`);
      }
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de l'adresse MAC", error);
    }
  };

  const handleLogin = async () => {
    if (email !== TEST_EMAIL || password !== TEST_PASSWORD) {
      Alert.alert('Erreur', 'Email ou mot de passe incorrect');
      return;
    }

    const mac = await getMacAddress();
    if (!mac) {
      Alert.alert('Erreur', "Impossible de récupérer l'adresse MAC");
      return;
    }

    setMacAddress(mac);

    const storedMacs = await getStoredMacs();
    if (storedMacs.includes(mac)) {
      Alert.alert('Succès', 'Adresse MAC déjà enregistrée, redirection...');
    } else {
      await storeMacAddress(mac);
    }

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
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email"
            placeholderTextColor="gray"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="lock" type="material" size={28} color="gray" />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your password"
            placeholderTextColor="gray"
            secureTextEntry={secureEntry}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setSecureEntry((prev) => !prev)}>
            <Icon name={secureEntry ? 'visibility-off' : 'visibility'} type="material" size={20} color="gray" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleLogin}>
          <LinearGradient colors={['#f9fb7f', '#78ffc9']} style={styles.loginButtonWrapper}>
            <Text style={styles.loginText}>Login</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', paddingHorizontal: width * 0.05, paddingTop: height * 0.08 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  logo: { width: width * 0.30, height: height * 0.15 },
  welcomeText: { fontSize: 28, fontWeight: 'bold', textAlign: 'center' },
  subtitle: { fontSize: 16, textAlign: 'center', color: 'gray' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: height * 0.01 },
  textInput: { flex: 1, paddingHorizontal: width * 0.03, height: height * 0.06 },
  loginButtonWrapper: { borderRadius: height * 0.03, marginTop: height * 0.1, padding: height * 0.015 },
  loginText: { color: 'white', fontSize: height * 0.03, textAlign: 'center', fontWeight: 'bold' },
  backButton: { position: 'absolute', left: width * -0.03, top: width * -0.13 },
  circleButton: { backgroundColor: '#ccc', borderRadius: width * 0.08, width: width * 0.12, height: width * 0.12, justifyContent: 'center', alignItems: 'center' }
});

export default LoginScreen;