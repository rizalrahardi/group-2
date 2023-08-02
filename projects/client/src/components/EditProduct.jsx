import React, { useEffect, useState } from 'react';
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Select,
    Switch,
    useToast,
} from '@chakra-ui/react';
import axios from 'axios';

const EditProduct = ({ product, handleModalClose }) => {
    const toast = useToast();
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price.toString());
    const [quantity, setQuantity] = useState(product.quantity)
    const [categoryId, setCategoryId] = useState(product.categoryId)
    const [isActive, setIsActive] = useState(product.isActive)
    const [productImg, setProductImg] = useState(product.productImg)
    console.log("iniiii", productImg)
    console.log('category', categoryId);
    const [categories, setCategories] = useState([]);
    const fetchCategories = async () => {
        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            };

            const { data } = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/product/category`,
                { headers }
            );
            setCategories(data.result);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchCategories();
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedProduct = {
            id: product.id,
            name,
            price: parseFloat(price),
            quantity,
            categoryId,
            isActive,
            productImg
        };

        const formData = new FormData(); // Create a new FormData instance
        formData.append('id', updatedProduct.id);
        formData.append('name', updatedProduct.name);
        formData.append('price', updatedProduct.price);
        formData.append('quantity', updatedProduct.quantity);
        formData.append('categoryId', updatedProduct.categoryId);
        formData.append('isActive', updatedProduct.isActive);
        // formData.append('products', updatedProduct.productImg);
        if (productImg) {
            formData.append('products', updatedProduct.productImg);
        }
        try {
            const headers = {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            };
            await axios.patch(
                `${process.env.REACT_APP_API_BASE_URL}/product/${updatedProduct.id}`,
                formData,
                { headers }
            );

            toast({
                title: 'Product Updated',
                description: 'Product has been updated successfully.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });

        } catch (error) {
            console.error(error);
            toast({
                title: 'Error',
                description: 'Failed to update the product. Please try again later.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }

        handleModalClose();
    };

    console.log(productImg)
    return (
        <form onSubmit={handleSubmit}>
            <FormControl isRequired>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>

            <FormControl isRequired mt={4}>
                <FormLabel htmlFor="price">Price</FormLabel>
                <Input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </FormControl>
            <FormControl isRequired mt={4}>
                <FormLabel htmlFor="quantity">Quantity</FormLabel>
                <Input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
            </FormControl>
            <FormControl isRequired mt={4}>
                <FormLabel htmlFor="categoryId">Category</FormLabel>
                <Select placeholder='Select option' name="categoryId" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id} onChange={(e) => setCategoryId(e.target.value)}>{category.name}</option>
                    ))}
                </Select>
            </FormControl>
            <FormControl mt={4}>
                <FormLabel htmlFor="isActive">Is Active</FormLabel>
                <Switch
                    id="isActive"
                    isChecked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                />
            </FormControl>
            <FormControl mt={4}>
                <FormLabel htmlFor="productImg">Product Image</FormLabel>
                <Input
                    type="file"
                    id="products"
                    accept="image/*"
                    onChange={(e) => setProductImg(e.target.files[0])}
                />
            </FormControl>
            <Button mt={4} colorScheme="teal" type="submit">
                Update Product
            </Button>
        </form>
    );
};

export default EditProduct;
