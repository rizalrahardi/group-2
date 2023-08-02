import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Container, Text } from '@chakra-ui/react';
import FilterProducts from './FilterProducts';
import Pagination from './Pagination';
const Products = () => {
    const [product, setProduct] = useState([]);
    const [search, setSearch] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [price, setPrice] = useState('');
    const [sort, setSort] = useState('');
    const [name, setName] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    const fetchProducts = async () => {
        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
            const { data } = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/product`,
                {
                    params: {
                        search,
                        categoryId,
                        price,
                        sort,
                        name,
                        page,
                        limit,
                    },
                    headers
                }
            );
            console.log(data.products);
            setProduct(data.products);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.log(error);
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    }

    useEffect(() => {
        fetchProducts();
    }, [search, categoryId, price, sort, name, page, limit]);

    return (
        <Container maxW="xl" py="8">
            <FilterProducts
                search={search}
                setSearch={setSearch}
                categoryId={categoryId}
                setCategoryId={setCategoryId}
                price={price}
                setPrice={setPrice}
                sort={sort}
                setSort={setSort}
                name={name}
                setName={setName}
            />
            <Text fontSize="2xl" fontWeight="bold" mb="4">
                Products
            </Text>
            {product.map((item) => (
                <Box key={item.id} borderWidth="1px" rounded="lg" p="4" mb="4">
                    <Text fontSize="lg" fontWeight="bold">
                        {item.name}
                    </Text>
                    <Text fontSize="md" color="gray.600">
                        Price: {item.price}
                    </Text>
                    <Text fontSize="md" color="gray.600">
                        Category: {item.Category.name}
                    </Text>
                </Box>
            ))}
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </Container>
    );
};

export default Products;
