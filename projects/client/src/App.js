// import axios from "axios";
import "./App.css";
// import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
function App() {
	// const [message, setMessage] = useState("");

	// useEffect(() => {
	// 	(async () => {
	// 		const { data } = await axios.get(
	// 			`${process.env.REACT_APP_API_BASE_URL}/greetings`
	// 		);
	// 		setMessage(data?.message || "");
	// 	})();
	// }, []);
	return (
		<div className="App">
			<header className="App-header">
				{/* <img src={logo} className="App-logo" alt="logo" />
				{message}
				<ButtonGroup>
					<Button colorScheme={"teal"}>test chakra</Button>
				</ButtonGroup> */}

				{/* <Link to="/login">Login</Link> */}
				<Navbar />

				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/home" element={<Home />} />
					<Route path="/admin" element={<Admin />} />
				</Routes>
			</header>
		</div>
	);
}

export default App;
