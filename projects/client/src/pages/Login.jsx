import React, { useState } from "react";
import axios from "axios";
import {
	FormControl,
	FormLabel,
	Input,
	Button,
	Box,
	Heading,
	Alert,
	AlertIcon,
	InputRightElement,
	InputGroup,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible, AiOutlineUser } from "react-icons/ai";
const Login = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [formData, setFormData] = useState({});
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);

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
			console.log(data);
			localStorage.setItem("token", data.token);
			if (data.user.role === "admin") {
				navigate("/admin");
			} else {
				navigate("/home");
			}
		} catch (error) {
			setIsLoading(false);
			setError("Invalid credentials");
			console.error(error);
		}
	};

	return (
		<Box maxW="md" mx="auto" mt={8} p={4} borderWidth={1} borderRadius="md">
			<Heading mb={4}>Login</Heading>
			{error && (
				<Alert status="error" mb={4}>
					<AlertIcon />
					{error}
				</Alert>
			)}
			<form onSubmit={handleSubmit}>
				<FormControl id="username" isRequired>
					<FormLabel>Username</FormLabel>
					<InputGroup>
						<Input
							type="text"
							name="username"
							value={formData.username}
							onChange={handleInputChange}
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
				<FormControl id="password" mt={4} isRequired>
					<FormLabel>Password</FormLabel>
					<InputGroup>
						<Input
							type={showPassword ? "text" : "password"}
							name="password"
							value={formData.password}
							onChange={handleInputChange}
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

				<Button
					type="submit"
					colorScheme="teal"
					mt={6}
					isLoading={isLoading}
					loadingText="Logging in..."
				>
					Login
				</Button>
			</form>
			<Button
				colorScheme="teal"
				variant={"ghost"}
				onClick={() => navigate("/forgot-password")}
			>
				Forgot password?
			</Button>
		</Box>
	);
};

export default Login;
