import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
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
		<div>
			<h1>hallo {user.username}</h1>
			<h1>hallo</h1>
		</div>
	);
};

export default Home;
