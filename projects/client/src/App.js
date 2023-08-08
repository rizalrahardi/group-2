import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
function App() {
	const url = window.location.href.split("/");
	const token = url[url.length - 1];

	return (
		<div className="App">
			<Routes>
				<Route path="/home" element={<Home />} />
				<Route path="/admin" element={<Admin />} />
				<Route path="/" element={<Login />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path={`/reset-password/${token}`} element={<ResetPassword />}></Route>
			</Routes>
		</div>
	);
}

export default App;
