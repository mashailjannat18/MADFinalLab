import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

const FullScreenImageWithButton: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/1.jpg')} style={styles.image} />
      <View style={styles.overlay}>
        <Text style={styles.mainText}>Welcome to MarketLink</Text>
        <Text style={styles.subText}>
          Your one-stop shop to buy, sell, and discover amazing products effortlessly!
        </Text>
        <View style={styles.container1}>
          <Link href="/SignUp" style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </Link>
          <Link href="/Login" style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </Link>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
  },
  mainText: {
    color: 'white',
    fontSize: 32,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 30,
    textAlign: 'center',
  },
  container1: {
    flexDirection: 'row',
    gap: 20,
  },
  button: {
    backgroundColor: '#6200EA',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FullScreenImageWithButton;
