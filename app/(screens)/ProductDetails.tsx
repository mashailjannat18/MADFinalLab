import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { supabase } from '@/lib/supabase';

type Product = {
  id: number;
  name: string;
  price: number;
  image_url: string;
  category: string;
  instock: number;  // New field to track available stock
};

const ProductDetails: React.FC = () => {
  const { id } = useLocalSearchParams();  // Access query params using useLocalSearchParams
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase.from('Products').select('*').eq('id', id).single();
      if (error) {
        console.error(error.message);
      } else {
        setProduct(data);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const increaseQuantity = () => {
    if (quantity < (product?.instock || 0)) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = async () => {
    if (product) {
      const { data, error } = await supabase.from('Cart').upsert([
        {
          product_id: product.id,
          quantity,
        },
      ]);
      if (error) {
        console.error(error.message);
      } else {
        alert('Added to cart');
      }
    }
  };

  return (
    <View style={styles.container}>
      {product ? (
        <>
          <Image source={{ uri: product.image_url }} style={styles.image} />
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <Text style={styles.instock}>In Stock: {product.instock}</Text>

          <View style={styles.quantityContainer}>
            <Button title="-" onPress={decreaseQuantity} />
            <Text style={styles.quantity}>{quantity}</Text>
            <Button title="+" onPress={increaseQuantity} />
          </View>

          <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: '#6200EA',
    marginBottom: 10,
  },
  instock: {
    fontSize: 16,
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  addToCartButton: {
    backgroundColor: '#6200EA',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProductDetails;
