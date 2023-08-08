import React, { useState, useEffect } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Box,
    useColorModeValue,
    Heading,
} from '@chakra-ui/react';
import axios from 'axios';

const TransactionTable = () => {
    const [transactions, setTransactions] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [transactionItems, setTransactionItems] = useState([]);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    const fetchTransactions = async () => {
        try {
            const { data } = await axios.get('http://localhost:8000/api/transaction/all', { headers });
            setTransactions(data.data);
            console.log("data transaction", data.data);

        } catch (error) {
            console.error(error);
        }
    };

    const fetchTransactionItems = async (id) => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/transaction/${id}`, { headers });
            setTransactionItems(data.data);
            console.log("data transaction item", data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleTransactionClick = (id) => {
        setSelectedTransaction(id);
        setIsModalOpen(true);
        fetchTransactionItems(id);
    };

    return (
        <Box p={4} mt={4} shadow="md" borderWidth="1px" borderRadius="md" bg={useColorModeValue('white', 'gray.700')}>
            <Heading size="md" mb={4}>Transaction</Heading>
            <Table variant="striped" colorScheme="teal">
                <Thead>
                    <Tr>
                        <Th>Cashier</Th>
                        <Th>Date</Th>
                        <Th>Total Price</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {transactions.map((transaction) => (
                        <Tr key={transaction.id}>
                            <Td>{transaction.User.username}</Td>
                            <Td>{transaction.createdAt}</Td>
                            <Td>Rp. {transaction.totalPrice}</Td>
                            <Td>
                                <Button onClick={() => handleTransactionClick(transaction.id)}>
                                    View Details
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Transaction Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>Product Name</Th>
                                    <Th>Quantity</Th>
                                    <Th>Price</Th>
                                    <Th>Total Price</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {transactionItems.map((item) => (
                                    <Tr key={item.id}>
                                        <Td>{item.Product.name}</Td>
                                        <Td>{item.quantity}</Td>
                                        <Td>Rp. {item.Product.price}</Td>
                                        <Td>Rp. {item.price}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => setIsModalOpen(false)}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default TransactionTable;
