

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import Footer from "./components/footer";

import About from "./components/about";
import Contact from "./components/contact";
import Home from "./pages/home";
import Products from "./pages/products";
import Cart from "./components/cart";
import Checkout from "./components/checkout";
import ProductDetails from "./pages/productsdetails";
import OrderSuccess from "./pages/ordersuccess";
import OrderFailed from "./pages/orderfailed";
import Admin from "./pages/admin";

import "./styles.css";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/order-failed" element={<OrderFailed />} />
        <Route path="/admin" element={<Admin />} />

      </Routes>

      <Footer />
    </Router>
  );
}

export default App;

