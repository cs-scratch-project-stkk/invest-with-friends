import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './scss/main.scss';
import Home from './components/pages/Home.jsx';
import Navbar from './components/Navbar';
import Features from './components/pages/Features';
import Contact from './components/pages/Contact';
import Register from './components/pages/Register';
import Login from './components/pages/Login';

function App() {
	return (
		<>
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/home" element={<Home />} />
					<Route path="/features" element={<Features />} />
					<Route path="/contactus" element={<Contact />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</Router>
			<ToastContainer />
		</>
	);
}

export default App;
