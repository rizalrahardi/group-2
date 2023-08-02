import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, useToast, Box, Button, ButtonGroup, Card, CardBody, CardFooter, Center, Container, Divider, Flex, Heading, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Tag, TagLabel, Text } from '@chakra-ui/react';
import FilterProducts from './FilterProducts';
import Pagination from './Pagination';
import FormCreateCashier from './CreateCashier';
import CreateProduct from './CreateProduct';
import EditProduct from './EditProduct';
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
    const [modal, setModal] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const toast = useToast();
    // Function to handle opening the Edit Product Modal
    const handleEditModalOpen = (product) => {
        setEditProduct(product);
    };

    // Function to handle closing the Edit Product Modal
    const handleEditModalClose = () => {
        setEditProduct(null);
    };
    const handleModalOpen = () => {
        setModal(true);
    }
    const handleModalClose = () => {
        setModal(false);
    }

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
            console.error(error);
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    }

    useEffect(() => {
        fetchProducts();
    }, [search, categoryId, price, sort, name, page, limit]);
    //     try {
    //         const headers = {
    //             'Content-Type': 'multipart/form-data',
    //             'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //         };

    //         const { data } = await axios.patch(
    //             `${process.env.REACT_APP_API_BASE_URL}/product/${updatedProduct.id}`,
    //             updatedProduct,
    //             { headers }
    //         );

    //         // Update the product list with the updated product data
    //         const updatedProductList = product.map((item) =>
    //             item.id === data.id ? data : item
    //         );
    //         setProduct(updatedProductList);

    //         toast({
    //             title: 'Success',
    //             description: 'Product updated successfully!',
    //             status: 'success',
    //             duration: 3000,
    //             isClosable: true,
    //         });
    //     } catch (error) {
    //         console.error(error);
    //         toast({
    //             title: 'Error',
    //             description: 'Failed to update product.',
    //             status: 'error',
    //             duration: 3000,
    //             isClosable: true,
    //         });
    //     }
    // };

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
            <Modal isOpen={!!editProduct} onClose={handleEditModalClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {/* Pass the product data to the EditProduct component */}
                        {editProduct && (
                            <EditProduct
                                product={editProduct}
                                handleModalClose={handleEditModalClose}
                                // handleUpdateProduct={handleUpdateProduct}
                            />
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>

            <Button mb={4} colorScheme="teal" onClick={handleModalOpen}>
                Create Product
            </Button>
            <Flex flexWrap="wrap" alignItems={'center'} justifyContent='center' gap={4}>
                <Modal isOpen={modal} onClose={handleModalClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Create Product</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <CreateProduct handleModalClose={handleModalClose} />
                        </ModalBody>
                    </ModalContent>
                </Modal>
                <br />
                {product.map((item) => (

                    <Card maxW='sm'>
                        <CardBody>
                            {item.productImg ? (
                                <>
                                    <Image
                                        src={`http://localhost:8000/${item.productImg}`}
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
                                </>
                            ) : (
                                <><Avatar src='https://bit.ly/dan-abramov' /></>
                            )}

                        </CardBody>
                        <Divider />
                        <CardFooter>
                            <ButtonGroup spacing='2'>
                                <Button variant='solid' colorScheme='teal'>
                                    Add to cart
                                </Button>
                                <Button
                                    variant='solid'
                                    colorScheme='teal'
                                    onClick={() => handleEditModalOpen(item)}
                                >
                                    Edit
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
