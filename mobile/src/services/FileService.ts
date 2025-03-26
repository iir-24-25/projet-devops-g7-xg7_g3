import RNFS from 'react-native-fs';
import { PermissionsAndroid, Platform } from 'react-native';

// Fonction pour demander les permissions d'écriture (Android uniquement)
export const requestStoragePermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Permission de stockage",
          message: "L'application a besoin d'accéder au stockage pour enregistrer l'adresse MAC.",
          buttonPositive: "OK",
          buttonNegative: "Annuler",
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (error) {
      console.error("Erreur lors de la demande de permission", error);
      return false;
    }
  }
  return true; // iOS n'a pas besoin de permission explicite
};

// Fonction pour stocker l'adresse MAC dans un fichier
export const storeMacAddressInFile = async (macAddress) => {
  try {
    // Demander la permission avant d'écrire
    const permission = await requestStoragePermission();
    if (!permission) {
      console.error("❌ Permission de stockage refusée");
      return null;
    }

    // Nettoyer l'adresse MAC pour éviter les problèmes de fichiers
    const sanitizedMac = macAddress.replace(/:/g, '_');

    // Définir le chemin du fichier (Android : stockage externe, iOS : Documents)
    const path = Platform.OS === 'android' 
      ? `${RNFS.ExternalDirectoryPath}/mac_${sanitizedMac}.json`
      : `${RNFS.DocumentDirectoryPath}/mac_${sanitizedMac}.json`;

    const data = {
      mac: macAddress,
      date: new Date().toISOString(),
    };

    await RNFS.writeFile(path, JSON.stringify(data, null, 2), 'utf8');
    console.log(`✅ Fichier enregistré : ${path}`);
    return path;
  } catch (error) {
    console.error("❌ Erreur lors de l'enregistrement du fichier MAC", error);
    return null;
  }
};
