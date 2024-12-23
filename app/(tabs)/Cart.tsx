import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { supabase } from '@/lib/supabase';

interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
}

interface CartItem {
  id: number;
  created_at: string;
  user_id: number;
  product_id: number;
  quantity: number;
  total_price: number;
  Products: Product;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      const userId = 1; 

      const { data, error } = await supabase
        .from('Cart')
        .select(`
          id,
          created_at,
          user_id,
          product_id,
          quantity,
          total_price,
          Products (
            id,
            name,
            price,
            image_url
          )`)
        .eq('user_id', userId);

      setLoading(false);
      
      if (error) {
        setError(error.message);
      } else {
        setCartItems(data || []);
      }
    };

    fetchCartItems();
  }, []);

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.Products.image_url }} style={styles.productImage} />
      <View style={styles.cartItemDetails}>
        <Text style={styles.productName}>{item.Products.name}</Text>
        <Text style={styles.productPrice}>${item.Products.price}</Text>
        <Text style={styles.productQuantity}>Quantity: {item.quantity}</Text>
        <Text style={styles.productTotal}>Total: ${item.total_price}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : cartItems.length > 0 ? (
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  emptyCartText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 16,
  },
  cartItemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: '#555',
  },
  productQuantity: {
    fontSize: 16,
    color: '#555',
  },
  productTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default Cart;
