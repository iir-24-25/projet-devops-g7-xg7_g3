import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Platform, Dimensions, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestBluetoothPermission, getMacAddress } from '../services/BluetoothService';

const { width, height } = Dimensions.get('window');

const TEST_EMAIL = 'ouiam@etudiant.com';
const TEST_PASSWORD = '123456789';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureEntry, setSecureEntry] = useState(true);
  const [macAddress, setMacAddress] = useState<string | null>(null);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
    requestBluetoothPermission(); 
  }, [navigation]);

  const getStoredMac = async (mac: string) => {
    try {
      const storedMac = await AsyncStorage.getItem(`mac_${mac}`);
      return storedMac ? JSON.parse(storedMac) : null;
    } catch (error) {
      console.error('Erreur lors de la lecture du stockage local', error);
      return null;
    }
  };

  const storeMacAddress = async (mac: string) => {
    try {
      await AsyncStorage.setItem(`mac_${mac}`, JSON.stringify({ mac }));
      Alert.alert('Succès', `Adresse MAC ${mac} enregistrée avec succès.`);
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

    const storedMac = await getStoredMac(mac);
    if (storedMac) {
      Alert.alert('Succès', 'Adresse MAC déjà enregistrée, redirection...');
    } else {
      await storeMacAddress(mac);
    }

    navigation.replace('InterfacePrincipale');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../Images/log.jpg')} style={styles.logo} />
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

      <TouchableOpacity style={styles.loginButtonWrapper} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: width * 0.05,
    paddingTop: Platform.OS === 'ios' ? height * 0.05 : height * 0.08,
  },
  logo: {
    width: width * 0.78,
    height: height * 0.4,
    alignSelf: 'center',
    borderRadius: height * 0.02,
  },
  inputContainer: {
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: height * 0.03,
    paddingHorizontal: width * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: height * 0.01,
    height: height * 0.06,
    marginTop: height * 0.04,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: width * 0.03,
  },
  loginButtonWrapper: {
    backgroundColor: '#39f198',
    borderRadius: height * 0.03,
    marginTop: height * 0.15,
  },
  loginText: {
    color: 'white',
    fontSize: height * 0.025,
    textAlign: 'center',
    paddingVertical: height * 0.015,
  },
});

export default LoginScreen;
