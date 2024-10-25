import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';

export default function AboutUs() {
  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: 'https://media.istockphoto.com/id/958953510/photo/agricultural-worker-takes-care-of-his-estate.jpg?s=1024x1024&w=is&k=20&c=O1jhFkjnW8OQNnI480elsY7Rkvye3WfSOI19x0beQjQ=' }} // Watch shop image
        style={styles.bannerImage}
      />
      <Text style={styles.title}>Welcome sales of pesticites</Text>
      <Text style={styles.description}>
      At Persticites, we are dedicated to providing comprehensive information and resources on pesticides to help both consumers and professionals make informed decisions about their use. Our goal is to promote safe and effective pest management solutions that protect the environment, human health, and agricultural productivity.
      </Text>
      <Text style={styles.subtitle}>Our Mission</Text>
      <Text style={styles.description}>
      Our goal is simple: to build a community where everyone can enjoy and share the love of cartoon comics. We’re here to inspire creativity, provide endless entertainment, and give both readers and creators a place to call home.
      </Text>
      <Text style={styles.subtitle}>Quality Assurance</Text>
      <Text style={styles.description}>
        Our watches are sourced from renowned brands and crafted with precision to ensure durability and timeless elegance. 
        We stand by the quality of our products and offer warranties on all our watches.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  bannerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
});
