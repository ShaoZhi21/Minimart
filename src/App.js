import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './Components/HomePage';
import SignUpPage from './Components/SignUpPage';
import MartPage from './Components/MartPage';
import DashboardPage from './Components/DashboardPage';
import ProductPage from './Components/ProductPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/signup" element={<SignUpPage/>}></Route>
        <Route path="/mart" element={<MartPage/>}></Route>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/mart/product" element={<ProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
