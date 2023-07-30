import { Button } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
	const navigate = useNavigate();
	const isLogin = localStorage.getItem("token");
	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};
	return (
		<div>
			{isLogin ? (
				<Button onClick={handleLogout}>Logout</Button>
			) : (
				<Button onClick={() => navigate("/login")}>Login</Button>
			)}
		</div>
	);
};

export default Navbar;
