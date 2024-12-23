import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';

type Product = {
  id: number;
  name: string;
  price: number;
  image_url: string;
  category: string;
};

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(['Lipstick', 'Foundation', 'Eyeshadow', 'Blush', 'Powder', 'Highlight', 'Hair Products', 'Skincare']);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('Products').select('id, name, price, image_url, category');
      if (error) {
        console.error(error.message);
      } else {
        setProducts(data || []);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesSearch = product.name.toLowerCase().includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/(screens)/ProductDetails?id=${item.id}`)}
    >
      <Image source={{ uri: item.image_url }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for products..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <Text style={styles.title}>Categories</Text>
      <ScrollView horizontal style={styles.categoriesContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.categoryCard, selectedCategory === category && styles.selectedCategoryCard]}
            onPress={() => setSelectedCategory(selectedCategory === category ? null : category)} 
          >
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.title}>Featured Products</Text>
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoryCard: {
    backgroundColor: '#6200EA',
    padding: 10,
    marginRight: 10,
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCategoryCard: {
    backgroundColor: '#3700B3',
  },
  categoryText: {
    color: '#fff',
    fontSize: 16,
  },
  list: {
    paddingBottom: 10,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  card: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    textAlign: 'center',
  },
  price: {
    fontSize: 14,
    color: '#6200EA',
    fontWeight: 'bold',
  },
});

export default Home;
