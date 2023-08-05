import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileNav from "../components/Navbar";
import { Avatar, Box, Center, Drawer, DrawerContent, Flex, Image, Square, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import SidebarContent from "../components/Sidebar";
import Products from "../components/Products";
import NavbarCashier from "../components/NavbarCashier";
import Cart from "../components/Cart";
const Home = () => {
	const [user, setUser] = useState({});
	const { isOpen, onOpen, onClose } = useDisclosure()
	console.log(user)
	const navigate = useNavigate();

	const fetchUser = async () => {
		try {
			const token = localStorage.getItem("token");
			if (!token) {
				navigate("/login");
			}
			const headers = {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			};
			const { data } = await axios.get(
				`${process.env.REACT_APP_API_BASE_URL}/auth/user`,
				{ headers }
			);
			setUser(data.user);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		fetchUser();
	}, []);
	return (
		<>
			<NavbarCashier user={user} />
			<Flex color='white'>

				<Box px={10} width={["100%", "100%", "75%"]} bg={useColorModeValue("gray.100", "gray.900")}>
					<Products />
				</Box>
				<Box px={10} width={["100%", "100%", "25%"]} bg='white'>
					<Cart />
				</Box>
			</Flex>
		</>
	);
};

export default Home;
