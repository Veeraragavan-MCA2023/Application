import React from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AdminProductManagement = () => {
    const navigation = useNavigation();
    const handleAddProduct = () => {
        // Alert.alert('Add Product');
        navigation.navigate('AddProductForm');
    };

    const handleUpdateProduct = () => {
        // Alert.alert('Update Product');
        navigation.navigate('ProductList');
    };

    const handleDeleteProduct = () => {
        navigation.navigate('DeleteProductForm');
    };

    return (
        <View style={styles.container}>
            <Button title="Add Product" onPress={handleAddProduct} />
            <Button title="Update Product" onPress={handleUpdateProduct} />
            <Button title="Delete Product" onPress={handleDeleteProduct} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
});

export default AdminProductManagement;
