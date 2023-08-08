import React, { useState } from "react";
import { FormControl, FormLabel, Input, Button, Box, Select, useToast } from "@chakra-ui/react";
import axios from "axios";

const FormCreateCashier = () => {
    const [formData, setFormData] = useState({});
    const toast = useToast();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
            const { username, email, password, role, isActive } = formData;
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/user/cashier`, {
                username: username,
                email: email,
                password: password,
                role: "cashier",
                isActive: isActive
            }, {
                headers
            });
            setFormData({
                username: "",
                email: "",
                password: "",
                role: "",
                isActive: "",
            });
            toast({
                title: "Create cashier success",
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        } catch (error) {
            toast({
                title: "Create cashier failed",
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
    };
    return (
        <Box maxWidth="500px" mx="auto" bg={"white"} borderRadius={"md"} padding={10}>
            <form onSubmit={handleSubmit}>
                <FormControl mt={4}>
                    <FormLabel>Username</FormLabel>
                    <Input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Is Active</FormLabel>

                    <Select placeholder='Select option' name="isActive" value={formData.isActive || ""} onChange={handleChange}>
                        <option value="true">Active</option>
                        <option value="false">Disable</option>
                    </Select>
                </FormControl>
                <Button mt={4} colorScheme="teal" type="submit">
                    Create Cashier
                </Button>
            </form>
        </Box>
    );
};

export default FormCreateCashier;
