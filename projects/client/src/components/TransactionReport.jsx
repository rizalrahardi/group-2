import React, { useState } from 'react';
import { Box, Button, Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SalesReport = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [transactionData, setTransactionData] = useState([]);
    const [productSoldData, setProductSoldData] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const fetchTransactionData = async () => {
        try {
            const formattedStartDate = startDate ? startDate.toISOString().split('T')[0] : '';
            const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : '';
            const { data } = await axios.get(`http://localhost:8000/api/transaction/coba?startDate=${formattedStartDate}&endDate=${formattedEndDate}`);

            setTransactionData(data.data);
        } catch (error) {
            console.error('Error fetching transaction data:', error);
        }
    };

    const fetchProductSoldData = async () => {
        try {
            const formattedStartDate = startDate ? startDate.toISOString().split('T')[0] : '';
            const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : '';
            const { data } = await axios.get(
                `http://localhost:8000/api/transaction/product?startDate=${startDate}&endDate=${endDate}`
            );
            setProductSoldData(data.productSold);
        } catch (error) {
            console.error('Error fetching product sold data:', error);
        }
    };

    const handleSearch = () => {
        fetchTransactionData();
        fetchProductSoldData();
    };

    const handlePrint = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <Box p={4} shadow="md" borderWidth="1px" borderRadius="md" bg="white">
            <Heading size="md" mb={4}>
                Sales Report
            </Heading>
            <Box mb={4}>
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} placeholderText="Start Date" className="date-picker" />
                <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} placeholderText="End Date" className="date-picker" />
                <Button ml={2} colorScheme="teal" onClick={handleSearch}>
                    Search
                </Button>
                <Button ml={2} colorScheme="teal" onClick={handlePrint}>
                    Print Report
                </Button>
            </Box>
            <Table variant="simple" mb={8}>
                <Thead>
                    <Tr>
                        <Th>Date</Th>
                        <Th>Total Sales</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {transactionData.map((item) => (
                        <Tr key={item.transactionDate}>
                            <Td>{item.transactionDate}</Td>
                            <Td>{item.totalPrice}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <Modal isOpen={showModal} onClose={handleCloseModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Print Sales Report</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
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
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default SalesReport;
