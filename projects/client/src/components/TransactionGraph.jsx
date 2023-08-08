import React, { useEffect, useState } from 'react';
import { Box, Heading, Flex, useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TransactionGraph = () => {
    const [graphData, setGraphData] = useState([]);
    const [startDate, setStartDate] = useState(new Date('2023-08-04'));
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
        fetchData();
    }, [startDate, endDate]);

    const fetchData = async () => {
        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
            const formattedStartDate = startDate.toISOString().split('T')[0];
            const formattedEndDate = endDate.toISOString().split('T')[0];
            const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/transaction?startDate=${formattedStartDate}&endDate=${formattedEndDate}`, { headers });
            setGraphData(data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <Box p={4} mb={4} shadow="md" borderWidth="1px" borderRadius="md" bg={useColorModeValue('white', 'gray.700')}>
            <Heading size="md" mb={4}>
                Transaction Graph
            </Heading>
            <Flex justify="center">
                <ResponsiveContainer width="90%" height={400}>
                    <LineChart data={graphData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="transactionDate" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="totalPrice" name="Total Price" stroke="teal" />
                    </LineChart>
                </ResponsiveContainer>
            </Flex>
            <Flex justify="center" mt={4}>
                <Box mr={4} p={2} borderRadius={"full"} outline={"1px solid teal"}>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />

                </Box>
                <Box ml={4} p={2} borderRadius={"full"} outline={"1px solid teal"}>

                    <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                </Box>
            </Flex>
        </Box>
    );
};

export default TransactionGraph;
