import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
// import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import FormCreateCashier from "./components/CreateCashier";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
function App() {
	const url = window.location.href.split("/");
	const token = url[url.length - 1];
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			try {
				const decodedToken = jwt_decode(token);
				const currentTime = Date.now() / 1000;
				if (decodedToken.exp < currentTime) {
					localStorage.removeItem('token');
					setIsLoggedIn(false);
				} else {
					setIsLoggedIn(true);
				}
			} catch (error) {
				localStorage.removeItem('token');
				setIsLoggedIn(false);
			}
		} else {
			setIsLoggedIn(false);
		}
	}, []);

	return (
		<div className="App">
			<Routes>
				{/* {isLoggedIn ? (
					<> */}
				<Route path="/home" element={<Home />} />
				<Route path="/admin" element={<Admin />} />
				{/* </>
				) : (
					<> */}
				<Route path="/login" element={<Login />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path={`/reset-password/${token}`} element={<ResetPassword />}></Route>

				{/* </>
				)} */}
			</Routes>
		</div>
	);
}

export default App;
