import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';

export default function Home() {
  <View style={styles.container}>
    <Text>Profile</Text>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
