import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'expo-router';

const SignUp: React.FC = () => {
  const { signUp } = useUser();
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignUp = async () => {
    if (!identifier || !password) {
      setError('Please fill in all fields.');
      return;
    }

    const errorMessage = await signUp(identifier, password);
    if (errorMessage) {
      setError(errorMessage);
      setSuccess('');
    } else {
      setError('');
      setSuccess('Account created successfully!');
      router.push('/(tabs)/Home');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        placeholder="Email or Phone"
        value={identifier}
        onChangeText={setIdentifier}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      {error && <Text style={styles.error}>{error}</Text>}
      {success && <Text style={styles.success}>{success}</Text>}
      <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginBottom: 20,
    color: '#333',
  },
  input: { 
    width: '100%',
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 10, 
    marginBottom: 15, 
    borderRadius: 8, 
    fontSize: 16, 
    backgroundColor: '#FFF',
  },
  error: { 
    color: 'red', 
    marginBottom: 10,
    fontSize: 14,
    textAlign: 'center',
  },
  success: { 
    color: 'green', 
    marginBottom: 10,
    fontSize: 14,
    textAlign: 'center',
  },
  signupButton: {
    width: '100%',
    backgroundColor: '#6200EA',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  signupButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignUp;
