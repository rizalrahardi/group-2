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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Login = () => {
	// const [formData, setFormData] = useState({ username: "", password: "" });
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [formData, setFormData] = useState({});
	const navigate = useNavigate();

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
					<Input
						type="text"
						name="username"
						value={formData.username}
						onChange={handleInputChange}
					/>
				</FormControl>
				<FormControl id="password" mt={4} isRequired>
					<FormLabel>Password</FormLabel>
					<Input
						type="password"
						name="password"
						value={formData.password}
						onChange={handleInputChange}
					/>
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
