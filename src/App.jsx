import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Browse from './pages/Browse';
import SellItem from './pages/SellItem';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function ComingSoon() {
  return (
    <div className="container section" style={{ textAlign: 'center' }}>
      <h2>Coming up <span className="gradient-text">next</span></h2>
      <p className="muted">We're building this page step by step.</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/sell" element={<SellItem />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<ComingSoon />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}