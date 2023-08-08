import React, { useState } from 'react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Flex, useColorModeValue, Button } from '@chakra-ui/react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ProductSoldTable = () => {
    const [startDate, setStartDate] = useState(new Date('2023-08-04'));
    const [endDate, setEndDate] = useState(new Date());
    const [productSoldData, setProductSoldData] = useState([]);
    console.log('data productsold', productSoldData);
    const fetchProductSoldData = async () => {
        try {
            const formattedStartDate = startDate ? startDate.toISOString().split('T')[0] : '';
            const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : '';
            const { data } = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/transaction/product?startDate=${formattedStartDate}&endDate=${formattedEndDate}`
            );

            // Menggunakan objek Map untuk menghindari redundansi data produk dan menambahkan jumlah quantity
            const productMap = new Map();
            console.log('adfasd', productMap);

            data.productSold.forEach((item) => {
                const productId = item.Product.id;
                const productName = item.Product.name;
                const price = item.Product.price;
                const totalQuantity = parseInt(item.totalQuantity);
                if (productMap.has(productId)) {
                    // Jika produk sudah ada di Map, tambahkan jumlah quantity
                    const existingItem = productMap.get(productId);
                    existingItem.totalQuantity += totalQuantity;
                    existingItem.totalPrice += totalQuantity * price;
                } else {
                    // Jika produk belum ada di Map, tambahkan sebagai entri baru
                    productMap.set(productId, {
                        Product: { id: productId, name: productName, price: price },
                        totalQuantity: totalQuantity,
                        totalPrice: totalQuantity * price,
                    });
                }
            });

            // Konversi kembali ke array dan simpan dalam state
            setProductSoldData(Array.from(productMap.values()));
        } catch (error) {
            console.error('Error fetching product sold data:', error);
        }
    };

    const handleSearch = () => {
        fetchProductSoldData();
    };

    return (
        <Box p={4} shadow="md" borderWidth="1px" borderRadius="md" bg={useColorModeValue('white', 'gray.700')}>
            <Heading size="md" mb={4}>
                Product Sold
            </Heading>
            <Flex mb={4}>
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} placeholderText="Start Date" className="date-picker" />
                <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} placeholderText="End Date" className="date-picker" />
                <Button onClick={handleSearch} colorScheme="teal">
                    Search
                </Button>
            </Flex>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Product</Th>
                        <Th>Total Quantity Sold</Th>
                        <Th>Total Price</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {productSoldData.map((item) => (
                        <Tr key={item.Product.id}>
                            <Td>{item.Product.name}</Td>
                            <Td>{item.totalQuantity}</Td>
                            <Td>{item.totalPrice}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default ProductSoldTable;