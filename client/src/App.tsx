import React, { FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/home";
import About from "./routes/about";
import CollectionThumbnails from "./routes/storeThumbnails";
import Item from "./routes/itemDetails";
import Cart from "./routes/cart";
import Checkout from "./routes/checkout";
import Shipping from "./routes/shipping";
import Payment from "./routes/stripe";
import Contact from "./routes/contact";
import AdminHome from "./routes/admin/home";
import AdminCollection from "./routes/admin/collection";
import AdminCreate from "./routes/admin/create";
import AdminUpdate from "./routes/admin/update";

const App: FC = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/collection/:product" element={<CollectionThumbnails />} />
          <Route path="/collection/:product/:id" element={<Item />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route
            path="/admin/collection/:product"
            element={<AdminCollection />}
          />
          <Route path="/admin/create" element={<AdminCreate />} />
          <Route path="/admin/update/:id" element={<AdminUpdate />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
