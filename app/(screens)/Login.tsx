import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'expo-router';

const Login: React.FC = () => {
  const { login } = useUser();
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async () => {
    if (!identifier || !password) {
      setError('Please fill in all fields.');
      setSuccess('');
      return;
    }

    const errorMessage = await login(identifier, password);
    if (errorMessage) {
      setError(errorMessage);
      setSuccess('');
    } else {
      setError('');
      setSuccess('Logged in successfully!');
      router.push('/(tabs)/Home');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
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
    padding: 12, 
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
  loginButton: {
    width: '100%',
    backgroundColor: '#6200EA',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Login;
