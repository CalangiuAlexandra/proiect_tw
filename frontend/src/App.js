import logo from './logo.svg';
import './App.css';
import {useState} from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import MyMovies from "./components/MyMovies";
import AllMovies from "./components/AllMovies";

function App() {
  const [user, setUser] = useState(null);

  return (
      <Router>
        <Navbar user={user} />
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/my-movies" element={user ? <MyMovies user={user} /> : <Navigate to="/login" />} />
          <Route path="/movies" element={user ? <AllMovies user={user} /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to="/my-movies" />} />
        </Routes>
      </Router>
  );
}

export default App;
