import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
// import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import FormCreateCashier from "./components/CreateCashier";
function App() {
	const url = window.location.href.split("/");
	const token = url[url.length - 1];

	return (
		<div className="App">
			{/* <Navbar /> */}

			<Routes>
				<Route path="/home" element={<Home />} />
				<Route path="/admin/*" element={<Admin />}>
					{/* <Route path="/create-cashier" element={<FormCreateCashier />} /> */}
				</Route>
				<Route path="/login" element={<Login />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path={`/reset-password/${token}`} element={<ResetPassword />}></Route>
				{/* <Route path="/create-cashier" element={<FormCreateCashier />} /> */}

			</Routes>
		</div>
	);
}

export default App;
