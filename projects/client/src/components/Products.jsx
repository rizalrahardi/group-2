import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useColorModeValue } from '@chakra-ui/react';
import FilterProducts from './FilterProducts';
import Pagination from './Pagination';
import CreateProduct from './CreateProduct';
import EditProduct from './EditProduct';
import ProductCard from './ProductCard';
import { useLocation } from 'react-router-dom';
const Products = () => {
    const [product, setProduct] = useState([]);
    const [search, setSearch] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [price, setPrice] = useState('');
    const [sort, setSort] = useState('');
    const [name, setName] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(9);
    const [totalPages, setTotalPages] = useState(1);
    const [modal, setModal] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const location = useLocation();
    const isAdminPage = location.pathname === '/admin';
    const isCashierPage = location.pathname === '/home';
    const handleEditModalOpen = (product) => {
        setEditProduct(product);
    };
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
            <Text fontSize="2xl" fontWeight="bold" mb="2" color={useColorModeValue('gray.800', 'white')}>
                Products
            </Text>
            <Modal isOpen={!!editProduct} onClose={handleEditModalClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {editProduct && (
                            <EditProduct
                                product={editProduct}
                                handleModalClose={handleEditModalClose}
                            />
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
            {isAdminPage && (
                <Button mb={4} colorScheme="teal" onClick={handleModalOpen}>
                    Create Product
                </Button>
            )}
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
                {product
                    .filter((item) => (isCashierPage ? item.isActive : true))
                    .map((item) => (
                        <ProductCard
                            key={item.id}
                            product={item}
                            handleEditModalOpen={handleEditModalOpen}
                        />
                    ))}
            </Flex>
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
    );
};

export default Products;
