import {
	Box,
	useColorModeValue,
	Drawer,
	DrawerContent,
	useDisclosure,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import axios from "axios"
import MobileNav from "../components/Navbar"
import SidebarContent from "../components/Sidebar"
import FormCreateCashier from "../components/CreateCashier"
import { Routes, Route, Outlet } from "react-router-dom"
import Login from "./Login"
const Admin = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [user, setUser] = useState({});
	console.log(user.username);

	const fetchUser = async () => {
		try {
			const token = localStorage.getItem("token");
			const headers = {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			};
			const { data } = await axios.get(
				`${process.env.REACT_APP_API_BASE_URL}/auth/user`,
				{ headers }
			);
			setUser(data.user);
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		fetchUser();
	}, []);

	return (
		<Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
			<SidebarContent
				onClose={() => onClose}
				display={{ base: "none", md: "block" }}
			/>
			<Drawer
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size="full"
			>
				<DrawerContent>
					<SidebarContent onClose={onClose} />
				</DrawerContent>
			</Drawer>
			{/* mobilenav */}
			<MobileNav onOpen={onOpen} user={user} />
			<Box ml={{ base: 0, md: 60 }} p="4">
				{/* Content */}
				{/* <Outlet /> */}

				<Routes>
					<Route path="/admin/create-cashier" element={<FormCreateCashier />} />
				</Routes>
			</Box>
		</Box>
	)
}

export default Admin
