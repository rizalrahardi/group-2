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
import UpdateCashier from "../components/Cashier"
import Products from "../components/Products"
import Report from "../components/Report"
import HomeAdmin from "../components/HomeAdmin"
import Category from "../components/Category"
const Admin = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [user, setUser] = useState({});
	const [activeContent, setActiveContent] = useState("home")
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

	const handleContentChange = (content) => {
		setActiveContent(content);
	};

	const renderContent = () => {
		switch (activeContent) {
			case "home":
				return <HomeAdmin />;
			case "create-cashier":
				return <FormCreateCashier />;
			case "update-cashier":
				return <UpdateCashier />;
			case "products":
				return <Products />;
			case "categories":
				return <Category />;
			case "reports":
				return <Report />;
			default:
				return null;
		}
	};

	return (
		<Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
			<SidebarContent
				onClose={() => onClose}
				onContentChange={handleContentChange}
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
					<SidebarContent onClose={onClose} onContentChange={handleContentChange} />
				</DrawerContent>
			</Drawer>
			<MobileNav onOpen={onOpen} user={user} />
			<Box ml={{ base: 0, md: 60 }} p="4">
				{renderContent()}
			</Box>
		</Box>
	)
}

export default Admin
