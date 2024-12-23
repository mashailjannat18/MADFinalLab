import React from 'react';
import { Stack } from 'expo-router';

export default function Screen() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false, 
        }} 
      />
      <Stack.Screen 
        name="SignUp" 
        options={{ 
          headerShown: false, 
        }} 
      />
      <Stack.Screen 
        name="Login" 
        options={{ 
          headerShown: false, 
        }} 
      />
    </Stack>    
  );
}
