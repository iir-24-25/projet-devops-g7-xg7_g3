import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
  Alert,
  PermissionsAndroid,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import RNBluetoothClassic from "react-native-bluetooth-classic";

const { width, height } = Dimensions.get("window");

const SERVER_URL = "https://jsonplaceholder.typicode.com/posts";
const TEST_EMAIL = "ouiam@etudiant.com";
const TEST_PASSWORD = "123456789";

const requestBluetoothPermission = async () => {
  if (Platform.OS === "android") {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        {
          title: "Permission Bluetooth",
          message: "Cette application a besoin d'accéder au Bluetooth pour récupérer l'adresse MAC.",
          buttonNeutral: "Me rappeler plus tard",
          buttonNegative: "Annuler",
          buttonPositive: "OK",
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return true;
};

const LoginScreen = () => {    
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureEntry, setSecureEntry] = useState(true);
  const [macAddress, setMacAddress] = useState(null);

  useEffect(() => {
    requestBluetoothPermission();
    checkMacStatus();

  }, []);

    useEffect(() => {
      navigation.setOptions({
        headerShown: false, // Masquer la navbar
      });
    }, [navigation]);

  

  const checkMacStatus = async () => {
    const macStatus = await AsyncStorage.getItem("mac_stored");
    console.log("MAC status:", macStatus);
  };

  const getMacAddress = async () => {
    try {
      const devices = await RNBluetoothClassic.getBondedDevices();
      if (devices.length > 0) {
        const mac = devices[0].address;
        setMacAddress(mac);
        return mac;
      } else {
        Alert.alert("Erreur", "Aucun appareil Bluetooth trouvé.");
        return null;
      }
    } catch (error) {
      console.error("Erreur Bluetooth:", error);
      Alert.alert("Erreur", "Impossible de récupérer l'adresse MAC");
      return null;
    }
  };

  const handleLogin = async () => {
    if (email !== TEST_EMAIL || password !== TEST_PASSWORD) {
      Alert.alert("Erreur", "Email ou mot de passe incorrect");
      return;
    }

    const macStored = await AsyncStorage.getItem("mac_stored");

    if (macStored !== "true") {
      const macAddress = await getMacAddress();
      if (!macAddress) return;

      await AsyncStorage.setItem("mac_address", macAddress);
      await AsyncStorage.setItem("mac_stored", "true");

      console.log("✅ Adresse MAC enregistrée localement :", macAddress);
      Alert.alert("Succès", "Connexion réussie et adresse MAC stockée localement");
    } else {
      Alert.alert("Succès", "Vous êtes déjà connecté");
    }
  };

  return (
    <View style={styles.container}>
      {/* Image en haut */}
      <Image
        source={require("../Images/log.jpg")} // Remplace par le chemin correct de ton image
        style={styles.logo}
      />

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
          <Icon
            name={secureEntry ? "visibility-off" : "visibility"}
            type="material"
            size={20}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButtonWrapper} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      {macAddress && (
        <View style={styles.macInfo}>
          <Text style={styles.macText}>Adresse MAC : {macAddress}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: width * 0.05,
    paddingTop: Platform.OS === "ios" ? height * 0.05 : height * 0.08,
  },
  logo: {
    width: width * 0.78, // Taille de l'image (ajuste selon tes préférences)
    height: height * 0.3, // Taille de l'image (ajuste selon tes préférences)
    alignSelf: "center", // Centrer l'image horizontalement
    marginBottom: height * 0.05, // Espacement sous l'image
    borderRadius: height * 0.02, // Bordure arrondie de l'image
  },
  inputContainer: {
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: height * 0.03,
    paddingHorizontal: width * 0.05,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: height * 0.01,
    height: height * 0.06,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: width * 0.03,
  },
  loginButtonWrapper: {
    backgroundColor: "#39f198",
    borderRadius: height * 0.03,
    marginTop: height * 0.02,
  },
  loginText: {
    color: "white",
    fontSize: height * 0.025,
    textAlign: "center",
    paddingVertical: height * 0.015,
  },
  macInfo: {
    marginTop: height * 0.02,
    padding: width * 0.05,
    backgroundColor: "#F4F4F4",
    borderRadius: height * 0.03,
  },
  macText: {
    fontSize: height * 0.02,
    textAlign: "center",
    color: "gray",
  },
});

export default LoginScreen;
