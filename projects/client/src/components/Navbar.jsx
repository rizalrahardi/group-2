"use client";
import {
	Box,
	Flex,
	Avatar,
	HStack,
	IconButton,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
	useColorModeValue,
	Text,
	Image,
	VStack,
	Button
} from "@chakra-ui/react";
import {
	FiMenu,
	FiBell,
	FiChevronDown,
	FiUser
} from "react-icons/fi"


import logo from "../assets/images/logo-nav.png";
import { useNavigate } from "react-router-dom";

const MobileNav = ({ user, onOpen, ...rest }) => {

	const navgite = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem("token");
		navgite("/");
	}
	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 4 }}
			height="20"
			alignItems="center"
			// pos={"fixed"}
			// width={'88%'}
			bg={useColorModeValue("white", "gray.900")}
			borderBottomWidth="1px"
			borderBottomColor={useColorModeValue("gray.200", "gray.700")}
			justifyContent={{ base: "space-between", md: "flex-end" }}
			{...rest}
		>
			<IconButton
				display={{ base: "flex", md: "none" }}
				onClick={onOpen}
				variant="outline"
				aria-label="open menu"
				icon={<FiMenu />}
			/>

			<Text
				display={{ base: "flex", md: "none" }}
				fontSize="2xl"
				fontFamily="monospace"
				fontWeight="bold"

			>
				<Image src={logo} inlineSize={"200px"} />
			</Text>

			<HStack spacing={{ base: "0", md: "6" }}>
				<IconButton
					size="lg"
					variant="ghost"
					aria-label="open menu"
					icon={<FiBell />}
				/>
				<Flex alignItems={"center"}>
					<Menu>
						<MenuButton
							py={2}
							transition="all 0.3s"
							_focus={{ boxShadow: "none" }}
						>
							<HStack>
								{user.imgProfile ? (
									<Avatar
										size={"md"}
										src={user.imgProfile}
									/>

								) : (
									<Avatar size={"md"} src=<FiUser /> />
								)}
								<VStack
									display={{ base: "none", md: "flex" }}
									alignItems="flex-start"
									spacing="1px"
									ml="2"
								>
									<Text fontSize="sm">{user.username}</Text>
									<Text fontSize="xs" color="gray.600">
										{user.email}
									</Text>
								</VStack>
								<Box display={{ base: "none", md: "flex" }}>
									<FiChevronDown />
								</Box>
							</HStack>
						</MenuButton>
						<MenuList
							bg={useColorModeValue("white", "gray.900")}
							borderColor={useColorModeValue("gray.200", "gray.700")}
						>
							<MenuDivider />
							<MenuItem>
								<Button onClick={handleLogout}>
									Sign out
								</Button>
							</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
			</HStack>
		</Flex>
	)
}

export default MobileNav;  
