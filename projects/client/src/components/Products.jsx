import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, Center, Container, Divider, Flex, Heading, Image, Stack, Tag, TagLabel, Text } from '@chakra-ui/react';
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
        <>
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
            <Flex flexWrap="wrap" alignItems={'center'} justifyContent='center' gap={4}>
                {product.map((item) => (

                    <Card maxW='sm'>
                        <CardBody>
                            <Image
                                src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                                alt='Green double couch with wooden legs'
                                borderRadius='lg'
                            />
                            <Stack mt='6' spacing='3'>
                                <Heading size='md'>{item.name}</Heading>
                                <Center>
                                    <Text py={1} px={4} borderRadius={'full'} bgColor={'teal.100'} width={'fit-content'}>
                                        {item.Category.name}
                                    </Text>
                                </Center>
                                <Text color='teal.600' fontSize='2xl'>
                                    Rp. {item.price}
                                </Text>
                            </Stack>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                            <ButtonGroup spacing='2'>
                                <Button variant='solid' colorScheme='teal'>
                                    Add to cart
                                </Button>
                            </ButtonGroup>
                        </CardFooter>
                    </Card>
                ))}
            </Flex >
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
    );
};

export default Products;
