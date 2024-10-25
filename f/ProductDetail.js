import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import config from './config';

const ProductDetail = ({ route }) => {
  const { id } = route.params;
  const [product, setProduct] = useState(null);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);

  // Fetch product details from the backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${config.BASE_URL}/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddReview = () => {
    if (review.trim()) {
      setReviews([...reviews, review]);
      setReview('');
    }
  };

  if (!product) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading product details...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImage} resizeMode="contain" />
      <Text style={styles.productName}>{product.name}</Text>

      {/* Check if price exists before using toFixed */}
      <Text style={styles.productPrice}>
        ₹{product.price ? product.price.toFixed(2) : 'N/A'}
      </Text>

      <Text style={styles.productDescription}>{product.description}</Text>

      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>Category</Text>
        {product.ingredients && product.ingredients.length > 0 ? (
          product.ingredients.map((ingredient, index) => (
            <Text key={index} style={styles.detailText}>{ingredient}</Text>
          ))
        ) : (
          <Text>No Category available.</Text>
        )}
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>Tags</Text>
        {product.benefits && product.benefits.length > 0 ? (
          product.benefits.map((benefit, index) => (
            <Text key={index} style={styles.detailText}>{benefit}</Text>
          ))
        ) : (
          <Text>No benefits available.</Text>
        )}
      </View>

      <View style={styles.reviewContainer}>
        <Text style={styles.sectionTitle}>Add a Review</Text>
        <TextInput
          style={styles.reviewInput}
          placeholder="Write your review..."
          value={review}
          onChangeText={setReview}
        />
        <TouchableOpacity style={styles.reviewButton} onPress={handleAddReview}>
          <Text style={styles.reviewButtonText}>Submit Review</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Customer Reviews</Text>
        {reviews.length > 0 ? (
          reviews.map((item, index) => (
            <Text key={index} style={styles.reviewText}>
              {item}
            </Text>
          ))
        ) : (
          <Text style={styles.noReviewsText}>No reviews yet. Be the first to review!</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  productImage: { width: '100%', height: 300 },
  productName: { fontSize: 24, fontWeight: 'bold', marginVertical: 10 },
  productPrice: { fontSize: 20, color: '#888' },
  productDescription: { fontSize: 16, marginVertical: 10 },
  detailsContainer: { marginVertical: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  detailText: { fontSize: 16, marginVertical: 2 },
  reviewContainer: { marginTop: 30 },
  reviewInput: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 10 },
  reviewButton: { backgroundColor: '#28a745', padding: 10, borderRadius: 5 },
  reviewButtonText: { color: '#fff', textAlign: 'center' },
  reviewText: { marginVertical: 5 },
  noReviewsText: { color: '#888' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontSize: 18 },
});

export default ProductDetail;
