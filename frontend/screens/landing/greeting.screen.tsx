import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Greeting() {

  const navigation = useNavigation();

  const handleLogInPress = () => {
    navigation.navigate('Login');
  };

  const handleSignUpPress = () => {
    navigation.navigate('Signup');
  };

  return (
    <SafeAreaView style={styles.container}>

      <Image source={require('../../assets/images/greeting/logo.png')} />

      <Text style={styles.paragraph}>
        Unleashing Culinary Joy!
      </Text>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogInPress}
      >
        <Text style={styles.loginText}>Log in</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.signupButton}
        onPress={handleSignUpPress}
      >
        <Text style={styles.signupText}>Sign up</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDBF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    marginTop: 61,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'raleway-bold',
  },
  loginButton: {
    marginTop: 78,
    width: 204,
    height: 63,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF724C',
  },
  signupButton: {
    marginTop: 24,
    width: 204,
    height: 63,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#242C41',
  },
  loginText: {
    color: '#242C41',
    fontFamily: 'raleway-bold',
    fontSize: 24,
  },
  signupText: {
    color: 'white',
    fontFamily: 'raleway-bold',
    fontSize: 24,
  }
});
