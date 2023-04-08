

import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './scss/main.scss';
import Home from './components/pages/Home.jsx';
import Navbar from './components/Navbar';
import Login from './components/pages/Login.jsx';
import  { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [user, setUser] = useState( {firstName: "", lastName:"", email: "", password: ""});
  const login = userData => {
		setUser(
      {firstName: userData.firstName, lastname: userData.lastName, email: userData.email, password: userData.password})
  }
  console.log(user)

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login login={login} />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;


