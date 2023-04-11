import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './scss/main.scss';
import Home from './components/pages/Home.jsx';
import Navbar from './components/Navbar';
import Features from './components/pages/Features';
import Contact from './components/pages/Contact';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';
import SideNavbar from './components/SideNavbar';
import Profile from './components/pages/Profile';

function App() {
	const [user, setUser] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		id: '',
	});

	const login = (userData) => {
		setUser({ id: userData.id, firstName: userData.firstName, lastName: userData.lastName, email: userData.email, password: userData.password });
		localStorage.setItem('user', JSON.stringify(userData));
		console.log('logged in confirmed');
	};

	const logout = () => {
		setUser({ id: '', firstName: '', lastName: '', email: '', password: '' });
		localStorage.removeItem('user');
		console.log('logged out confirmed');
	};

	// console.log(user);

	return (
		<>
			<Router>
				<Navbar user={user} logout={logout} />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/home" element={<Home />} />
					<Route path="/features" element={<Features />} />
					<Route path="/contactus" element={<Contact />} />
					<Route path="/register" element={<Register user={user} login={login} />} />
					<Route path="/login" element={<Login login={login} />} />
					<Route path="/dashboard" element={<Dashboard user={user} />} />
					<Route path="/profile" element={<Profile user={user} />} />
				</Routes>
			</Router>
			<Toaster />
		</>
	);
}

export default App;
