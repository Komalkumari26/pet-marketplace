// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RoleGateway from './components/RoleGateway';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Pets from './pages/Pets';
import AboutUs from './pages/AboutUs';
import CreatePet from './pages/CreatePet';
import PetDetails from './pages/PetDetails';
import Dashboard from './pages/Dashboard';
import Favorites from './pages/Favorites';
import AdminPanel from './pages/AdminPanel';
import Cart from './pages/Cart';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import Care from './pages/Care';
import Contact from './pages/Contact';
import Profile from './pages/Profile';

function App() {
  return (
    <RoleGateway>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/pets/:id" element={<PetDetails />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/care" element={<Care />} />
          <Route path="/favorites" element={<PrivateRoute><Favorites /></PrivateRoute>} />
          <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/pets/new" element={<PrivateRoute><CreatePet /></PrivateRoute>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </RoleGateway>
  );
}

export default App;