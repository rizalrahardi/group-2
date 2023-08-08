import React, { useEffect, useState } from 'react';
import {
    Box,
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

const CreateProduct = () => {
    const toast = useToast();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [categoryId, setCategoryId] = useState('1');
    const [isActive, setIsActive] = useState(true);
    const [productImg, setProductImg] = useState(null);
    const [category, setCategory] = useState([]);


    const categories = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/product/category`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            setCategory(data.result);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        categories();
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('price', price);
            formData.append('quantity', quantity);
            formData.append('categoryId', categoryId);
            formData.append('isActive', isActive);
            formData.append('products', productImg);

            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/product`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            });

            toast({
                title: 'Success',
                description: 'Product successfully created!',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box maxW="md" mx="auto">
            <form onSubmit={handleFormSubmit}>
                <FormControl isRequired>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input
                        type="text"
                        id="name"
                        placeholder="Product Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </FormControl>

                <FormControl isRequired mt={4}>
                    <FormLabel htmlFor="price">Price</FormLabel>
                    <Input
                        type="number"
                        id="price"
                        placeholder="Product Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </FormControl>

                <FormControl isRequired mt={4}>
                    <FormLabel htmlFor="quantity">Quantity</FormLabel>
                    <Input
                        type="number"
                        id="quantity"
                        placeholder="Product Quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel htmlFor="categoryId">Category</FormLabel>
                    <Select placeholder='Select option' name="categoryId" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                        {category.map((category) => (
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

                <FormControl isRequired mt={4}>
                    <FormLabel htmlFor="productImg">Product Image</FormLabel>
                    <Input
                        type="file"
                        id="products"
                        accept="image/*"
                        onChange={(e) => setProductImg(e.target.files[0])}
                    />
                </FormControl>

                <Button mt={4} colorScheme="teal" type="submit">
                    Create Product
                </Button>
            </form>
        </Box>
    );
};

export default CreateProduct;
