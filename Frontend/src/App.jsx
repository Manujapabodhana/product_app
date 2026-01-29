import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <div className="App">
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', background: 'radial-gradient(circle at 50% 10%, rgba(139, 92, 246, 0.15), transparent 40%)', zIndex: -1 }}></div>
      <div style={{ position: 'fixed', bottom: 0, right: 0, width: '100vw', height: '100vh', pointerEvents: 'none', background: 'radial-gradient(circle at 90% 90%, rgba(6, 182, 212, 0.1), transparent 40%)', zIndex: -1 }}></div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} />
      </Routes>
    </div>
  );
}

export default App;
