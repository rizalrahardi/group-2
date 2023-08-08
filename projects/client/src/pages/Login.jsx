import {
	Box,
	Stack,
	Heading,
	Text,
	Container,
	Input,
	Button,
	SimpleGrid,
	FormControl,
	FormLabel,
	Alert,
	AlertIcon,
	InputRightElement,
	InputGroup,
	useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible, AiOutlineUser } from "react-icons/ai";
import logo from "../assets/images/logo-main.png";

const Login = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [formData, setFormData] = useState({});
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const toast = useToast();
	const handleInputChange = (e) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		try {
			const { username, password } = formData;
			const { data } = await axios.post(
				`${process.env.REACT_APP_API_BASE_URL}/auth/login`,
				{
					username: username,
					password: password,
				}
			);
			setFormData(data);
			setIsLoading(false);
			toast({
				title: "Login Success",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
			localStorage.setItem("token", data.token);
			if (data.user.role === "admin") {
				navigate("/admin");
			} else {
				navigate("/home");
			}
		} catch (error) {
			setIsLoading(false);
			setError(`Error login: ` + error.response.data.errors[0].msg);
			console.error(error);
		}
	};

	return (
		<Box position={"relative"}>
			<Container
				as={SimpleGrid}
				maxW={"7xl"}
				columns={{ base: 1, md: 2 }}
				spacing={{ base: 10, lg: 32 }}
				py={{ base: 10, sm: 20, lg: 32 }}
			>
				<Stack spacing={{ base: 10, md: 20 }}>
					<Heading
						lineHeight={1.1}
						fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
					>
						<img src={logo} alt="logo" sizes="(100vw: 2000px)" />
						Make Customer Happy!
					</Heading>
				</Stack>
				<Stack
					bg={"gray.50"}
					rounded={"xl"}
					p={{ base: 4, sm: 6, md: 8 }}
					spacing={{ base: 8 }}
					maxW={{ lg: "lg" }}
				>
					<Stack spacing={4}>
						<Heading
							color={"gray.800"}
							lineHeight={1.1}
							fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
						>
							Login
							<Text
								as={"span"}
								bgGradient="linear(to-r, blue.400,teal.400)"
								bgClip="text"
							>
								!
							</Text>
						</Heading>
					</Stack>
					<Box mt={10}>
						{error && (
							<Alert status="error" mb={4}>
								<AlertIcon />
								{error}
							</Alert>
						)}
						<form onSubmit={handleSubmit}>
							<Stack spacing={4}>
								<FormControl id="username" isRequired>
									<FormLabel>Username</FormLabel>
									<InputGroup>
										<Input
											type="text"
											name="username"
											placeholder="username"
											value={formData.username}
											onChange={handleInputChange}
											bg={"gray.100"}
											border={0}
											color={"gray.500"}
											_placeholder={{
												color: "gray.500",
											}}
										/>
										<InputRightElement width="3.5rem">
											<Button
												size={"md"}
												bg="transparent"
												_focus={{ outline: "none" }}
												_active={{ outline: "none" }}
												_hover={{ color: "teal.500" }}
											>
												<AiOutlineUser />
											</Button>
										</InputRightElement>
									</InputGroup>
								</FormControl>
								<FormControl id="password" isRequired>
									<FormLabel>Password</FormLabel>
									<InputGroup>
										<Input
											type={showPassword ? "text" : "password"}
											name="password"
											placeholder="password"
											value={formData.password}
											onChange={handleInputChange}
											bg={"gray.100"}
											border={0}
											color={"gray.500"}
											_placeholder={{
												color: "gray.500",
											}}
										/>
										<InputRightElement width="3.5rem">
											<Button
												h="1.75rem"
												size="md"
												onClick={() => setShowPassword(!showPassword)}
												bg="transparent"
												_focus={{ outline: "none" }}
												_active={{ outline: "none" }}
												_hover={{ color: "teal.500" }}
											>
												{showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
											</Button>
										</InputRightElement>
									</InputGroup>
								</FormControl>
							</Stack>
							<Button
								type="submit"
								fontFamily={"heading"}
								mt={8}
								w={"full"}
								bgGradient="linear(to-r, blue.400,teal.400)"
								color={"white"}
								_hover={{
									bgGradient: "linear(to-r, blue.400,teal.400)",
									boxShadow: "xl",
								}}
								isLoading={isLoading}
								loadingText="Logging in..."
							>
								Submit
							</Button>
						</form>
						<Button
							mt={2}
							colorScheme="teal"
							variant={"ghost"}
							onClick={() => navigate("/forgot-password")}
						>
							Forgot password?
						</Button>
					</Box>
				</Stack>
			</Container>
		</Box>
	);
};

export default Login;
