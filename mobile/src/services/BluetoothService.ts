import { Platform, PermissionsAndroid, Alert } from 'react-native';
import RNBluetoothClassic from 'react-native-bluetooth-classic';

export const requestBluetoothPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        {
          title: 'Permission Bluetooth',
          message: 'Cette application a besoin d\'accéder au Bluetooth pour récupérer l\'adresse MAC.',
          buttonNeutral: 'Me rappeler plus tard',
          buttonNegative: 'Annuler',
          buttonPositive: 'OK',
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

export const getMacAddress = async () => {
  try {
    const devices = await RNBluetoothClassic.getBondedDevices();
    if (devices.length > 0) {
      return devices[0].address;
    } else {
      Alert.alert('Erreur', 'Aucun appareil Bluetooth trouvé.');
      return null;
    }
  } catch (error) {
    console.error('Erreur Bluetooth:', error);
    Alert.alert('Erreur', 'Impossible de récupérer l\'adresse MAC');
    return null;
  }
};
