import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import config from './config';

const UpdateProductForm = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { productId } = route.params;

   
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [benefits, setBenefits] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${config.BASE_URL}/products/${productId}`);
                const product = await response.json();

                if (response.ok) {
                    setName(product.name);
                    setDescription(product.description);
                    setPrice(product.price.toString());
                    setIngredients(product.ingredients.join(', '));
                    setBenefits(product.benefits.join(', '));
                    setImage(product.image);
                } else {
                    throw new Error('Failed to fetch product');
                }
            } catch (error) {
                Alert.alert('Error', 'Could not fetch product details');
            }
        };
        fetchProduct();
    }, [productId]);

    const handleUpdateProduct = async () => {
        const updatedProduct = {
            name,
            description,
            price: parseFloat(price),
            ingredients: ingredients.split(',').map((ingredient) => ingredient.trim()),
            benefits: benefits.split(',').map((benefit) => benefit.trim()),
            image,
        };

        try {
            const response = await fetch(`${config.BASE_URL}/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            });

            if (response.ok) {
                Alert.alert('Success', 'Product updated successfully!');
                navigation.navigate('ProductList'); 
            } else {
                throw new Error('Failed to update product');
            }
        } catch (error) {
            Alert.alert('Error', 'Could not update product');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Product Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Price"
                keyboardType="numeric"
                value={price}
                onChangeText={setPrice}
            />
            <TextInput
                style={styles.input}
                placeholder="Ingredients (comma-separated)"
                value={ingredients}
                onChangeText={setIngredients}
            />
            <TextInput
                style={styles.input}
                placeholder="Benefits (comma-separated)"
                value={benefits}
                onChangeText={setBenefits}
            />
            <TextInput
                style={styles.input}
                placeholder="Image URL"
                value={image}
                onChangeText={setImage}
            />
            <Button title="Update Product" onPress={handleUpdateProduct} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
    },
});

export default UpdateProductForm;
