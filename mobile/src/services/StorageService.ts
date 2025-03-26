import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeMacAddress = async (macAddress: string) => {
  try {
    await AsyncStorage.setItem('mac_address', macAddress);
    await AsyncStorage.setItem('mac_stored', 'true');
  } catch (error) {
    console.error('Erreur de stockage de l\'adresse MAC', error);
  }
};

export const getMacAddress = async () => {
  try {
    return await AsyncStorage.getItem('mac_address');
  } catch (error) {
    console.error('Erreur de récupération de l\'adresse MAC', error);
    return null;
  }
};

export const getMacStatus = async () => {
  try {
    return await AsyncStorage.getItem('mac_stored');
  } catch (error) {
    console.error('Erreur de récupération du statut de l\'adresse MAC', error);
    return null;
  }
};
