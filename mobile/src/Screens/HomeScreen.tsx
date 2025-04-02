import React, { useEffect } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Utilisation de useNavigation
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation(); // Utilisation de useNavigation

  useEffect(() => {
    if (navigation) {
      navigation.setOptions({
        headerShown: false, // Masquer la navbar
      });
    }
  }, [navigation]);

  const handleGetStarted = () => {
    navigation.navigate("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <Image source={require('../Images/Stu.jpg')} style={styles.bannerImage} />
      <View style={styles.contentContainer}>
        <Text style={styles.mainTitle}>Presencium</Text>
        <Text style={styles.subTitle}>
          Présencium – La présence scolaire, simplifiée et intelligente.
        </Text>
        <TouchableOpacity onPress={handleGetStarted}>
          <LinearGradient
            colors={['#f9fb7f', '#78ffc9']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.getStartedButton}
          >
            <Text style={styles.getStartedText}>Get Started</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const colors = {
  black: '#000000',
  white: '#ffffff',
  gray: '#808080',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    padding: 10,
  },
  bannerImage: {
    position: 'absolute',
    top: 0,
    width: width * 0.8,
    height: height * 2,
    marginTop: height * -0.74,
    resizeMode: 'contain',
    borderRadius: width * 1, // Border radius pour la vue englobante
    overflow: 'hidden', // Masquer la partie de l'image qui dépasse  
  },
  contentContainer: {
    marginTop: height * 0.65,
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
  },
  mainTitle: {
    fontSize: width * 0.1,
    fontWeight: 'bold',
    color: colors.black,
    textAlign: 'center',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: width * 0.05,
    color: colors.gray,
    textAlign: 'center',
    marginBottom: 50,
  },
  getStartedButton: {
    borderRadius: 30,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  getStartedText: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});
